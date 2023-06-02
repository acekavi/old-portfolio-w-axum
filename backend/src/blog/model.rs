use time::OffsetDateTime;
use uuid::Uuid;

use super::schema::{
    BlogCreatePayload,
    BlogEditPayload, BlogPost,
};
use crate::utils::{
    error::{Error, Result},
    schema::{Claims, CustomMessage},
    states::AppState,
};

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
        payload: BlogCreatePayload,
        claims: Claims,
    ) -> Result<BlogPost> {
        if !claims.is_admin {
            return Err(Error::Unauthorized);
        }
        if payload.title.is_empty() || payload.content.is_empty() {
            return Err(Error::InvalidRequest);
        }

        let blog_post = sqlx::query_as::<_, BlogPost>(
            r#"
                INSERT INTO blog_post (title, content, author_id)
                VALUES ($1, $2, $3)
                RETURNING id, title, slug, content, is_draft, created_at, updated_at, author_id
            "#,
        )
        .bind(payload.title)
        .bind(payload.content)
        .bind(claims.sub)
        .fetch_one(&self.app_state.get_db_conn())
        .await
        .map_err(|e| Error::InvalidQuery(e.to_string()))?;

        Ok(blog_post)
    }
    // endregion: create post

    // region: get all posts
    pub async fn get_all_posts(&self) -> Result<Vec<BlogPost>> {
        let blog_posts = sqlx::query_as::<_, BlogPost>(
            r#"
                Select id, title, slug, content, is_draft, created_at, updated_at, author_id
                FROM blog_post
                WHERE is_draft = false
            "#,
        )
        .fetch_all(&self.app_state.get_db_conn())
        .await
        .map_err(|e| Error::InvalidQuery(e.to_string()))?;

        Ok(blog_posts)
    }
    // endregion: get all posts

    // region: view post
    pub async fn view_post(&self, slug: String) -> Result<BlogPost> {
        let query_result = sqlx::query_as::<_, BlogPost>(
            r#"
                Select id, title, slug, content, is_draft, created_at, updated_at, author_id
                FROM blog_post
                WHERE slug = $1;
            "#,
        )
        .bind(slug)
        .fetch_optional(&self.app_state.get_db_conn())
        .await
        .map_err(|e| Error::InvalidQuery(e.to_string()))?;

        if query_result.is_none() {
            Err(Error::InvalidRequest)
        } else {
            let blog_post = query_result.unwrap();
            Ok(blog_post)
        }
    }
    // endregion: view post

    // region: edit post
    pub async fn edit_post(
        &self,
        blog_id: Uuid,
        payload: BlogEditPayload,
        claims: Claims,
    ) -> Result<BlogPost> {
        if !claims.is_admin {
            return Err(Error::Unauthorized);
        }
        let query_result = sqlx::query_as::<_, BlogPost>(
            r#"
                UPDATE blog_post
                SET title = COALESCE($1, title),
                    content = COALESCE($2, content),
                    is_draft = COALESCE($3, is_draft),
                    updated_at = $4
                WHERE id = $5
                RETURNING id, title, slug, content, is_draft, created_at, updated_at, author_id
            "#,
        )
        .bind(payload.title)
        .bind(payload.content)
        .bind(payload.is_draft)
        .bind(OffsetDateTime::now_utc())
        .bind(blog_id)
        .fetch_one(&self.app_state.get_db_conn())
        .await
        .map_err(|e| Error::InvalidQuery(e.to_string()))?;

        Ok(query_result)
    }
    // endregion: edit post

    // region: delete post
    pub async fn delete_post(&self, blog_id: Uuid, claims: Claims) -> Result<CustomMessage> {
        if !claims.is_admin {
            return Err(Error::Unauthorized);
        }
        let query_result = sqlx::query(
            r#"
                DELETE FROM blog_post
                WHERE id = $1
            "#,
        )
        .bind(blog_id)
        .execute(&self.app_state.get_db_conn())
        .await;
        match query_result {
            Ok(_) => {
                let message = CustomMessage {
                    message: "Blog post has been deleted successfully".to_string(),
                };
                Ok(message)
            }
            Err(e) => Err(Error::InvalidQuery(e.to_string())),
        }
    }
    // endregion: delete post

    // region: todo! get comments

    // endregion: get comments

    // region: todo! create comment

    // endregion: create comment

    // region: todo! edit comment

    // endregion: edit comment

    // region: todo! delete comment

    // endregion: delete comment

    // region: todo! create reply comment

    // endregion: create reply comment

    // region: todo! edit reply comment

    // endregion: edit reply comment

    // region: todo! delete reply comment

    // endregion: delete reply comment

    // region: todo! like post

    // endregion: like post

    // region: todo! unlike post

    // endregion: unlike post
}
