use crate::user::handler::user_routes;
use axum::{middleware, response::Response, Router};
use backend::health_checker;
use blog::handler::blog_routes;
use hyper::Method;
use tower_cookies::CookieManagerLayer;
use tower_http::cors::CorsLayer;

use std::{net::SocketAddr, sync::Arc};

use utils::states::AppState;

mod blog;
mod user;
mod utils;

#[tokio::main]
async fn main() {
    let state = Arc::new(AppState::new().await);

    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE])
        .allow_credentials(true);

    let app = Router::new()
        .route("/post", axum::routing::post(health_checker))
        .nest("/user", user_routes(&state).await)
        .nest("/blog", blog_routes(&state).await)
        .layer(middleware::map_response(main_response_mapper))
        // .layer(middleware::AddExtension(state))
        .layer(cors)
        .layer(CookieManagerLayer::new());

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn main_response_mapper(res: Response) -> Response {
    println!();
    res
}
