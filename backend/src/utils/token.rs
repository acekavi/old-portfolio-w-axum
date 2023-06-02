use axum::http::request::Parts;
use axum::{async_trait, extract::FromRequestParts};
use hyper::header::AUTHORIZATION;

use jsonwebtoken::{decode, encode, Algorithm, Header, Validation};
use time::{Duration, OffsetDateTime};
use uuid::Uuid;

use super::env::Config;
use super::error::{Error, Result};
use super::schema::{Claims, Keys};

// 8 hours timestamp before jwt expiration
pub fn get_timestamp_8h() -> i64 {
    let now = jsonwebtoken::get_current_timestamp() as i64;
    let eight_hours = Duration::hours(8).whole_seconds();

    now + eight_hours
}

// verify_token and extract_token are used in the middleware
#[async_trait]
impl<B> FromRequestParts<B> for Claims
where
    B: Send + Sync,
{
    type Rejection = Error;

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
            .ok_or(Error::InvalidToken)?;

        let validation = Validation::new(Algorithm::HS256);
        let data = decode::<Claims>(
            auth_token.to_str().unwrap().replace("Bearer ", "").as_str(),
            &keys.decode_key,
            &validation,
        )
        .map_err(Error::ParsingTokenFailed)?;

        if data.claims.exp < OffsetDateTime::now_utc().unix_timestamp() {
            return Err(Error::TokenExpired);
        }

        Ok(data.claims)
    }
}

// generate_token is used in the login handler
pub fn generate_token(sub: Uuid, is_admin: bool) -> Result<String> {
    let keys = Keys::new(
        Config::new()
            .expect("Failed to retrieve Config from Environment!")
            .jwt_secret
            .as_bytes(),
    );

    let claims = Claims {
        exp: get_timestamp_8h(),
        sub,
        aud: "public".to_string(),
        iat: jsonwebtoken::get_current_timestamp() as i64,
        iss: "acekavi.me".to_string(),
        is_admin,
    };

    let token = encode(&Header::default(), &claims, &keys.encode_key)
        .map_err(|_| Error::TokenCreationFailed)?;

    Ok(token)
}
