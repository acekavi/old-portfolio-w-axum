#![allow(unused)] // For only the start

use std::net::SocketAddr;
use axum::{Router, response::{Html, IntoResponse}, routing::get};

#[tokio::main]
async fn main() {
    let routes_hello = Router::new().route(
        "/hello", get(handler_hello),
    );

    // region: --- Start Server ---
    let address = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("--> Listening on {address}\n");
    axum::Server::bind(&address)
        .serve(routes_hello.into_make_service())
        .await
        .unwrap();
    // endregion: --- Start Server ---
}

// region: --- Handler ---
async fn handler_hello() -> impl IntoResponse {
    println!("--> {:<12} - Handler Hello", "HANDLER");

    Html("<h1>Hello, World!</h1>")
}
// endregion: --- Handler ---