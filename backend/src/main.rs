#![allow(unused)] // For only the start

use axum::{Router, response::Html};

#[tokio::main]
async fn main() {
    let routes_hello = Router::new().route(
        "/hello", get(|| async { Html("Hello, World!") }),
    );
}
