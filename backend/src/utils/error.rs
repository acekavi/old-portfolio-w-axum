use axum::response::{IntoResponse, Response};
use hyper::StatusCode;

pub type Result<T> = core::result::Result<T, UtilError>;

#[derive(Debug)]
pub enum UtilError {
    InvalidToken,
    TokenCreationFailed,
    TokenExpired,
}

impl IntoResponse for UtilError {
    fn into_response(self) -> Response {
        // Server Error
        println!("--> {:<12} : UTILS - {self:?}", "ERROR");

        // Client Error
        let err = match self {
            UtilError::InvalidToken => "INVALID_TOKEN",
            UtilError::TokenCreationFailed => "FAILED_TO_CREATE_TOKEN",
            UtilError::TokenExpired => "TOKEN_EXPIRED",
        };
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            serde_json::json!({ "error": err }).to_string(),
        )
            .into_response()
    }
}
