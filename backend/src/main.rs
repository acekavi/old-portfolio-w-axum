#![allow(unused)] // For only the start

use crate::model::ModelController;

pub use self::error::{Error, Result};

use std::net::SocketAddr;
use axum::{Router, response::{Html, IntoResponse, Response}, routing::{get, get_service}, extract::{Query, Path}, middleware};
use serde::Deserialize;
use tower_cookies::CookieManagerLayer;
use tower_http::services::ServeDir;

mod ctx;
mod error;
mod model;
mod web;

#[tokio::main]
async fn main() -> Result<()> {
    // Initialize the ModelController
    let mc = ModelController::new()?;

    let routes_api = web::routes_ticket::routes(mc.clone())
                            .route_layer(middleware::from_fn(web::mw_auth::mw_require_auth));

    let all_routes = Router::new()
        .merge(routes_hello())
        .merge(web::routes_login::routes())
        .nest("/api", routes_api)
        .layer(middleware::map_response(main_response_mapper))
        .layer(CookieManagerLayer::new())
        .fallback_service(routes_static());

    // region: --- Start Server ---
    let address = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("--> Listening on {address}\n");
    axum::Server::bind(&address)
        .serve(all_routes.into_make_service())
        .await
        .unwrap();
    // endregion: --- Start Server ---

    Ok(())
}

// region: --- Routes Hello ---
fn routes_hello() -> Router {
    Router::new()
        .route("/hello", get(handler_hello))
        .route("/hello/:name", get(handler_name)
    )
}
#[derive(Debug, Deserialize)]
struct HelloParams {
    name: Option<String>,
}

// e.g., `/hello?name=YourName or /hello`
async fn handler_hello(Query(params): Query<HelloParams>) -> impl IntoResponse {
    println!("--> {:<12} - Handler Hello - {params:?}", "HANDLER");

    let name = params.name.as_deref().unwrap_or("World");
    Html(format!("<h1>Hello, {name}!</h1>"))
}

async fn handler_name(Path(name): Path<String>) -> impl IntoResponse {
    println!("--> {:<12} - Handler Name - {name:?}", "HANDLER");

    Html(format!("<h1>Wassup, {name}!</h1>"))
}
// endregion: --- Handler ---

// region: --- custom response mappepr ---
async fn main_response_mapper(res: Response) -> Response {
    // println!("--> {:<12} - Main Response Mapper", "RES_MAPPER");

    println!();
    res
}
// endregion: --- custom response mappepr ---

// region: --- Static Routes ---
fn routes_static() -> Router {
    Router::new().nest_service("/static", get_service(ServeDir::new("./static")))
}
// endregion: --- Static Routes ---