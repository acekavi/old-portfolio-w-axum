use jsonwebtoken::{DecodingKey, EncodingKey};
use serde::{Deserialize, Serialize};

// region: Claims
#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub username: String,
    pub is_active: bool,
    pub is_superuser: bool,
    pub exp: i64,
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
