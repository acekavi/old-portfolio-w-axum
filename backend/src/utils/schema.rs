use jsonwebtoken::{DecodingKey, EncodingKey};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

// region: Claims
#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub aud: String, // Optional. Audience
    pub exp: i64, // Required (validate_exp defaults to true in validation). Expiration time (as UTC timestamp)
    pub iat: i64, // Optional. Issued at (as UTC timestamp)
    pub iss: String, // Optional. Issuer
    pub sub: Uuid, // Optional. Subject (whom token refers to)
    pub is_admin: bool,
}
// endregion: Claims

// region: CustomMessage
#[derive(Serialize)]
pub struct CustomMessage {
    pub message: String,
}
// endregion: CustomMessage

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
