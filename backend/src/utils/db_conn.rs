use axum::async_trait;
use sqlx::{postgres::PgPoolOptions, PgPool};

use super::DBPool;

#[async_trait]
impl DBPool for PgPool {
    async fn retrieve() -> Self {
        let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

        println!("--> {:<12} : Connection Successful", "DATABASE");
        PgPoolOptions::new()
            .max_connections(50)
            .connect(&database_url)
            .await
            .expect("Failed to connect to Database!")
    }
}
