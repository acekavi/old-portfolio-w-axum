use std::time::{SystemTime, UNIX_EPOCH};

use crate::{Error, Result, ctx::Ctx, error::ClientError};
use axum::http::{Method, Uri};
use serde::Serialize;
use serde_json::{json, Value};
use serde_with::skip_serializing_none;
use uuid::Uuid;

pub async fn log_request(
  uuid: Uuid,
  req_method: Method,
  uri: Uri,
  ctx: Option<Ctx>,
  service_error: Option<&Error>,
  client_error: Option<ClientError>,
) -> Result<()> {
  let timestamp = SystemTime::now()
  .duration_since(UNIX_EPOCH)
  .unwrap()
  .as_millis();

  let error_type = service_error.map(|e| e.as_ref().to_string());
  let error_data = serde_json::to_value(service_error)
    .ok()
    .and_then(|mut v| v.get_mut("data").map(|v| v.take()));

  // Create request log line
  let log_line = RequestLogline {
    uuid: uuid.to_string(),
    timestamp: timestamp.to_string(),

    req_path: uri.to_string(),
    req_method: req_method.to_string(),

    user_id: ctx.map(|ctx| ctx.user_id),
    client_error_type: client_error.map(|e| e.as_ref().to_string()),
    error_type,
    error_data,
  };
  
  // Serialize log line
  println!("--> {:<12} - {}", "LOG LINE", json!(log_line));

  Ok(())
}

#[skip_serializing_none]
#[derive(Serialize)]
struct RequestLogline{
  // UUID
  uuid: String, //UUID string formatted
  timestamp: String,  // ISO 8601 formatted

  // User ID
  user_id: Option<u32>,
    
  // Http request attr
  req_path: String,
  req_method: String,

  // Error attributes
  client_error_type: Option<String>,
  error_type: Option<String>,
  error_data: Option<Value>,


}