use axum::{
    extract::{Path, State},
    routing::post,
    Json, Router,
};
use uuid::Uuid;

use super::{error::Result, schema::BlogEditPayload};
use crate::utils::{
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
        .route(
            "/:blog_id",
            post(view_post).patch(edit_post).delete(delete_post),
        )
        .with_state(user_controller)
}
// endregion: routes

// region: blog handlers
// region: create post
async fn create_post(
    State(state): State<BlogController>,
    claims: Claims,
    Json(payload): Json<BlogCreatePayload>,
) -> Result<Json<BlogPost>> {
    let post = state.create_post(claims, payload).await?;
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
    Path(blog_id): Path<Uuid>,
) -> Result<Json<BlogPost>> {
    let post = state.view_post(blog_id).await?;
    println!("--> {:<12} : VIEW POST", "HANDLER");

    Ok(Json(post))
}
// endregion: view post

// region: edit post
async fn edit_post(
    State(state): State<BlogController>,
    Path(blog_id): Path<Uuid>,
    Json(payload): Json<BlogEditPayload>,
) -> Result<Json<BlogPost>> {
    let post = state.edit_post(blog_id, payload).await?;
    println!("--> {:<12} : EDIT POST", "HANDLER");

    Ok(Json(post))
}
// endregion: edit post

// region: delete post
async fn delete_post(
    State(state): State<BlogController>,
    Path(blog_id): Path<Uuid>,
) -> Result<Json<CustomMessage>> {
    let post = state.delete_post(blog_id).await?;
    println!("--> {:<12} : DELETE POST", "HANDLER");

    Ok(Json(post))
}
// endregion: delete post

// region: like post
async fn like_post(
    State(state): State<BlogController>,
    Path(blog_id): Path<Uuid>,
) -> Result<Json<CustomMessage>> {
    let post = state.like_post(blog_id).await?;
    println!("--> {:<12} : LIKE POST", "HANDLER");

    Ok(Json(post))
}
// endregion: like post
