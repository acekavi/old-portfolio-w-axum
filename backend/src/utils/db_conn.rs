use axum::async_trait;
use sqlx::{postgres::PgPoolOptions, PgPool};

use crate::utils::env::Config;

use super::DBPool;

#[async_trait]
impl DBPool for PgPool {
    async fn retrieve() -> Self {
        let database_url = Config::new()
            .expect("Failed to retrieve Config from Environment!")
            .database_url;

        println!("--> {:<12} : Connection Successful", "DATABASE");
        PgPoolOptions::new()
            .max_connections(50)
            .connect(&database_url)
            .await
            .expect("Failed to connect to Database!")
    }
}
