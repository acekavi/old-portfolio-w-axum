#![allow(unused)] // For only the start

use crate::model::ModelController;

pub use self::error::{Error, Result};

use axum::{
    extract::{Path, Query},
    http::{Method, Uri},
    middleware,
    response::{Html, IntoResponse, Response},
    routing::{get, get_service},
    Json, Router,
};
use ctx::Ctx;
use log::log_request;
use serde::Deserialize;
use serde_json::json;
use std::net::SocketAddr;
use tower_cookies::CookieManagerLayer;
use tower_http::{
    cors::{Any, CorsLayer},
    services::ServeDir,
};
use uuid::Uuid;

mod ctx;
mod error;
mod log;
mod model;
mod web;

#[tokio::main]
async fn main() -> Result<()> {
    // Initialize the ModelController
    let mc = ModelController::new()?;

    let routes_api = web::routes_ticket::routes(mc.clone())
        .route_layer(middleware::from_fn(web::mw_auth::mw_require_auth));

    let cors = CorsLayer::new()
        // allow `GET` and `POST` when accessing the resource
        .allow_methods([Method::GET, Method::POST])
        .allow_headers(Any)
        // allow requests from any origin
        .allow_origin(Any);

    let all_routes = Router::new()
        .merge(routes_hello())
        .merge(web::routes_login::routes())
        .nest("/api", routes_api)
        .layer(middleware::map_response(main_response_mapper))
        .layer(middleware::from_fn_with_state(
            mc.clone(),
            web::mw_auth::mw_ctx_resolver,
        ))
        .layer(CookieManagerLayer::new())
        .layer(cors)
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
        .route("/hello/:name", get(handler_name))
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
async fn main_response_mapper(
    ctx: Option<Ctx>,
    uri: Uri,
    req_method: Method,
    res: Response,
) -> Response {
    // println!("--> {:<12} - Main Response Mapper", "RES_MAPPER");
    let uuid = Uuid::new_v4();

    // Get the eventual response error
    let service_error = res.extensions().get::<Error>();
    let client_status_error = service_error.map(|e| e.client_status_and_client_error());

    // If client error, build new response
    let error_response = client_status_error
        .as_ref()
        .map(|(status_code, client_error)| {
            let client_error_body = json!({
                "error": {
                    "type": client_error.as_ref(),
                    "req_uuid": uuid.to_string(),
                }
            });

            println!("--> {:<12} - Client Error - {client_error_body}", "ERROR");

            // Build new reference from the client_error_body
            (*status_code, Json(client_error_body)).into_response()
        });

    // -- Todo: Build and log the server log line
    let client_error = client_status_error.unzip().1;
    log_request(uuid, req_method, uri, ctx, service_error, client_error).await;

    println!();
    error_response.unwrap_or(res)
}
// endregion: --- custom response mappepr ---

// region: --- Static Routes ---
fn routes_static() -> Router {
    Router::new().nest_service("/static", get_service(ServeDir::new("./static")))
}
// endregion: --- Static Routes ---
