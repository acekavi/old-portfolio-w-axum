use serde::{Serialize, Deserialize};
use sqlx::{FromRow, types::{chrono::{DateTime, Utc}}, PgPool};
use uuid::Uuid;

use super::error::{Result, Error};

// region: User model
#[derive(Debug, Clone, Serialize, FromRow)]
// #[sqlx(rename_all = "camelCase")]
pub struct User{
    #[serde(skip_serializing)]
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
    #[serde(skip_serializing_if = "Option::is_none")]
    pub created_at: Option<DateTime<Utc>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub updated_at: Option<DateTime<Utc>>,
}
// endregion: User model

// region: User Create payload
#[derive(Deserialize)]
pub struct UserCreatePayload{
    pub username: String,
    pub password: String,
    pub email: String,
}
// endregion: User Create payload

// region: User Update payload
#[derive(Deserialize)]
pub struct UserUpdatePayload{
    pub username: String,
    pub password: String,
    pub email: String,
    pub first_name: String,
    pub last_name: String,
}
// endregion: User Update payload

// region: User Model Controller
#[derive(Clone)]
pub struct ModalController{
    db_pool: PgPool,
}

impl ModalController{
    /// Creates a new [`ModelController`].
    pub fn new(db_pool: PgPool) -> Self {
        Self { db_pool }
    }
}

// CRUD Implementation
impl ModalController {
    pub async fn create(&self, payload: UserCreatePayload) -> Result<User>{
        let hashed_password = bcrypt::hash(payload.password, bcrypt::DEFAULT_COST).unwrap();

        let query_result = sqlx::query_as::<_, User>(
            r#"
                INSERT INTO users (username, password, email, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, username, password, email, first_name, last_name, is_active, is_superuser, created_at, updated_at
            "#,
        )
        .bind(payload.username)
        .bind(hashed_password)
        .bind(payload.email)
        .bind(Utc::now())
        .bind(Utc::now())
        .fetch_one(&self.db_pool)
        .await;

        match query_result {
            Ok(user) => Ok(user),
            Err(e) => {
                println!("--> {:<12} - {:?}", "ERROR", e);
                Err(Error::InternalServerError)
            }
        }
    }
}

// endregion: Users Model Controller