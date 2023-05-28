use jsonwebtoken::{DecodingKey, EncodingKey};
use serde::{Deserialize, Serialize};
use sqlx::{
    types::chrono::{DateTime, Utc},
    FromRow,
};
use uuid::Uuid;

// region: User model
#[derive(Debug, Clone, Serialize, FromRow)]
// #[sqlx(rename_all = "camelCase")]
pub struct User {
    pub id: Uuid,
    pub username: String,
    pub password: String,
    pub email: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub first_name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub last_name: Option<String>,
    #[serde(skip_serializing)]
    pub is_active: bool,
    #[serde(skip_serializing)]
    pub is_superuser: bool,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}
// endregion: User model

// region: User Create payload
#[derive(Deserialize)]
pub struct UserCreatePayload {
    pub username: String,
    pub password: String,
    pub email: String,
}
// endregion: User Create payload

// region: User Login payload
#[derive(Deserialize)]
pub struct UserLoginPayload {
    pub username: String,
    pub password: String,
}
// endregion: User Create payload

// region: User Update payload
#[derive(Deserialize)]
pub struct UserUpdatePayload {
    pub username: String,
    pub password: String,
    pub email: String,
    pub first_name: String,
    pub last_name: String,
}
// endregion: User Update payload

// region: Claims
#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub email: String,
    pub exp: i64,
}
// endregion: Claims

// region: Keys
#[derive(Clone)]
pub struct Keys {
    pub encode_key: EncodingKey,
    pub decode_key: DecodingKey,
}

impl Keys {
    pub fn new(secret: &[u8]) -> Self {
        Self {
            encode_key: EncodingKey::from_secret(secret),
            decode_key: DecodingKey::from_secret(secret),
        }
    }
}
// endregion: Keys
