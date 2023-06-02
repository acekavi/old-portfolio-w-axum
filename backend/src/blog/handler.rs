use axum::{
    extract::{Path, State},
    routing::{get, patch, post},
    Json, Router,
};
use uuid::Uuid;

use super::schema::BlogEditPayload;
use crate::utils::{
    error::Result,
    schema::{Claims, CustomMessage},
    states::AppState,
};

use super::{
    model::BlogController,
    schema::{BlogCreatePayload, BlogPost},
};

// region: routes
pub async fn blog_routes(app_state: &AppState) -> Router {
    let user_controller = BlogController::new(app_state);

    Router::new()
        .route("/", post(create_post).get(get_all_posts))
        .route("/:slug", get(view_post))
        .route("/edit/:blog_id", patch(edit_post).delete(delete_post))
        .with_state(user_controller)
}
// endregion: routes

// region: blog handlers
// region: create post
async fn create_post(
    claims: Claims,
    State(state): State<BlogController>,
    Json(payload): Json<BlogCreatePayload>,
) -> Result<Json<BlogPost>> {
    let post = state.create_post(payload, claims).await?;
    println!("--> {:<12} : CREATE POST", "HANDLER");

    Ok(Json(post))
}
// endregion: create post

// region: get all posts
async fn get_all_posts(State(state): State<BlogController>) -> Result<Json<Vec<BlogPost>>> {
    let posts = state.get_all_posts().await?;
    println!("--> {:<12} : GET ALL POSTS", "HANDLER");

    Ok(Json(posts))
}
// endregion: get all posts

// region: view post
async fn view_post(
    State(state): State<BlogController>,
    Path(slug): Path<String>,
) -> Result<Json<BlogPost>> {
    let post = state.view_post(slug).await?;
    println!("--> {:<12} : VIEW POST", "HANDLER");

    Ok(Json(post))
}
// endregion: view post

// region: edit post
async fn edit_post(
    State(state): State<BlogController>,
    Path(blog_id): Path<Uuid>,
    claims: Claims,
    Json(payload): Json<BlogEditPayload>,
) -> Result<Json<BlogPost>> {
    let post = state.edit_post(blog_id, payload, claims).await?;
    println!("--> {:<12} : EDIT POST", "HANDLER");

    Ok(Json(post))
}
// endregion: edit post

// region: delete post
async fn delete_post(
    State(state): State<BlogController>,
    Path(blog_id): Path<Uuid>,
    claims: Claims,
) -> Result<Json<CustomMessage>> {
    let post = state.delete_post(blog_id, claims).await?;
    println!("--> {:<12} : DELETE POST", "HANDLER");

    Ok(Json(post))
}
// endregion: delete post

// endregion: like post
