use axum::{response::IntoResponse, Json};
use hyper::{body::Bytes, StatusCode};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Input {
  pub message: String,
}

pub async fn health_checker(Json(input): Json<Input>) -> impl IntoResponse {
  let response = format!("Received message: {}", input.message);
  (StatusCode::OK, Bytes::from(response))
}