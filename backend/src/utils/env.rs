use dotenv::dotenv;
use std::env;

#[derive(Debug, Clone)]
pub struct Config {
    pub database_url: String,
    pub jwt_secret: String,
}

impl Config {
    pub fn new() -> Result<Self, String> {
        dotenv().ok();

        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set.");
        let jwt_secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set.");

        Ok(Config {
            database_url,
            jwt_secret,
        })
    }
}
