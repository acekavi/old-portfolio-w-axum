use axum::response::{IntoResponse, Response};
use hyper::StatusCode;

pub type Result<T> = core::result::Result<T, Error>;

#[derive(Debug)]
pub enum Error {
    AlreadyExists(String),
    LoginFailed,
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
    WrongCredentials,
    CurrentPasswordDoNotMatch,
}

impl IntoResponse for Error {
    fn into_response(self) -> Response {
        // Server Error
        println!("--> {:<12} : {self:?}", "ERROR");

        // Client Error
        let err = match self {
            Error::AlreadyExists(error) => format!("{error} already exists!"),
            Error::LoginFailed => "Please log in to proceed!".to_owned(),
            Error::TokenCreationFailed => "Failed to create an auth token!".to_owned(),
            Error::TokenExpired => "The token provided is expired!".to_owned(),
            Error::ParsingTokenFailed(..) => "Failed to parse token!".to_owned(),
            Error::InvalidQuery(..) => "Internal database error!".to_owned(),
            Error::InvalidHash(..) => "Failed to hash the password!".to_owned(),
            Error::MissingFields => "Please fill all the fields!".to_owned(),
            Error::InvalidRequest => "Provided request is invalid!".to_owned(),
            Error::InternalServerFailure(..) => "UNHANDLED_SERVER_ERROR".to_owned(),

            // Blog Errors
            Error::Unauthorized => "You are not authorized to perform this action!".to_owned(),

            // User Errors
            Error::WrongCredentials => "Provided credentials do not match!".to_owned(),
            Error::CurrentPasswordDoNotMatch => "Current password is invalid!".to_owned(),
        };
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            serde_json::json!({ "error": err }).to_string(),
        )
            .into_response()
    }
}
