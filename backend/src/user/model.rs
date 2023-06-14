use bcrypt::verify;
use time::OffsetDateTime;
use uuid::Uuid;

use crate::utils::{
    error::{Error, Result},
    schema::CustomMessage,
    states::AppState,
};

use super::schema::{
    PasswordChangePayload, User, UserCreatePayload, UserLoginPayload, UserUpdatePayload,
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
            return Err(Error::MissingFields);
        }
        if !payload.email.contains('@') {
            return Err(Error::InvalidEmail);
        }

        let hashed_password = bcrypt::hash(payload.password, bcrypt::DEFAULT_COST);
        let hashed_password = match hashed_password {
            Ok(hashed_password) => hashed_password,
            Err(e) => return Err(Error::InvalidHash(e)),
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
        .await
        .map_err(|e| {
            let error = e.to_string();
            if error.contains("duplicate key value violates unique constraint") {
                Error::AlreadyExists("Username or email".to_owned())
            } else {
            Error::InvalidQuery(error)
        }}
    )?;

        Ok(user)
    }
    // endregion: create user

    // region: login user
    pub async fn login(&self, payload: UserLoginPayload) -> Result<User> {
        if payload.username.is_empty() || payload.password.is_empty() {
            return Err(Error::MissingFields);
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
            Error::InvalidQuery(e.to_string())
        })?;

        if user.is_none() {
            return Err(Error::WrongCredentials);
        }

        let user = user.unwrap();
        let valid = verify(payload.password, &user.password);
        match valid {
            Ok(valid) => {
                if valid {
                    Ok(user)
                } else {
                    Err(Error::WrongCredentials)
                }
            }
            Err(e) => Err(Error::InvalidHash(e)),
        }
    }
    // endregion: login user

    // region: get user
    pub async fn get_user(&self, user_id: Uuid, token_sub: Uuid) -> Result<User> {
        if user_id != token_sub {
            return Err(Error::InvalidRequest);
        }

        let user = sqlx::query_as::<_, User>(
            r#"
                SELECT id, username, password, email, first_name, last_name, is_active, is_superuser, created_at, updated_at
                FROM users
                WHERE id = $1
            "#,
        )
        .bind(token_sub)
        .fetch_optional(&self.app_state.get_db_conn())
        .await
        .map_err(|e| {
            Error::InvalidQuery(e.to_string())
        })?;

        if user.is_none() {
            return Err(Error::InvalidRequest);
        }
        Ok(user.unwrap())
    }
    // endregion: get user

    // region: update user
    pub async fn update(
        &self,
        payload: UserUpdatePayload,
        user_id: Uuid,
        token_sub: Uuid,
    ) -> Result<User> {
        if user_id != token_sub {
            return Err(Error::InvalidRequest);
        }
        let query_result = sqlx::query_as::<_, User>(
            r#"
                UPDATE users
                SET email = COALESCE($1, email),
                    first_name = COALESCE($2, first_name),
                    last_name = COALESCE($3, last_name),
                    updated_at = $4
                WHERE id = $5
                RETURNING id, username, password, email, first_name, last_name, is_active, is_superuser, created_at, updated_at
            "#,
        )
        .bind(payload.email)
        .bind(payload.first_name)
        .bind(payload.last_name)
        .bind(OffsetDateTime::now_utc())
        .bind(user_id)
        .fetch_one(&self.app_state.get_db_conn())
        .await
        .map_err(|e| {
            let error = e.to_string();
            if error.contains("duplicate key value violates unique constraint") {
                Error::AlreadyExists("Email".to_owned())
            } else {
            Error::InvalidQuery(error)
        }}
        )?;
        Ok(query_result)
    }
    // endregion: update user

    // region: delete user
    pub async fn delete(&self, user_id: Uuid, token_sub: Uuid) -> Result<CustomMessage> {
        if user_id != token_sub {
            return Err(Error::InvalidRequest);
        }
        let query_result = sqlx::query(
            r#"
                    DELETE FROM users
                    WHERE id = $1
                "#,
        )
        .bind(user_id)
        .execute(&self.app_state.get_db_conn())
        .await
        .map_err(|e| Error::InvalidQuery(e.to_string()))?;

        if query_result.rows_affected() == 0 {
            return Err(Error::InvalidRequest);
        }

        let message = CustomMessage {
            message: "User has been deleted successfully".to_string(),
        };
        Ok(message)
    }
    // endregion: delete user

    // region: change password
    pub async fn change_password(
        &self,
        payload: PasswordChangePayload,
        user_id: Uuid,
        token_sub: Uuid,
    ) -> Result<CustomMessage> {
        if payload.old_password.is_empty() || payload.new_password.is_empty() {
            return Err(Error::MissingFields);
        }

        if user_id != token_sub {
            return Err(Error::InvalidRequest);
        }

        let user = sqlx::query_as::<_, User>(
            r#"
                SELECT id, username, password, email, first_name, last_name, is_active, is_superuser, created_at, updated_at
                FROM users
                WHERE id = $1
            "#,
        )
        .bind(token_sub)
        .fetch_optional(&self.app_state.get_db_conn())
        .await
        .map_err(|e| {
            Error::InvalidQuery(e.to_string())
        })?;

        if user.is_none() {
            return Err(Error::InvalidRequest);
        }

        let user = user.unwrap();
        let valid = verify(payload.old_password, &user.password);
        match valid {
            Ok(valid) => {
                if !valid {
                    return Err(Error::CurrentPasswordDoNotMatch);
                }
                let hashed_new_password = bcrypt::hash(payload.new_password, bcrypt::DEFAULT_COST);
                let hashed_new_password = match hashed_new_password {
                    Ok(password_hash) => password_hash,
                    Err(e) => return Err(Error::InvalidHash(e)),
                };

                let query_result = sqlx::query(
                    r#"
                                UPDATE users
                                SET password = $1,
                                    updated_at = $2
                                WHERE id = $3
                            "#,
                )
                .bind(hashed_new_password)
                .bind(OffsetDateTime::now_utc())
                .bind(token_sub)
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
                    Err(e) => Err(Error::InvalidQuery(e.to_string())),
                }
            }
            Err(e) => Err(Error::InvalidHash(e)),
        }
    }
    // endregion: change password

    // region: verify user
    pub async fn _verify_user(&self, user_id: Uuid, token_sub: Uuid) -> Result<CustomMessage> {
        if user_id != token_sub {
            return Err(Error::InvalidRequest);
        }

        let query_result = sqlx::query(
            r#"
                    UPDATE users
                    SET is_active = true,
                        updated_at = $1
                    WHERE id = $2
                "#,
        )
        .bind(OffsetDateTime::now_utc())
        .bind(user_id)
        .execute(&self.app_state.get_db_conn())
        .await
        .map_err(|e| Error::InvalidQuery(e.to_string()))?;

        if query_result.rows_affected() == 0 {
            return Err(Error::InvalidRequest);
        }

        let message = CustomMessage {
            message: "User has been verified successfully".to_string(),
        };
        Ok(message)
    }
    // endregion: verify user
}
// endregion: Users Model Controller
