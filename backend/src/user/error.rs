use axum::response::{IntoResponse, Response};
use hyper::StatusCode;

pub type Result<T> = core::result::Result<T, Error>;

#[derive(Debug)]
pub enum Error {
    AlreadyExists,
    MissingFields,
    InvalidToken,
    WrongCredentials,
    TokenCreationFailed,
    //   NotFound,
    //   WrongPassword,
    InternalServerErr,
}

impl IntoResponse for Error {
    fn into_response(self) -> Response {
        // Server Error
        println!("--> {:<12} : USER - {self:?}", "ERROR");

        // Client Error
        let err = match self {
            Error::AlreadyExists => "USERNAME_OR_EMAIL_ALREADY_EXISTS",
            Error::MissingFields => "FILL_ALL_FIELDS",
            Error::InvalidToken => "INVALID_TOKEN",
            Error::WrongCredentials => "CREDENTIALS_DO_NOT_MATCH_ANY_USER",
            Error::TokenCreationFailed => "FAILED_TO_CREATE_TOKEN",
            // Error::NotFound => (StatusCode::NOT_FOUND, "NOT_FOUND"),
            // Error::WrongPassword => (StatusCode::UNAUTHORIZED, "WRONG_PASSWORD"),
            Error::InternalServerErr => "UNHANDLED_SERVER_ERROR",
        };

        (
            StatusCode::INTERNAL_SERVER_ERROR,
            serde_json::json!({ "error": err }).to_string(),
        )
            .into_response()
    }
}
