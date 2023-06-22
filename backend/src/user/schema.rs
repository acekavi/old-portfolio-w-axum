use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use time::{serde::timestamp, OffsetDateTime};
use uuid::Uuid;

// region: User model
#[derive(Debug, Clone, Deserialize, Serialize, FromRow)]
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
    #[serde(with = "timestamp")]
    pub created_at: OffsetDateTime,
    #[serde(with = "timestamp")]
    pub updated_at: OffsetDateTime,
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

// region: User Login response
fn is_false(b: &bool) -> bool {
    !(*b)
}

#[derive(Serialize)]
pub struct UserResponse {
    pub id: Uuid,
    pub username: String,
    pub email: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub first_name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub last_name: Option<String>,
    pub is_active: bool,
    #[serde(skip_serializing_if = "is_false")]
    pub is_superuser: bool,
}
// endregion: User Login response

// region: Token response
#[derive(Serialize)]
pub struct UserID {
    pub id: Uuid,
    #[serde(skip_serializing)]
    pub is_superuser: bool,
}
