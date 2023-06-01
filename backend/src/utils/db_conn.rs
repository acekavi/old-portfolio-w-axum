use axum::async_trait;
use diesel::{Connection, PgConnection};

use crate::utils::env::Config;

use super::DBPool;

#[async_trait]
impl DBPool for PgConnection {
    async fn retrieve() -> Self {
        let database_url = Config::new()
            .expect("Failed to retrieve Config from Environment!")
            .database_url;

        let conection: PgConnection = PgConnection::establish(&database_url)
            .unwrap_or_else(|_| panic!("Error connecting to {}", database_url));

        println!("--> {:<12} : Connection Successful", "DATABASE");

        return conection;
    }
}
