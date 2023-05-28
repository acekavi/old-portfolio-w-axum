use jsonwebtoken::{DecodingKey, EncodingKey};
use sqlx::{Pool, Postgres};

use crate::user::schema::Keys;

use super::DBPool;

#[derive(Clone)]
pub struct AppState {
    db_conn: DBState,
    jwt_keys: Keys,
}

// the api specific state
#[derive(Clone)]
struct DBState {
    db_pool: Pool<Postgres>,
}

impl DBState {
    async fn new() -> DBState {
        let db_pool = sqlx::PgPool::retrieve().await;
        DBState { db_pool }
    }
}

impl AppState {
    pub async fn new() -> AppState {
        let db_conn = DBState::new().await;
        let jwt_secret = std::env::var("JWT_SECRET").expect("JWT_SECRET must be set");
        let jwt_keys = Keys::new(jwt_secret.as_bytes());
        AppState { db_conn, jwt_keys }
    }

    pub fn get_db_conn(&self) -> Pool<Postgres> {
        self.db_conn.db_pool.clone()
    }

    pub fn get_encoding_key(&self) -> EncodingKey {
        self.jwt_keys.encode_key.clone()
    }

    pub fn _get_decoding_key(&self) -> DecodingKey {
        self.jwt_keys.decode_key.clone()
    }
}
