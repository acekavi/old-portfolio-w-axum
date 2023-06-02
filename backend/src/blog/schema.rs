use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use time::OffsetDateTime;
use uuid::Uuid;

// region: blog post model
// BlogPost struct representing the BlogPost table
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct BlogPost {
    pub id: Uuid,
    pub title: String,
    pub slug: String,
    pub content: String,
    pub is_draft: bool,
    pub created_at: OffsetDateTime,
    pub updated_at: OffsetDateTime,
    pub author_id: Uuid,
}

// Comment struct representing the Comment table
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct BlogComment {
    pub id: Uuid,
    pub content: String,
    pub created_at: OffsetDateTime,
    pub blog_post_id: Uuid,
    pub user_id: Uuid,
    #[serde(skip_serializing)]
    pub is_reply: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub parent_comment_id: Option<Uuid>,
}

// Like struct representing the Like table
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct BlogLike {
    pub id: Uuid,
    pub blog_post_id: Uuid,
    pub user_id: Uuid,
}
// endregion: blog post model

// region: blog post create payload
#[derive(Deserialize)]
pub struct BlogCreatePayload {
    pub title: String,
    pub content: String,
}
// endregion: blog post create payload

// region: blog post edit payload
#[derive(Deserialize)]
pub struct BlogEditPayload {
    pub title: Option<String>,
    pub content: Option<String>,
    pub is_draft: Option<bool>,
}
// endregion: blog post edit payload

// region: blog comment create payload
#[derive(Deserialize)]
pub struct BlogCommentCreatePayload {
    pub content: String,
    pub is_reply: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub parent_comment_id: Option<Uuid>,
}
// endregion: blog comment create payload

// region: blog comment edit payload
#[derive(Deserialize)]
pub struct BlogCommentEditPayload {
    pub content: Option<String>,
}
// endregion: blog comment edit payload

// region: blog like create payload
#[derive(Deserialize)]
pub struct BlogLikeCreatePayload {
    pub blog_post_id: Uuid,
    pub user_id: Uuid,
}
// endregion: blog like create payload

// region: blog comment response
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct BlogCommentResponse {
    pub id: Uuid,
    pub content: String,
    pub created_at: OffsetDateTime,
    pub blog_post_id: Uuid,
    pub user_id: Uuid,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub parent_comment_id: Option<Uuid>,
    pub replies: Option<Vec<BlogComment>>,
}
// endregion: blog comment response
