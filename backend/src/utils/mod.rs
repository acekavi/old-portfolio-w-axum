use axum::async_trait;

pub mod db_conn;
pub mod env;
pub mod error;
pub mod schema;
pub mod states;
pub mod token;

#[async_trait]
pub trait DBPool {
    async fn retrieve() -> Self;
}
