use axum::async_trait;

pub mod db_conn;
mod error;
pub mod set_env;
pub mod states;
pub mod token;

#[async_trait]
pub trait DBPool {
    async fn retrieve() -> Self;
}
