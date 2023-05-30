use axum::response::{IntoResponse, Response};
use hyper::StatusCode;

pub type Result<T> = core::result::Result<T, UserError>;

#[derive(Debug)]
pub enum UserError {
    AlreadyExists,
    MissingFields,
    WrongCredentials,
    InvalidQuery(sqlx::Error),
    InvalidHash(bcrypt::BcryptError),
    _InternalServerFailure,
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
            UserError::InvalidQuery(..) => "DATABASE_ERROR",
            UserError::InvalidHash(..) => "HASH_ERROR",
            UserError::_InternalServerFailure => "UNHANDLED_SERVER_ERROR",
        };

        (
            StatusCode::INTERNAL_SERVER_ERROR,
            serde_json::json!({ "error": err }).to_string(),
        )
            .into_response()
    }
}
