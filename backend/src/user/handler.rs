use crate::utils::states::AppState;

use super::error::{Result};
use super::model::UserController;
use super::schema::{User, UserCreatePayload, UserLoginPayload};

use axum::routing::post;
use axum::Router;
use axum::{extract::State, Json};

use tower_cookies::Cookies;

// region: routes
pub async fn user_routes(app_state: &AppState) -> Router {
    let user_controller = UserController::new(app_state);

    Router::new()
        .route("/register", post(register))
        .route("/login", post(login))
        .with_state(user_controller)
}
// endregion: routes

// region: crud handlers
// region: create
async fn register(
    State(state): State<UserController>,
    Json(payload): Json<UserCreatePayload>,
) -> Result<Json<User>> {
    let user = state.create(payload).await?;
    println!("--> {:<12} : CREATE USER", "HANDLER");

    Ok(Json(user))
}
// endregion: create

// region: read
pub async fn login(
    cookies: Cookies,
    State(state): State<UserController>,
    Json(payload): Json<UserLoginPayload>,
) -> Result<Json<User>> {
    let user = state.login(cookies, payload).await?;
    println!("--> {:<12} : LOGIN USER", "HANDLER");

    Ok(Json(user))
}
// endregion: read
// endregion: crud handlers
