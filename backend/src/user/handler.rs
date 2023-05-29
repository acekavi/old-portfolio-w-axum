use crate::utils::states::AppState;
use crate::utils::token::generate_token;

use super::error::{Error, Result};
use super::model::UserController;
use super::schema::{Claims, User, UserCreatePayload, UserLoginPayload};

use axum::extract::Path;
use axum::response::IntoResponse;
use axum::routing::{get, post};
use axum::Router;
use axum::{extract::State, Json};

use serde_json::json;
use tower_cookies::Cookies;
use uuid::Uuid;

// region: routes
pub async fn user_routes(app_state: &AppState) -> Router {
    let user_controller = UserController::new(app_state);

    Router::new()
        .route("/register", post(register))
        .route("/login", post(login))
        .route("/:user_id", get(get_user))
        .route("/logout", get(logout))
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
) -> impl IntoResponse {
    let user = state.login(payload).await;
    match user {
        Ok(user) => {
            println!("--> {:<12} : LOGIN USER", "HANDLER");

            let username = user.username.clone();
            let token = generate_token(username)
                .map_err(|e| match e {
                    Error::InternalServerFailure => Error::InternalServerFailure,
                    _ => Error::TokenCreationFailed,
                })
                .unwrap();

            axum::http::Response::builder()
                .status(axum::http::StatusCode::OK)
                .header("content-type", "application/json")
                .header(
                    axum::http::header::AUTHORIZATION,
                    axum::http::HeaderValue::from_str(&token).unwrap(),
                )
                .body(serde_json::to_string(&user).unwrap())
                .unwrap()
        }
        Err(e) => {
            println!("--> {:<12} : LOGIN USER - {:?}", "ERROR", e);

            axum::http::Response::builder()
                .status(axum::http::StatusCode::UNAUTHORIZED)
                .header("content-type", "application/json")
                .body(
                    json!({
                        "Error":
                            format!(
                                "{:?}",
                                match e {
                                    Error::InvalidQuery(_) => Error::InternalServerFailure,
                                    _ => {
                                        e
                                    }
                                }
                            )
                    })
                    .to_string(),
                )
                .unwrap()
        }
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
pub async fn logout() -> impl IntoResponse {
    // Create an axum response with the JSON body and headers
    println!("--> {:<12} : LOG OUT USER", "HANDLER");

    axum::http::Response::builder()
        .status(axum::http::StatusCode::OK)
        .header("content-type", "application/json")
        .body(serde_json::to_string(&"Logged out successfully").unwrap())
        .unwrap()
}
// endregion: logout user

// endregion: crud handlers
