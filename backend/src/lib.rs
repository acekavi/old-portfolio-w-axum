use axum::{body::Bytes, Json, response::IntoResponse};
use hyper::StatusCode;
use serde::{Serialize, Deserialize};


#[derive(Serialize, Deserialize)]
pub struct Input {
  pub  message: String,
}

pub async fn post_handler(Json(input): Json<Input>) -> impl IntoResponse {
  let response = format!("Received message: {}", input.message);
  (StatusCode::OK, Bytes::from(response))
}