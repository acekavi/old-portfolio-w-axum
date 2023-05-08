use axum::{http::{StatusCode, response}, response::{IntoResponse, Response}};

pub type Result<T> = core::result::Result<T, Error>;

#[derive(Clone, Debug, strum_macros::AsRefStr)]
pub enum Error{
  LoginFail,

  // Auth Error
  AuthTokenMissing,
  AuthTokenInvalid,

  CtxMissing,

  // Model Error
  TicketCreateFailed,
  TicketGetFailIDNotFound { id: u32 },
  TicketUpdateFailIDNotFound { id: u32 },
  TicketDeleteFailIDNotFound { id: u32 },
}

impl IntoResponse for Error{
  fn into_response(self) -> Response {
      println!("--> {:<12} - {self:?}", "INTO RES");

    // Create a placeholder Axum response
    let mut response = StatusCode::INTERNAL_SERVER_ERROR.into_response();

    // Insert the error code into the response
    response.extensions_mut().insert(self);

    response
  }
}

impl Error {
    pub fn client_status_and_client_error(&self) -> (StatusCode, ClientError){
      #[allow(unreachable_patterns)]
      match self {
        Self::LoginFail => (StatusCode::FORBIDDEN, ClientError::LOGIN_FAIL),

      // Model Error
      Self::TicketDeleteFailIDNotFound { .. } => {
        (StatusCode::BAD_REQUEST, ClientError::INVALID_PARAMS)
      },

      // Auth Error
      Self::AuthTokenMissing |
      Self::AuthTokenInvalid => {
        (StatusCode::FORBIDDEN, ClientError::NO_AUTH)
      },

      // Fallback
      _ => (StatusCode::INTERNAL_SERVER_ERROR, ClientError::SERVICE_ERROR),
      }
    }
}

#[derive(Debug, strum_macros::AsRefStr)]
#[allow(non_camel_case_types)]
pub enum ClientError{
  LOGIN_FAIL,
  NO_AUTH,
  INVALID_PARAMS,
  SERVICE_ERROR,
}