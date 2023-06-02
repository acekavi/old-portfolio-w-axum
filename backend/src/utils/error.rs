use axum::response::{IntoResponse, Response};
use hyper::StatusCode;

pub type Result<T> = core::result::Result<T, Error>;

#[derive(Debug)]
pub enum Error {
    InvalidToken,
    TokenCreationFailed,
    TokenExpired,
    ParsingTokenFailed(jsonwebtoken::errors::Error),
    InvalidQuery(String),
    InvalidHash(bcrypt::BcryptError),
    MissingFields,
    InvalidRequest,
    InternalServerFailure(String),

    // Blog errors
    Unauthorized,

    //User errors
    AlreadyExists,
    WrongCredentials,
    CurrentPasswordDoNotMatch,
}

impl IntoResponse for Error {
    fn into_response(self) -> Response {
        // Server Error
        println!("--> {:<12} : UTILS - {self:?}", "ERROR");

        // Client Error
        let err = match self {
            Error::InvalidToken => "INVALID_TOKEN",
            Error::TokenCreationFailed => "FAILED_TO_CREATE_TOKEN",
            Error::TokenExpired => "TOKEN_EXPIRED",
            Error::ParsingTokenFailed(..) => "ERROR_PARSING_TOKEN",
            Error::InvalidQuery(..) => "DATABASE_ERROR",
            Error::InvalidHash(..) => "HASH_ERROR",
            Error::MissingFields => "FILL_ALL_THE_FIELDS",
            Error::InvalidRequest => "INVALID_REQUEST",
            Error::InternalServerFailure(..) => "UNHANDLED_SERVER_ERROR",

            // Blog Errors
            Error::Unauthorized => "You are not authorized to perform this action!",

            // User Errors
            Error::AlreadyExists => "USERNAME_OR_EMAIL_ALREADY_TAKEN",
            Error::WrongCredentials => "CREDENTIALS_DO_NOT_MATCH_ANY_USER",
            Error::CurrentPasswordDoNotMatch => "CURRENT_PASSWORD_DOES_NOT_MATCH",
        };
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            serde_json::json!({ "error": err }).to_string(),
        )
            .into_response()
    }
}
