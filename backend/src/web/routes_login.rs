use crate::{Error, Result};
use axum::{Json, Router, routing::post};
use serde::Deserialize;
use serde_json::{Value, json};

pub fn routes() -> Router {
  Router::new()
      .route("/api/login", post(api_login))
}

async fn api_login(payload: Json<LoginParams>) -> Result<Json<Value>>{
  println!("--> {:<12} - login_api", "HANDLER");

  // Todo: Implement login logic using a database
  if payload.username != "admin" || payload.password != "admin123"{
      return Err(Error::LoginFail);
  }

  // Todo: Generate a JWT token and return it

  // region: --- Return success body ---

  let body = Json(json!({
    "result": {
      "success": true,
      "username": payload.username,
    }
  }));

  Ok(body)
  // endregion: --- Return success body ---
}

#[derive(Debug, Deserialize)]
struct LoginParams {
  pub username: String,
  pub password: String,
}