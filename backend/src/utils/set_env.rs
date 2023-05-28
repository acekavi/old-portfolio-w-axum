use dotenv::dotenv;
use std::env;

pub fn set_env() {
    dotenv().ok();

    let _db_username = env::var("DB_USERNAME").expect("DB_USERNAME must be set.");
    let _db_password = env::var("DB_PASSWORD").expect("DB_PASSWORD must be set.");
    let _db_host = env::var("DB_HOST").expect("DB_HOST must be set.");
    let _db_port = env::var("DB_PORT").expect("DB_PORT must be set.");
    let _db_name = env::var("DB_NAME").expect("DB_NAME must be set.");
    let _db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set.");
}
