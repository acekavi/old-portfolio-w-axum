use bcrypt::verify;
use chrono::Utc;
use jsonwebtoken::{encode, Header};
use tower_cookies::{Cookie, Cookies};

use crate::utils::{states::AppState, token::get_timestamp_8h};

use super::{
    error::{Error, Result},
    schema::{Claims, User, UserCreatePayload, UserLoginPayload},
    AUTH_TOKEN,
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
        if payload.username.is_empty() || payload.email.is_empty() || payload.password.is_empty() {
            return Err(Error::MissingFields);
        }

        let user = sqlx::query_as::<_, User>(
            r#"
                SELECT id, username, password, email, first_name, last_name, is_active, is_superuser, created_at, updated_at
                FROM users
                WHERE username = $1 OR email = $2
            "#,
        )
        .bind(&payload.username)
        .bind(&payload.email)
        .fetch_optional(&self.app_state.get_db_conn())
        .await
        .map_err(|e| {
            println!("--> {:<12} : DB - {:?}", "ERROR", e);
            Error::InternalServerErr
        })?;

        if let Some(_user) = user {
            Err(Error::AlreadyExists)
        } else {
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
                    println!("--> {:<12} : DB - {:?}", "ERROR", e);
                    Err(Error::InternalServerErr)
                }
            }
        }
    }

    pub async fn login(&self, cookies: Cookies, payload: UserLoginPayload) -> Result<User> {
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
            println!("--> {:<12} : DB - {:?}", "ERROR", e);
            Error::InternalServerErr
        })?;

        if let Some(user) = user {
            let valid = verify(payload.password, &user.password);
            if !valid.unwrap() {
                return Err(Error::WrongCredentials);
            } else {
                let claims = Claims {
                    email: user.email.to_owned(),
                    exp: get_timestamp_8h(),
                };

                let token = encode(
                    &Header::default(),
                    &claims,
                    &self.app_state.get_encoding_key(),
                )
                .map_err(|_| Error::TokenCreationFailed)?;
                cookies.add(Cookie::new(AUTH_TOKEN, token));
                // todo!("complete the token validation and return the user model");
                return Ok(user);
            }
        }
        // user does not exist
        Err(Error::WrongCredentials)
    }
}

// endregion: Users Model Controller
