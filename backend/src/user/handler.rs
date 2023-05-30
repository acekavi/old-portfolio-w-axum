use crate::utils::states::AppState;
use crate::utils::token::generate_token;

use super::error::Result;
use super::model::UserController;
use super::schema::{
    Claims, CustomMessage, User, UserCreatePayload, UserLoginPayload, UserUpdatePayload,
};

use axum::extract::Path;
use axum::response::{IntoResponse, Response};
use axum::routing::{delete, get, patch, post};
use axum::Router;
use axum::{extract::State, Json};

use hyper::{HeaderMap, StatusCode};

use tower_cookies::Cookies;
use uuid::Uuid;

// region: routes
pub async fn user_routes(app_state: &AppState) -> Router {
    let user_controller = UserController::new(app_state);

    Router::new()
        .route("/register", post(register))
        .route("/login", post(login))
        .route("/:user_id", get(get_user))
        .route("/:user_id", patch(update))
        .route("/logout", get(logout))
        .route("/:user_id", delete(delete_user))
        .with_state(user_controller)
}
// endregion: routes

// region: crud handlers
// region: signup
async fn register(
    State(state): State<UserController>,
    Json(payload): Json<UserCreatePayload>,
) -> Result<Json<User>> {
    let user = state.create(payload).await?;
    println!("--> {:<12} : CREATE USER", "HANDLER");

    Ok(Json(user))
}
// endregion: signup

// region: login
pub async fn login(
    _cookies: Cookies,
    State(state): State<UserController>,
    Json(payload): Json<UserLoginPayload>,
) -> Result<Response> {
    println!("--> {:<12} : LOGIN USER", "HANDLER");
    let user = state.login(payload).await?;
    let username = user.username.clone();

    let token = generate_token(username);

    match token {
        Ok(token) => {
            let mut headers = HeaderMap::new();
            headers.insert(
                axum::http::header::AUTHORIZATION,
                axum::http::HeaderValue::from_str(&token).unwrap(),
            );
            Ok((StatusCode::OK, headers, Json(user)).into_response())
        }
        Err(error) => Ok(error.into_response()),
    }
}
// endregion: login

// region: get user
pub async fn get_user(
    Path(user_id): Path<Uuid>,
    clamis: Claims,
    State(state): State<UserController>,
) -> Result<Json<User>> {
    let user = state.get_user(user_id, clamis.username).await?;

    println!("--> {:<12} : GET USER", "HANDLER");
    Ok(Json(user))
}
// endregion: get user

// region: logout user
pub async fn logout(_clamis: Claims) -> Result<Response> {
    // Create an axum response with the JSON body and headers
    println!("--> {:<12} : LOG OUT USER", "HANDLER");

    let mut headers = HeaderMap::new();
    headers.remove(axum::http::header::AUTHORIZATION);

    let message = CustomMessage {
        message: "User has been logged out successfully".to_string(),
    };

    Ok((StatusCode::OK, headers, Json(message)).into_response())
}
// endregion: logout user

// region: update user
async fn update(
    State(state): State<UserController>,
    Path(user_id): Path<Uuid>,
    clamis: Claims,
    Json(payload): Json<UserUpdatePayload>,
) -> Result<Json<User>> {
    let user = state.update(payload, user_id, clamis.username).await?;
    println!("--> {:<12} : UPDATE USER", "HANDLER");

    Ok(Json(user))
}
// endregion: update user

// region: delete user
async fn delete_user(
    Path(user_id): Path<Uuid>,
    clamis: Claims,
    State(state): State<UserController>,
) -> Result<Json<CustomMessage>> {
    let result = state.delete(user_id, clamis.username).await?;
    println!("--> {:<12} : DELETE USER", "HANDLER");

    Ok(Json(result))
}
// endregion: delete user

// todo!: add change password
// todo!: add reset password

// endregion: crud handlers
