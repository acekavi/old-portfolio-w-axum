use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

// region: User model
#[derive(Debug, Clone, Deserialize, Serialize, FromRow)]
// #[sqlx(rename_all = "camelCase")]
pub struct User {
    pub id: Uuid,
    pub username: String,
    #[serde(skip_serializing)]
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
    pub email: Option<String>,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
}
// endregion: User Update payload
// region: password change payload
#[derive(Deserialize)]
pub struct PasswordChangePayload {
    pub old_password: String,
    pub new_password: String,
}
// endregion: password change payload
