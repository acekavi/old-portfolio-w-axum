use axum::http::request::Parts;
use axum::{async_trait, extract::FromRequestParts};
use chrono::{Duration, Utc};
use hyper::header::AUTHORIZATION;

use jsonwebtoken::{decode, Validation};

use crate::user::error::{Error, Result};
use crate::user::schema::{Claims, Keys};

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
    type Rejection = Error;

    async fn from_request_parts(parts: &mut Parts, _state: &B) -> Result<Self> {
        let jwt_secret = std::env::var("JWT_SECRET").expect("JWT_SECRET must be set");
        let keys = Keys::new(jwt_secret.as_bytes());

        let auth_token = parts
            .headers
            .get(AUTHORIZATION)
            .ok_or(Error::InvalidToken)?;
        let data = decode::<Claims>(
            auth_token.to_str().unwrap(),
            &keys.decode_key,
            &Validation::default(),
        )
        .map_err(|_| Error::InvalidToken)?;
        Ok(data.claims)
    }
}
