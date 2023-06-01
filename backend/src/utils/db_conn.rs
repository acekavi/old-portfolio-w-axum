use std::time::Duration;

use axum::async_trait;
use sea_orm::{ConnectOptions, Database, DatabaseConnection};

use crate::utils::env::Config;

use super::DBPool;

#[async_trait]
impl DBPool for DatabaseConnection {
    async fn retrieve() -> Self {
        let database_url = Config::new()
            .expect("Failed to retrieve Config from Environment!")
            .database_url;

        let mut opt = ConnectOptions::new(database_url);
        opt.max_connections(90)
            .min_connections(5)
            .connect_timeout(Duration::from_secs(8))
            .acquire_timeout(Duration::from_secs(8))
            .idle_timeout(Duration::from_secs(8))
            .max_lifetime(Duration::from_secs(8))
            .sqlx_logging(true);

        let db = Database::connect(opt)
            .await
            .expect("Failed to connect to Database!");

        db
    }
}
