use uuid::Uuid;

use super::error::Result;
use super::schema::{
    BlogComment, BlogCommentCreatePayload, BlogCommentEditPayload, BlogCreatePayload,
    BlogEditPayload, BlogPost,
};
use crate::utils::schema::CustomMessage;
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
    pub async fn create_post(&self, _payload: BlogCreatePayload) -> Result<BlogPost> {
        todo!("create post")
    }
    // endregion: create post

    // region: get all posts
    pub async fn get_all_posts(&self) -> Result<Vec<BlogPost>> {
        todo!("get all posts")
    }
    // endregion: get all posts

    // region: view post
    pub async fn view_post(&self, _blog_id: Uuid) -> Result<BlogPost> {
        todo!("view post")
    }
    // endregion: view post

    // region: edit post
    pub async fn edit_post(&self, _blog_id: Uuid, _payload: BlogEditPayload) -> Result<BlogPost> {
        todo!("edit post")
    }
    // endregion: edit post

    // region: delete post
    pub async fn delete_post(&self, _blog_id: Uuid) -> Result<CustomMessage> {
        todo!("delete post")
    }
    // endregion: delete post

    // region: get comments
    pub async fn get_comments(&self, _blog_id: Uuid) -> Result<Vec<BlogComment>> {
        todo!("get comments")
    }
    // endregion: get comments

    // region: create comment
    pub async fn create_comment(&self, _payload: BlogCommentCreatePayload) -> Result<BlogComment> {
        todo!("create comment")
    }
    // endregion: create comment

    // region: edit comment
    pub async fn edit_comment(
        &self,
        _blog_id: Uuid,
        _payload: BlogCommentEditPayload,
    ) -> Result<BlogComment> {
        todo!("edit comment")
    }
    // endregion: edit comment

    // region: delete comment
    pub async fn delete_comment(&self, _blog_id: Uuid) -> Result<CustomMessage> {
        todo!("delete comment")
    }
    // endregion: delete comment

    // region: create reply comment
    pub async fn create_reply_comment(
        &self,
        _payload: BlogCommentCreatePayload,
    ) -> Result<BlogComment> {
        todo!("create reply comment")
    }
    // endregion: create reply comment

    // region: edit reply comment
    pub async fn edit_reply_comment(
        &self,
        _blog_id: Uuid,
        _payload: BlogCommentEditPayload,
    ) -> Result<BlogComment> {
        todo!("edit reply comment")
    }
    // endregion: edit reply comment

    // region: delete reply comment
    pub async fn delete_reply_comment(&self, _blog_id: Uuid) -> Result<CustomMessage> {
        todo!("delete reply comment")
    }
    // endregion: delete reply comment

    // region: like post
    pub async fn like_post(&self, _blog_id: Uuid) -> Result<CustomMessage> {
        todo!("like post")
    }
    // endregion: like post

    // region: unlike post
    pub async fn unlike_post(&self, _blog_id: Uuid) -> Result<CustomMessage> {
        todo!("unlike post")
    }
    // endregion: unlike post
}
