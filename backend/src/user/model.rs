use bcrypt::verify;
use time::OffsetDateTime;
use uuid::Uuid;

use crate::utils::{schema::CustomMessage, states::AppState};

use super::{
    error::{Result, UserError},
    schema::{PasswordChangePayload, User, UserCreatePayload, UserLoginPayload, UserUpdatePayload},
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
    // region: create user
    pub async fn create(&self, payload: UserCreatePayload) -> Result<User> {
        if payload.username.is_empty() || payload.email.is_empty() || payload.password.is_empty() {
            return Err(UserError::MissingFields);
        }

        let exists: (bool,) =
            sqlx::query_as("SELECT EXISTS(SELECT 1 FROM users WHERE username = $1 AND email = $2)")
                .bind(&payload.username)
                .bind(&payload.email)
                .fetch_one(&self.app_state.get_db_conn())
                .await
                .map_err(UserError::InvalidQuery)?;

        if exists.0 {
            Err(UserError::AlreadyExists)
        } else {
            let hashed_password = bcrypt::hash(payload.password, bcrypt::DEFAULT_COST);
            let hashed_password = match hashed_password {
                Ok(hashed_password) => hashed_password,
                Err(e) => return Err(UserError::InvalidHash(e)),
            };

            let user = sqlx::query_as::<_, User>(
                r#"
                    INSERT INTO users (username, password, email, created_at, updated_at)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id, username, password, email, first_name, last_name, is_active, is_superuser, created_at, updated_at
                "#,
            )
            .bind(payload.username)
            .bind(hashed_password)
            .bind(payload.email)
            .bind(OffsetDateTime::now_utc())
            .bind(OffsetDateTime::now_utc())
            .fetch_one(&self.app_state.get_db_conn())
            .await.map_err(|e| {
                UserError::InvalidQuery(e)
            })?;

            Ok(user)
        }
    }
    // endregion: create user

    // region: login user
    pub async fn login(&self, payload: UserLoginPayload) -> Result<User> {
        if payload.username.is_empty() || payload.password.is_empty() {
            return Err(UserError::MissingFields);
        }

        let user = sqlx::query_as::<_, User>(
            r#"
                SELECT id, username, password, email, first_name, last_name, is_active, is_superuser, created_at, updated_at
                FROM users
                WHERE username = $1 OR email = $1
            "#,
        )
        .bind(payload.username)
        .fetch_optional(&self.app_state.get_db_conn())
        .await
        .map_err(|e| {
            UserError::InvalidQuery(e)
        })?;

        if user.is_some() {
            let user = user.unwrap();
            let valid = verify(payload.password, &user.password);
            match valid {
                Ok(valid) => {
                    if valid {
                        Ok(user)
                    } else {
                        Err(UserError::WrongCredentials)
                    }
                }
                Err(e) => Err(UserError::InvalidHash(e)),
            }
        } else {
            Err(UserError::WrongCredentials)
        }
        // user does not exist
    }
    // endregion: login user

    // region: get user
    pub async fn get_user(&self, user_id: Uuid, username: String) -> Result<User> {
        let user = sqlx::query_as::<_, User>(
            r#"
                SELECT id, username, password, email, first_name, last_name, is_active, is_superuser, created_at, updated_at
                FROM users
                WHERE id = $1 AND username = $2
            "#,
        )
        .bind(user_id)
        .bind(username)
        .fetch_optional(&self.app_state.get_db_conn())
        .await
        .map_err(|e| {
            UserError::InvalidQuery(e)
        })?;

        if user.is_some() {
            let user = user.unwrap();
            Ok(user)
        } else {
            Err(UserError::InvalidRequest)
        }
    }
    // endregion: get user

    // region: update user
    pub async fn update(
        &self,
        payload: UserUpdatePayload,
        user_id: Uuid,
        username: String,
    ) -> Result<User> {
        let exists: (bool,) =
            sqlx::query_as("SELECT EXISTS(SELECT 1 FROM users WHERE id = $1 AND username = $2)")
                .bind(user_id)
                .bind(&username)
                .fetch_one(&self.app_state.get_db_conn())
                .await
                .map_err(UserError::InvalidQuery)?;

        if exists.0 {
            let query_result = sqlx::query_as::<_, User>(
                r#"
                    UPDATE users
                    SET email = COALESCE($2, email),
                        first_name = COALESCE($3, first_name),
                        last_name = COALESCE($4, last_name),
                        updated_at = $5
                    WHERE id = $6 AND username = $7
                    RETURNING id, username, password, email, first_name, last_name, is_active, is_superuser, created_at, updated_at
                "#,
            )
            .bind(payload.email)
            .bind(payload.first_name)
            .bind(payload.last_name)
            .bind(OffsetDateTime::now_utc())
            .bind(user_id)
            .bind(username)
            .fetch_one(&self.app_state.get_db_conn())
            .await;
            match query_result {
                Ok(user) => {
                    return Ok(user);
                }
                Err(e) => {
                    if e.to_string()
                        .contains("duplicate key value violates unique constraint")
                    {
                        return Err(UserError::AlreadyExists);
                    } else {
                        return Err(UserError::InvalidQuery(e));
                    }
                }
            }
        }
        Err(UserError::InvalidRequest)
    }
    // endregion: update user

    // region: delete user
    pub async fn delete(&self, user_id: Uuid, username: String) -> Result<CustomMessage> {
        let exists: (bool,) =
            sqlx::query_as("SELECT EXISTS(SELECT 1 FROM users WHERE id = $1 AND username = $2)")
                .bind(user_id)
                .bind(&username)
                .fetch_one(&self.app_state.get_db_conn())
                .await
                .map_err(UserError::InvalidQuery)?;

        if exists.0 {
            let query_result = sqlx::query(
                r#"
                    DELETE FROM users
                    WHERE id = $1 AND username = $2
                "#,
            )
            .bind(user_id)
            .bind(username)
            .execute(&self.app_state.get_db_conn())
            .await;
            match query_result {
                Ok(result) => {
                    println!("--> {:<12} : DB - {:?}", "INFO", result);
                    let message = CustomMessage {
                        message: "User has been deleted successfully".to_string(),
                    };
                    Ok(message)
                }
                Err(e) => Err(UserError::InvalidQuery(e)),
            }
        } else {
            Err(UserError::InvalidRequest)
        }
    }
    // endregion: delete user

    // region: change password
    pub async fn change_password(
        &self,
        payload: PasswordChangePayload,
        user_id: Uuid,
        username: String,
    ) -> Result<CustomMessage> {
        if payload.old_password.is_empty() || payload.new_password.is_empty() {
            return Err(UserError::MissingFields);
        }

        let user = sqlx::query_as::<_, User>(
            r#"
                SELECT id, username, password, email, first_name, last_name, is_active, is_superuser, created_at, updated_at
                FROM users
                WHERE id = $1 AND username = $2
            "#,
        )
        .bind(user_id)
        .bind(&username)
        .fetch_optional(&self.app_state.get_db_conn())
        .await
        .map_err(|e| {
            UserError::InvalidQuery(e)
        })?;

        if user.is_some() {
            let user = user.unwrap();
            let valid = verify(payload.old_password, &user.password);
            match valid {
                Ok(valid) => {
                    if valid {
                        let hashed_new_password =
                            bcrypt::hash(payload.new_password, bcrypt::DEFAULT_COST);
                        let hashed_new_password = match hashed_new_password {
                            Ok(password_hash) => password_hash,
                            Err(e) => return Err(UserError::InvalidHash(e)),
                        };

                        let query_result = sqlx::query(
                            r#"
                                    UPDATE users
                                    SET password = $1,
                                        updated_at = $2
                                    WHERE id = $3 AND username = $4
                                "#,
                        )
                        .bind(hashed_new_password)
                        .bind(OffsetDateTime::now_utc())
                        .bind(user_id)
                        .bind(username)
                        .execute(&self.app_state.get_db_conn())
                        .await;
                        match query_result {
                            Ok(result) => {
                                println!("--> {:<12} : DB - {:?}", "INFO", result);
                                let message = CustomMessage {
                                    message: "Successfully Changed Password!".to_string(),
                                };
                                Ok(message)
                            }
                            Err(e) => Err(UserError::InvalidQuery(e)),
                        }
                    } else {
                        Err(UserError::CurrentPasswordDoesNotMatch)
                    }
                }
                Err(e) => Err(UserError::InvalidHash(e)),
            }
        } else {
            Err(UserError::InvalidRequest)
        }
    }
    // endregion: change password
}
// endregion: Users Model Controller
