use serde::{Serialize, Deserialize};
use sqlx::{PgPool, FromRow};

// region: User model
#[derive(Debug, Clone, Serialize, FromRow)]
#[sqlx(rename_all = "camelCase")]
pub struct User{
    pub id: i32,
    pub username: String,
    pub password: String,
    pub email: String,
    pub first_name: String,
    pub last_name: String,
    pub is_active: bool,
    pub is_superuser: bool,
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
pub struct ModelController{
    pub pool: PgPool,
}

impl ModelController{
    /// Creates a new [`ModelController`].
    pub fn new(pool: PgPool) -> Self{
        Self{pool}
    }
}

// CRUD Implementation
impl ModelController {
    pub async fn register(&self, payload: UserCreatePayload) -> Result<User, sqlx::Error>{
        let hashed_password = bcrypt::hash(payload.password, bcrypt::DEFAULT_COST)?;

        let user = sqlx::query_as::<_, User>(
            r#"
                INSERT INTO users (username, password, email)
                VALUES ($1, $2, $3)
                RETURNING id, username, password, email, first_name, last_name, is_active, is_superuser
            "#,
        )
        .bind(payload.username)
        .bind(hashed_password)
        .bind(payload.email)
        .fetch_one(&self.pool)
        .await?;

        Ok(user)
    }
}

// endregion: Users Model Controller