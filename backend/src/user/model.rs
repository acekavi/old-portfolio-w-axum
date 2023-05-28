use chrono::Utc;

use crate::utils::states::AppState;

use super::{
    error::{Error, Result},
    schema::{User, UserCreatePayload},
};

// region: User Model Controller
#[derive(Clone)]
pub struct UserController {
    app_state: AppState,
}

impl UserController {
    pub fn new(app_state: &AppState) -> Self {
        UserController {
            app_state: app_state.clone(),
        }
    }
}
// CRUD Implementation
impl UserController {
    pub async fn create(&self, payload: UserCreatePayload) -> Result<User> {
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
        .fetch_one(&self.app_state.get_db_conn())
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
