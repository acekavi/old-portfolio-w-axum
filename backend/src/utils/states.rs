use std::sync::{Arc, Mutex};

use diesel::PgConnection;

use super::DBPool;

#[derive(Clone)]
pub struct AppState {
    db_conn: DBState,
}

// the api specific state
#[derive(Clone)]
struct DBState {
    db_pool: Arc<Mutex<PgConnection>>,
}

impl DBState {
    async fn new() -> DBState {
        let db_pool = PgConnection::retrieve().await;
        DBState {
            db_pool: Arc::new(Mutex::new(db_pool)),
        }
    }
}

impl AppState {
    pub async fn new() -> AppState {
        let db_conn = DBState::new().await;
        AppState { db_conn }
    }

    pub fn get_db_conn(&self) -> Arc<Mutex<PgConnection>> {
        self.db_conn.db_pool.clone()
    }
}
