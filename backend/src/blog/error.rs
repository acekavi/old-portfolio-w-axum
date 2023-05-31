use axum::response::{IntoResponse, Response};
use hyper::StatusCode;

pub type Result<T> = core::result::Result<T, BlogError>;

#[derive(Debug)]
pub enum BlogError {
    Unauthorized,
    MissingFields,
    InvalidRequest,
    InvalidQuery(sqlx::Error),
    InvalidHash(bcrypt::BcryptError),
}

impl IntoResponse for BlogError {
    fn into_response(self) -> Response {
        // Server Error
        println!("--> {:<12} : BLOG - {self:?}", "ERROR");

        // Client Error
        let err = match self {
            BlogError::Unauthorized => "You are not authorized to perform this action!",
            BlogError::MissingFields => "FILL_ALL_THE_FIELDS",
            BlogError::InvalidRequest => "INVALID_REQUEST",
            BlogError::InvalidQuery(..) => "DATABASE_ERROR",
            BlogError::InvalidHash(..) => "HASH_ERROR",
        };

        (
            StatusCode::INTERNAL_SERVER_ERROR,
            serde_json::json!({ "error": err }).to_string(),
        )
            .into_response()
    }
}
