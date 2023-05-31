use uuid::Uuid;

use super::error::{BlogError, Result};
use super::schema::{
    BlogComment, BlogCommentCreatePayload, BlogCommentEditPayload, BlogCreatePayload,
    BlogEditPayload, BlogPost,
};
use crate::user::schema::User;
use crate::utils::schema::{Claims, CustomMessage};
use crate::utils::states::AppState;

// region: User Model Controller
#[derive(Clone)]
pub struct BlogController {
    app_state: AppState,
}

impl BlogController {
    pub fn new(app_state: &AppState) -> Self {
        BlogController {
            app_state: app_state.clone(),
        }
    }
}
// endregion: User Model Controller

// region: User Model Controller Implementation
impl BlogController {
    // region: create post
    pub async fn create_post(
        &self,
        claims: Claims,
        payload: BlogCreatePayload,
    ) -> Result<BlogPost> {
        if claims.is_superuser && claims.is_active {
            let blog_post = sqlx::query_as::<_, BlogPost<User>>(
                r#"
                INSERT INTO blog_posts (title, content, author_id)
                VALUES ($1, $2, $3)
                RETURNING blog_posts.id, blog_posts.title, blog_posts.content, blog_posts.created_at, blog_posts.updated_at, 
                    (users.id, users.username, users.email, users.is_active, users.is_superuser, users.created_at, users.updated_at) AS author_id
                FROM blog_posts
                INNER JOIN users ON users.id = blog_posts.author_id
                "#,
            )
            .bind(payload.title)
            .bind(payload.content)
            .bind(payload.author_id)
            .fetch_one(&self.app_state.get_db_conn())
            .await
            .map_err(|e| BlogError::InvalidQuery(e))?;

            Ok(user)
        } else {
            return Err(BlogError::Unauthorized);
        }
    }
    // endregion: create post

    // region: get all posts
    pub async fn get_all_posts(&self) -> Result<Vec<BlogPost>> {
        todo!("get all posts")
    }
    // endregion: get all posts

    // region: view post
    pub async fn view_post(&self, blog_id: Uuid) -> Result<BlogPost> {
        todo!("view post")
    }
    // endregion: view post

    // region: edit post
    pub async fn edit_post(&self, blog_id: Uuid, payload: BlogEditPayload) -> Result<BlogPost> {
        todo!("edit post")
    }
    // endregion: edit post

    // region: delete post
    pub async fn delete_post(&self, blog_id: Uuid) -> Result<CustomMessage> {
        todo!("delete post")
    }
    // endregion: delete post

    // region: get comments
    pub async fn get_comments(&self, blog_id: Uuid) -> Result<Vec<BlogComment>> {
        todo!("get comments")
    }
    // endregion: get comments

    // region: create comment
    pub async fn create_comment(&self, payload: BlogCommentCreatePayload) -> Result<BlogComment> {
        todo!("create comment")
    }
    // endregion: create comment

    // region: edit comment
    pub async fn edit_comment(
        &self,
        blog_id: Uuid,
        payload: BlogCommentEditPayload,
    ) -> Result<BlogComment> {
        todo!("edit comment")
    }
    // endregion: edit comment

    // region: delete comment
    pub async fn delete_comment(&self, blog_id: Uuid) -> Result<CustomMessage> {
        todo!("delete comment")
    }
    // endregion: delete comment

    // region: create reply comment
    pub async fn create_reply_comment(
        &self,
        payload: BlogCommentCreatePayload,
    ) -> Result<BlogComment> {
        todo!("create reply comment")
    }
    // endregion: create reply comment

    // region: edit reply comment
    pub async fn edit_reply_comment(
        &self,
        blog_id: Uuid,
        payload: BlogCommentEditPayload,
    ) -> Result<BlogComment> {
        todo!("edit reply comment")
    }
    // endregion: edit reply comment

    // region: delete reply comment
    pub async fn delete_reply_comment(&self, blog_id: Uuid) -> Result<CustomMessage> {
        todo!("delete reply comment")
    }
    // endregion: delete reply comment

    // region: like post
    pub async fn like_post(&self, blog_id: Uuid) -> Result<CustomMessage> {
        todo!("like post")
    }
    // endregion: like post

    // region: unlike post
    pub async fn unlike_post(&self, blog_id: Uuid) -> Result<CustomMessage> {
        todo!("unlike post")
    }
    // endregion: unlike post
}
