use crate::utils::states::AppState;

use super::error::Result;
use super::model::UserController;
use super::schema::{User, UserCreatePayload};

use axum::routing::post;
use axum::Router;
use axum::{extract::State, Json};

pub async fn user_routes(app_state: &AppState) -> Router {
    let user_controller = UserController::new(app_state);

    Router::new()
        .route("/register", post(create_user))
        .with_state(user_controller)
}
// endregion: routes

// region: crud handlers
// region: create
async fn create_user(
    State(state): State<UserController>,
    Json(payload): Json<UserCreatePayload>,
) -> Result<Json<User>> {
    println!("--> {:<12} - CREATE USER", "HANDLER");

    let user = state.create(payload).await?;
    Ok(Json(user))
}
// endregion: create

// endregion: crud handlers
