use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use time::{serde::timestamp, OffsetDateTime};
use uuid::Uuid;

// region: blog post model
// BlogPost struct representing the BlogPost table
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct BlogPost {
    pub id: Uuid,
    pub title: String,
    pub slug: String,
    pub description: String,
    pub content: String,
    pub views: i32,
    pub category: String,
    pub tags: Vec<String>,
    pub is_draft: bool,
    #[serde(with = "timestamp")]
    pub created_at: OffsetDateTime,
    #[serde(with = "timestamp")]
    pub updated_at: OffsetDateTime,
    pub author_id: Uuid,
}

// Comment struct representing the Comment table
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct BlogComment {
    pub id: Uuid,
    pub content: String,
    #[serde(with = "timestamp")]
    pub created_at: OffsetDateTime,
    pub blog_post_id: Uuid,
    pub user_id: Uuid,
    #[serde(skip_serializing)]
    pub is_reply: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub parent_id: Option<Uuid>,
}

// Like struct representing the Like table
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct BlogLike {
    pub id: Uuid,
    pub blog_post_id: Uuid,
    pub user_id: Uuid,
}
// endregion: blog post model

// region: blog post response
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct BlogResponse {
    pub id: Uuid,
    pub title: String,
    pub slug: String,
    pub description: String,
    pub content: String,
    pub views: i32,
    pub category: String,
    pub tags: Vec<String>,
    pub is_draft: bool,
    #[serde(with = "timestamp")]
    pub updated_at: OffsetDateTime,
    pub like_count: i64,
    pub liked: Option<bool>,
    pub author: String,
}
// endregion: blog post response

// region: blog post create payload
#[derive(Deserialize)]
pub struct BlogCreatePayload {
    pub title: String,
    pub description: String,
    pub content: String,
    pub category: String,
    pub tags: Vec<String>,
    pub is_draft: bool,
}
// endregion: blog post create payload

// region: blog post edit payload
#[derive(Deserialize)]
pub struct BlogEditPayload {
    pub title: Option<String>,
    pub content: Option<String>,
    pub description: Option<String>,
    pub category: Option<String>,
    pub tags: Option<Vec<String>>,
    pub is_draft: Option<bool>,
}
// endregion: blog post edit payload

// region: blog comment create payload
#[derive(Deserialize)]
pub struct BlogCommentCreatePayload {
    pub content: String,
    pub is_reply: bool,
    pub parent_id: Option<Uuid>,
}
// endregion: blog comment create payload

// region: blog comment edit payload
#[derive(Deserialize)]
pub struct BlogCommentEditPayload {
    pub comment_id: Uuid,
    pub content: Option<String>,
}
// endregion: blog comment edit payload

// region: blog comment delete payload
#[derive(Deserialize)]
pub struct BlogCommentDeletePayload {
    pub comment_id: Uuid,
}
// endregion: blog comment delete payload

// region: blog comment response
#[derive(Debug, Serialize, Deserialize)]
pub struct BlogCommentResponse {
    pub id: Uuid,
    pub content: String,
    #[serde(with = "timestamp")]
    pub created_at: OffsetDateTime,
    pub user_id: Uuid,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub parent_id: Option<Uuid>,
    pub author: String,
    pub replies: Option<Vec<BlogCommentFetchPayload>>,
}
// endregion: blog comment response

// region: blog comment fetch
#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct BlogCommentFetchPayload {
    pub id: Uuid,
    pub content: String,
    #[serde(with = "timestamp")]
    pub created_at: OffsetDateTime,
    pub blog_post_id: Uuid,
    pub user_id: Uuid,
    #[serde(skip_serializing)]
    pub is_reply: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub parent_id: Option<Uuid>,
    pub author: String,
}
// endregion: blog comment fetch
