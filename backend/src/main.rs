use crate::user::handler::user_routes;
use axum::{middleware, response::Response, Router};
use backend::health_checker;
use tower_cookies::CookieManagerLayer;

use std::{net::SocketAddr, sync::Arc};

use utils::states::AppState;

mod blog;
mod user;
mod utils;

#[tokio::main]
async fn main() {
    let state = Arc::new(AppState::new().await);

    let app = Router::new()
        .route("/post", axum::routing::post(health_checker))
        .nest("/user", user_routes(&state).await)
        .layer(middleware::map_response(main_response_mapper))
        // .layer(middleware::AddExtension(state))
        .layer(CookieManagerLayer::new());

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn main_response_mapper(res: Response) -> Response {
    println!();
    res
}
