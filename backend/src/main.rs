use axum::{
    Router,
};
use backend::post_handler;
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    let app = Router::new().route("/post", axum::routing::post(post_handler));

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}