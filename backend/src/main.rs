use axum::Router;
use backend::health_checker;
use utils::{set_env};
use std::{net::SocketAddr};
use crate::user::handler::user_routes;

mod user;
mod utils;

#[tokio::main]
async fn main(){
    set_env::set_env();

    let app = Router::new()
        .route("/post", axum::routing::post(health_checker))
        .nest("/user", user_routes().await);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

