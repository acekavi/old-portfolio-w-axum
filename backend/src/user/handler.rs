use crate::utils::{
    error::Result,
    schema::{Claims, CustomMessage},
    states::AppState,
    token::generate_token,
};

use super::schema::{
    PasswordChangePayload, User, UserCreatePayload, UserLoginPayload, UserUpdatePayload,
};
use super::{model::UserController, schema::UserResponse};

use axum::extract::Path;
use axum::response::{IntoResponse, Response};
use axum::routing::{get, patch, post};
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
        .route("/logout", get(logout))
        .route("/password/:user_id", patch(change_password))
        .route("/:user_id", get(get_user).delete(delete_user).patch(update))
        .with_state(user_controller)
}
// endregion: routes

// region: user auth handlers
// region: signup
async fn register(
    State(state): State<UserController>,
    Json(payload): Json<UserCreatePayload>,
) -> Result<Response> {
    let user = state.create(payload).await?;
    println!("--> {:<12} : CREATE USER", "HANDLER");

    let token = generate_token(user.id, user.is_superuser);

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
// endregion: signup

// todo!: verify user with email

// region: login
pub async fn login(
    _cookies: Cookies,
    State(state): State<UserController>,
    Json(payload): Json<UserLoginPayload>,
) -> Result<Response> {
    println!("--> {:<12} : LOGIN USER", "HANDLER");
    let user = state.login(payload).await?;

    let token = generate_token(user.id, user.is_superuser);

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
    claims: Claims,
    State(state): State<UserController>,
) -> Result<Json<UserResponse>> {
    let user = state.get_user(user_id, claims.sub).await?;

    println!("--> {:<12} : GET USER", "HANDLER");
    Ok(Json(user))
}
// endregion: get user

// region: logout user
pub async fn logout(_claims: Claims) -> Result<Response> {
    // Create an axum response with the JSON body and headers
    println!("--> {:<12} : LOG OUT USER", "HANDLER");

    let mut headers = HeaderMap::new();
    headers.remove(axum::http::header::AUTHORIZATION);

    let message = CustomMessage { message: true };

    Ok((StatusCode::OK, headers, Json(message)).into_response())
}
// endregion: logout user

// region: update user
async fn update(
    Path(user_id): Path<Uuid>,
    claims: Claims,
    State(state): State<UserController>,
    Json(payload): Json<UserUpdatePayload>,
) -> Result<Json<User>> {
    let user = state.update(payload, user_id, claims.sub).await?;
    println!("--> {:<12} : UPDATE USER", "HANDLER");

    Ok(Json(user))
}
// endregion: update user

// region: delete user
async fn delete_user(
    Path(user_id): Path<Uuid>,
    claims: Claims,
    State(state): State<UserController>,
) -> Result<Json<CustomMessage>> {
    let result = state.delete(user_id, claims.sub).await?;
    println!("--> {:<12} : DELETE USER", "HANDLER");

    Ok(Json(result))
}
// endregion: delete user

// region: change password
async fn change_password(
    Path(user_id): Path<Uuid>,
    claims: Claims,
    State(state): State<UserController>,
    Json(payload): Json<PasswordChangePayload>,
) -> Result<Json<CustomMessage>> {
    let result = state.change_password(payload, user_id, claims.sub).await?;
    println!("--> {:<12} : CHANGE PASSWORD", "HANDLER");

    Ok(Json(result))
}
// endregion: change password

// todo!: add reset password with email

// endregion: user auth handlers
