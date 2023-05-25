use axum::response::{IntoResponse, Response};
use hyper::StatusCode;


pub type Result<T> = core::result::Result<T, Error>;

#[derive(Debug)]
pub enum Error {
  AlreadyExists,
  NotFound,
  WrongPassword,
  InternalServerError,
}

// region: error boilerplate
impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> core::result::Result<(), std::fmt::Error> {
        match self {
        Error::AlreadyExists => write!(f, "User already exists!"),
        Error::NotFound => write!(f, "No user found!"),
        Error::WrongPassword => write!(f, "Recheck password!"),
        Error::InternalServerError => write!(f, "Internal server error!"),
        }
    }
}

impl std::error::Error for Error {}
// endregion: error boilerplate

impl IntoResponse for Error{
    fn into_response(self) -> Response {
        println!("--> {:<12} - {self:?}", "INTO - RES");

        (StatusCode::INTERNAL_SERVER_ERROR, "UNHANDLED_SERVER_ERROR").into_response()
    }
}