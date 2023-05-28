use axum::async_trait;

pub mod db_conn;
pub mod set_env;
pub mod states;

#[async_trait]
pub trait DBPool {
    async fn retrieve() -> Self;
}
