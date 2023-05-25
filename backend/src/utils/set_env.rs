use std::env;
use dotenv::dotenv;

pub fn set_env() {
    dotenv().ok();

    let db_username = env::var("DB_USERNAME").expect("DB_USERNAME must be set.");
    let db_password = env::var("DB_PASSWORD").expect("DB_PASSWORD must be set.");
    let db_host = env::var("DB_HOST").expect("DB_HOST must be set.");
    let db_port = env::var("DB_PORT").expect("DB_PORT must be set.");
    let db_name = env::var("DB_NAME").expect("DB_NAME must be set.");

    let db_url = format!(
        "postgresql://{}:{}@{}:{}/{}",
        db_username, db_password, db_host, db_port, db_name
    );

    env::set_var("DATABASE_URL", db_url);
}