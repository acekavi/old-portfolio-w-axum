use axum::{
    extract::{Path, State},
    routing::{get, post},
    Json, Router,
};

use super::schema::{
    BlogComment, BlogCommentCreatePayload, BlogCommentDeletePayload, BlogCommentEditPayload,
    BlogCommentResponse, BlogEditPayload, BlogResponse,
};
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
        .route(
            "/:slug",
            get(view_post).patch(edit_post).delete(delete_post),
        )
        .route(
            "/:slug/comment",
            post(create_comment)
                .get(get_comments)
                .patch(edit_comment)
                .delete(delete_comment),
        )
        .route("/:slug/like", get(like_post))
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
async fn get_all_posts(
    State(state): State<BlogController>,
    claims: Option<Claims>,
) -> Result<Json<Vec<BlogResponse>>> {
    let posts = state.get_all_posts(claims).await?;
    println!("--> {:<12} : GET ALL POSTS", "HANDLER");

    Ok(Json(posts))
}
// endregion: get all posts

// region: view post
async fn view_post(
    State(state): State<BlogController>,
    Path(slug): Path<String>,
    claims: Option<Claims>,
) -> Result<Json<BlogResponse>> {
    let post = state.view_post(slug, claims).await?;
    println!("--> {:<12} : VIEW POST", "HANDLER");

    Ok(Json(post))
}
// endregion: view post

// region: edit post
async fn edit_post(
    State(state): State<BlogController>,
    Path(slug): Path<String>,
    claims: Claims,
    Json(payload): Json<BlogEditPayload>,
) -> Result<Json<BlogPost>> {
    let post = state.edit_post(slug, payload, claims).await?;
    println!("--> {:<12} : EDIT POST", "HANDLER");

    Ok(Json(post))
}
// endregion: edit post

// region: delete post
async fn delete_post(
    State(state): State<BlogController>,
    Path(slug): Path<String>,
    claims: Claims,
) -> Result<Json<CustomMessage>> {
    let post = state.delete_post(slug, claims).await?;
    println!("--> {:<12} : DELETE POST", "HANDLER");

    Ok(Json(post))
}
// endregion: delete post

// region: create comment
async fn create_comment(
    State(state): State<BlogController>,
    claims: Claims,
    Path(slug): Path<String>,
    Json(payload): Json<BlogCommentCreatePayload>,
) -> Result<Json<BlogComment>> {
    let post = state.create_comment(claims, slug, payload).await?;
    println!("--> {:<12} : CREATE COMMENT", "HANDLER");

    Ok(Json(post))
}
// endregion: create comment

// region: get comments
async fn get_comments(
    State(state): State<BlogController>,
    Path(slug): Path<String>,
) -> Result<Json<Vec<BlogCommentResponse>>> {
    let post = state.get_comments(slug).await?;
    println!("--> {:<12} : GET COMMENTS", "HANDLER");

    Ok(Json(post))
}
// endregion: get comments

// region: edit comment
async fn edit_comment(
    State(state): State<BlogController>,
    claims: Claims,
    Json(payload): Json<BlogCommentEditPayload>,
) -> Result<Json<BlogComment>> {
    let post = state.edit_comment(claims, payload).await?;
    println!("--> {:<12} : EDIT COMMENT", "HANDLER");

    Ok(Json(post))
}
// endregion: edit comment

// region: delete comment
async fn delete_comment(
    State(state): State<BlogController>,
    claims: Claims,
    Json(payload): Json<BlogCommentDeletePayload>,
) -> Result<Json<CustomMessage>> {
    let post = state.delete_comment(claims, payload.comment_id).await?;
    println!("--> {:<12} : DELETE COMMENT", "HANDLER");

    Ok(Json(post))
}
// endregion: delete comment

// region: like post
async fn like_post(
    State(state): State<BlogController>,
    claims: Claims,
    Path(slug): Path<String>,
) -> Result<Json<CustomMessage>> {
    let post = state.like_post(claims, slug).await?;
    println!("--> {:<12} : LIKE POST", "HANDLER");

    // Ok(Json(post))
    Ok(Json(post))
}
// endregion: like post

// endregion: blog handlers
