use axum::Router;
use axum::extract::FromRef;
use axum::routing::post;
use axum::{extract::State, Json};
use sqlx::postgres::PgPoolOptions;
use super::model::{UserCreatePayload, User, ModalController};
use super::error::{Result};

// region: routes
#[derive(Clone, FromRef)]
struct AppState {
    user_controller: ModalController
}

impl AppState {
    pub fn new(user_controller: ModalController) -> Self {
        Self {
            user_controller,
        }
    }
}

pub async fn user_routes() -> Router {
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let db_pool = PgPoolOptions::new()
    .max_connections(10)
    .connect(&database_url)
    .await.unwrap();

    let user_controller = ModalController::new(db_pool.clone());
    let app_state = AppState::new(user_controller);

    axum::Router::new()
        .route("/register", post(create_user))
        .with_state(app_state)
}
// endregion: routes

// region: crud handlers
// region: create
async fn create_user(
    State(state): State<AppState>,
    Json(payload): Json<UserCreatePayload>,
) -> Result<Json<User>> {
    println!("--> {:<12} - CREATE USER", "HANDLER");

    let user = state.user_controller.create(payload).await?;
    Ok(Json(user))
}
// endregion: create

// endregion: crud handlers