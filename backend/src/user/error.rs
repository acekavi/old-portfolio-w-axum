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
    TokenExpired,
    InvalidQuery(sqlx::Error),
    InternalServerFailure,
}

impl IntoResponse for Error {
    fn into_response(self) -> Response {
        // Server Error
        println!("--> {:<12} : USER - {self:?}", "ERROR");

        // Client Error
        let err = match self {
            Error::AlreadyExists => "USERNAME_OR_EMAIL_ALREADY_TAKEN",
            Error::MissingFields => "FILL_ALL_THE_FIELDS",
            Error::InvalidToken => "INVALID_TOKEN",
            Error::WrongCredentials => "CREDENTIALS_DO_NOT_MATCH_ANY_USER",
            Error::TokenCreationFailed => "FAILED_TO_CREATE_TOKEN",
            Error::TokenExpired => "TOKEN_EXPIRED",
            Error::InternalServerFailure => "UNHANDLED_SERVER_ERROR",
            Error::InvalidQuery(..) => "DATABASE_ERROR",
        };

        (
            StatusCode::INTERNAL_SERVER_ERROR,
            serde_json::json!({ "error": err }).to_string(),
        )
            .into_response()
    }
}
