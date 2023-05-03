#![allow(unused)] // For only the start

pub use self::error::{Error, Result};

use std::net::SocketAddr;
use axum::{Router, response::{Html, IntoResponse}, routing::{get, get_service}, extract::{Query, Path}};
use serde::Deserialize;
use tower_http::services::ServeDir;

mod error;
mod web;

#[tokio::main]
async fn main() {
    let all_routes = Router::new()
        .merge(routes_hello())
        .merge(web::routes_login::routes())
        .fallback_service(routes_static());

    // region: --- Start Server ---
    let address = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("--> Listening on {address}\n");
    axum::Server::bind(&address)
        .serve(all_routes.into_make_service())
        .await
        .unwrap();
    // endregion: --- Start Server ---
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

// region: --- Static Routes ---
fn routes_static() -> Router {
    Router::new().nest_service("/static", get_service(ServeDir::new("./static")))
}

// endregion: --- Static Routes ---

// region: --- Login ---



// endregion: --- Login ---