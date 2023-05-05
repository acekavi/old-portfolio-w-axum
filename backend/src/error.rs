use axum::{response::{IntoResponse, Response}, http::StatusCode};

pub type Result<T> = core::result::Result<T, Error>;

#[derive(Debug)]
pub enum Error{
  LoginFail,

  // Model Error
  TicketCreateFailed,
  TicketGetFailIDNotFound { id: u32 },
  TicketUpdateFailIDNotFound { id: u32 },
  TicketDeleteFailIDNotFound { id: u32 },
}

impl IntoResponse for Error{
  fn into_response(self) -> Response {
      println!("--> {:<12} - {self:?}", "INTO RES");

      (StatusCode::INTERNAL_SERVER_ERROR, "UNHANDLED_CLIENT_ERROR").into_response()
  }
}