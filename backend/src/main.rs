use axum::Router;
use backend::health_checker;
use utils::{set_env, db_conn::app_state};
use std::net::SocketAddr;

mod user;
mod utils;

#[tokio::main]
async fn main() {
    set_env::set_env();
    
    let app = Router::new()
        .route("/post", axum::routing::post(health_checker))
        .with_state(app_state);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

