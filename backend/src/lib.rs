use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde::{Deserialize, Serialize};
pub mod models;
pub mod schema;

#[derive(Serialize, Deserialize)]
pub struct Input {
    pub message: String,
}

pub async fn health_checker(Json(input): Json<Input>) -> Response {
    let res_message = format!("Received message: {}", input.message);
    (StatusCode::OK, Json(res_message)).into_response()
}
