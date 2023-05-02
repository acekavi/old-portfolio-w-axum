#![allow(unused)] // For only the start

use std::net::SocketAddr;
use axum::{Router, response::{Html, IntoResponse}, routing::get, extract::{Query, Path}};
use serde::Deserialize;

#[tokio::main]
async fn main() {
    let routes_hello = Router::new()
        .merge(routes_hello());

    // region: --- Start Server ---
    let address = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("--> Listening on {address}\n");
    axum::Server::bind(&address)
        .serve(routes_hello.into_make_service())
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