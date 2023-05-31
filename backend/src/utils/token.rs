use axum::http::request::Parts;
use axum::{async_trait, extract::FromRequestParts};
use chrono::{Duration, Utc};
use hyper::header::AUTHORIZATION;

use jsonwebtoken::{decode, encode, Header, Validation};

use super::env::Config;
use super::error::{Result, UtilError};
use super::schema::{Claims, Keys};

// 8 hours timestamp before jwt expiration
pub fn get_timestamp_8h() -> i64 {
    let now = Utc::now();
    let eight_hours = Duration::hours(8);
    let eight_hours_from_now = now + eight_hours;
    eight_hours_from_now.timestamp()
}

// verify_token and extract_token are used in the middleware
#[async_trait]
impl<B> FromRequestParts<B> for Claims
where
    B: Send + Sync,
{
    type Rejection = UtilError;

    async fn from_request_parts(parts: &mut Parts, _state: &B) -> Result<Self> {
        let keys = Keys::new(
            Config::new()
                .expect("Failed to retrieve Config from Environment!")
                .jwt_secret
                .as_bytes(),
        );
        let auth_token = parts
            .headers
            .get(AUTHORIZATION)
            .ok_or(UtilError::InvalidToken)?;
        let data = decode::<Claims>(
            auth_token.to_str().unwrap(),
            &keys.decode_key,
            &Validation::default(),
        )
        .map_err(|_| UtilError::InvalidToken)?;

        if data.claims.exp < Utc::now().timestamp() {
            return Err(UtilError::TokenExpired);
        }

        Ok(data.claims)
    }
}

// generate_token is used in the login handler
pub fn generate_token(username: String) -> Result<String> {
    let keys = Keys::new(
        Config::new()
            .expect("Failed to retrieve Config from Environment!")
            .jwt_secret
            .as_bytes(),
    );

    let claims = Claims {
        username,
        exp: get_timestamp_8h(),
    };

    let token = encode(&Header::default(), &claims, &keys.encode_key)
        .map_err(|_| UtilError::TokenCreationFailed)?;

    Ok(token)
}
