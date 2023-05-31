use axum::response::{IntoResponse, Response};
use hyper::StatusCode;

pub type Result<T> = core::result::Result<T, UserError>;

#[derive(Debug)]
pub enum UserError {
    AlreadyExists,
    MissingFields,
    WrongCredentials,
    CurrentPasswordDoesNotMatch,
    InvalidRequest,
    InvalidQuery(sqlx::Error),
    InvalidHash(bcrypt::BcryptError),
}

impl IntoResponse for UserError {
    fn into_response(self) -> Response {
        // Server Error
        println!("--> {:<12} : USER - {self:?}", "ERROR");

        // Client Error
        let err = match self {
            UserError::AlreadyExists => "USERNAME_OR_EMAIL_ALREADY_TAKEN",
            UserError::MissingFields => "FILL_ALL_THE_FIELDS",
            UserError::WrongCredentials => "CREDENTIALS_DO_NOT_MATCH_ANY_USER",
            UserError::CurrentPasswordDoesNotMatch => "CURRENT_PASSWORD_DOES_NOT_MATCH",
            UserError::InvalidRequest => "INVALID_REQUEST",
            UserError::InvalidQuery(..) => "DATABASE_ERROR",
            UserError::InvalidHash(..) => "HASH_ERROR",
        };

        (
            StatusCode::INTERNAL_SERVER_ERROR,
            serde_json::json!({ "error": err }).to_string(),
        )
            .into_response()
    }
}
