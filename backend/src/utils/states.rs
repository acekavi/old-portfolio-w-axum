use sqlx::{Pool, Postgres};

use super::DBPool;

#[derive(Clone)]
pub struct AppState {
    db_conn: DBState,
}

// the api specific state
#[derive(Clone)]
struct DBState {
    db_pool: Pool<Postgres>,
}

impl DBState {
    async fn new() -> DBState {
        let db_pool = sqlx::PgPool::retrieve().await;
        DBState { db_pool }
    }
}

impl AppState {
    pub async fn new() -> AppState {
        let db_conn = DBState::new().await;
        AppState { db_conn }
    }

    pub fn get_db_conn(&self) -> Pool<Postgres> {
        self.db_conn.db_pool.clone()
    }
}
