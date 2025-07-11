use time::OffsetDateTime;
use uuid::Uuid;

use super::schema::{
    BlogComment, BlogCommentCreatePayload, BlogCommentEditPayload, BlogCommentFetchPayload,
    BlogCommentResponse, BlogCreatePayload, BlogEditPayload, BlogLike, BlogPost, BlogResponse,
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
                INSERT INTO blog_post (title, content, description, category, tags, author_id, is_draft)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id, title, slug, description, content, views, category, tags, is_draft, created_at, updated_at, author_id
            "#,
        )
        .bind(payload.title)
        .bind(payload.content)
        .bind(payload.description)
        .bind(payload.category)
        .bind(payload.tags)
        .bind(claims.sub)
        .bind(payload.is_draft)
        .fetch_one(&self.app_state.get_db_conn())
        .await
        .map_err(|e| {
            let error = e.to_string();
            if error.contains("duplicate key value violates unique constraint") {
                Error::AlreadyExists("Blog Post".to_string())
            } else {
                Error::InvalidQuery(error)
            }
        })?;

        Ok(blog_post)
    }
    // endregion: create post

    // region: get all posts
    pub async fn get_all_posts(&self, claims: Option<Claims>) -> Result<Vec<BlogResponse>> {
        let blog_posts = sqlx::query_as::<_, BlogResponse>(
            r#"
                Select blog_post.id, title, slug, description, content, views, category, tags, is_draft, blog_post.updated_at, COUNT(blog_like.id) as like_count,
                EXISTS (
                    SELECT 1
                    FROM blog_like
                    WHERE blog_post_id = blog_post.id
                      AND user_id = $1
                        ) AS liked, users.username as author
                FROM blog_post 
                LEFT JOIN blog_like ON blog_post.id = blog_like.blog_post_id 
                LEFT JOIN users ON blog_post.author_id = users.id
                WHERE blog_post.is_draft = false
                GROUP BY blog_post.id, users.username
                ORDER BY blog_post.updated_at DESC
            "#,
        )
        .bind(claims.map_or(Uuid::nil(), |c| c.sub))
        .fetch_all(&self.app_state.get_db_conn())
        .await
        .map_err(|e| Error::InvalidQuery(e.to_string()))?;

        Ok(blog_posts)
    }
    // endregion: get all posts

    // region: get unpublished posts
    pub async fn unpublished_posts(&self, claims: Claims) -> Result<Vec<BlogPost>> {
        if !claims.is_admin {
            return Err(Error::Unauthorized);
        }

        let blog_posts = sqlx::query_as::<_, BlogPost>(
            r#"
                Select id, title, slug, description, content, views, category, tags, is_draft, created_at, updated_at, author_id
                FROM blog_post
                ORDER BY updated_at DESC
            "#,
        )
        .fetch_all(&self.app_state.get_db_conn())
        .await
        .map_err(|e| Error::InvalidQuery(e.to_string()))?;

        Ok(blog_posts)
    }
    // endregion: get unpublished posts

    // region: view post
    pub async fn view_post(&self, slug: String, claims: Option<Claims>) -> Result<BlogResponse> {
        let query_result = sqlx::query_as::<_, BlogResponse>(
            r#"
            SELECT blog_post.id, title, slug, description, content, views, category, tags, is_draft, blog_post.updated_at, COUNT(blog_like.id) as like_count,
            EXISTS (
                SELECT 1
                FROM blog_like
                WHERE blog_post_id = blog_post.id
                  AND user_id = $1
                    ) AS liked, users.username as author
            FROM blog_post 
            LEFT JOIN blog_like ON blog_post.id = blog_like.blog_post_id 
            LEFT JOIN users ON blog_post.author_id = users.id
            WHERE slug = $2
            GROUP BY blog_post.id, users.username
            "#,
        )
        .bind(claims.map_or(Uuid::nil(), |c| c.sub))
        .bind(&slug)
        .fetch_optional(&self.app_state.get_db_conn())
        .await
        .map_err(|e| Error::InvalidQuery(e.to_string()))?;

        if query_result.is_none() {
            Err(Error::InvalidRequest)
        } else {
            let blog_post = query_result.unwrap();
            let _ = sqlx::query(
                r#"
                    UPDATE blog_post
                    SET views = COALESCE($1, views)
                    WHERE slug = $2
                "#,
            )
            .bind(blog_post.views + 1)
            .bind(slug)
            .execute(&self.app_state.get_db_conn())
            .await
            .map_err(|e| Error::InvalidQuery(e.to_string()))?;
            Ok(blog_post)
        }
    }
    // endregion: view post

    // region: edit post
    pub async fn edit_post(
        &self,
        slug: String,
        payload: BlogEditPayload,
        claims: Claims,
    ) -> Result<CustomMessage> {
        if !claims.is_admin {
            return Err(Error::Unauthorized);
        }
        let query_result = sqlx::query(
            r#"
                UPDATE blog_post
                SET title = COALESCE($1, title),
                    description = COALESCE($2, description),
                    content = COALESCE($3, content),
                    category = COALESCE($4, category),
                    tags = COALESCE($5, tags),
                    is_draft = COALESCE($6, is_draft),
                    updated_at = $7
                WHERE slug = $8
            "#,
        )
        .bind(payload.title)
        .bind(payload.description)
        .bind(payload.content)
        .bind(payload.category)
        .bind(payload.tags)
        .bind(payload.is_draft)
        .bind(OffsetDateTime::now_utc())
        .bind(slug)
        .execute(&self.app_state.get_db_conn())
        .await
        .map_err(|e| Error::InvalidQuery(e.to_string()))?;

        if query_result.rows_affected() == 0 {
            return Err(Error::InvalidRequest);
        }

        let message = CustomMessage { message: true };
        Ok(message)
    }
    // endregion: edit post

    // region: delete post
    pub async fn delete_post(&self, slug: String, claims: Claims) -> Result<CustomMessage> {
        if !claims.is_admin {
            return Err(Error::Unauthorized);
        }
        let query_result = sqlx::query(
            r#"
                DELETE FROM blog_post
                WHERE slug = $1 AND author_id = $2
            "#,
        )
        .bind(slug)
        .bind(claims.sub)
        .execute(&self.app_state.get_db_conn())
        .await
        .map_err(|e| Error::InvalidQuery(e.to_string()))?;

        if query_result.rows_affected() == 0 {
            return Err(Error::InvalidRequest);
        }

        let message = CustomMessage { message: true };
        Ok(message)
    }
    // endregion: delete post

    // region: create comment
    pub async fn create_comment(
        &self,
        claims: Claims,
        slug: String,
        payload: BlogCommentCreatePayload,
    ) -> Result<CustomMessage> {
        if payload.content.is_empty() {
            return Err(Error::InvalidRequest);
        }

        let _blog_comment = sqlx::query(
            r#"
                WITH post_data AS (
                    SELECT id
                    FROM blog_post
                    WHERE slug = $1
                )
                INSERT INTO blog_comment (content, blog_post_id, user_id, is_reply, parent_id)
                SELECT $2, post_data.id, $3, $4, $5
                FROM post_data
            "#,
        )
        .bind(slug)
        .bind(payload.content)
        .bind(claims.sub)
        .bind(payload.is_reply)
        .bind(payload.parent_id)
        .execute(&self.app_state.get_db_conn())
        .await
        .map_err(|e| Error::InvalidQuery(e.to_string()))?;

        let message = CustomMessage { message: true };
        Ok(message)
    }
    // endregion: create comment

    // region: get comments
    pub async fn get_comments(&self, slug: String) -> Result<Vec<BlogCommentResponse>> {
        let mut all_comments: Vec<BlogCommentResponse> = vec![];
        let main_comments = sqlx::query_as::<_, BlogCommentFetchPayload>(
            r#"
                SELECT blog_comment.id, blog_comment.content, blog_comment.created_at, blog_comment.blog_post_id, blog_comment.user_id, blog_comment.is_reply, blog_comment.parent_id, (users.username) as author
                FROM blog_comment
                JOIN blog_post ON blog_comment.blog_post_id = blog_post.id
                JOIN users ON blog_comment.user_id = users.id
                WHERE blog_post.slug = $1 and is_reply = false and parent_id is null
            "#,
        )
        .bind(&slug)
        .fetch_all(&self.app_state.get_db_conn())
        .await
        .map_err(|e| Error::InvalidQuery(e.to_string()))?;

        let replies = sqlx::query_as::<_, BlogCommentFetchPayload>(
            r#"
                SELECT blog_comment.id, blog_comment.content, blog_comment.created_at, blog_comment.blog_post_id, blog_comment.user_id, blog_comment.is_reply, blog_comment.parent_id,  (users.username) as author
                FROM blog_comment
                JOIN blog_post ON blog_comment.blog_post_id = blog_post.id
                JOIN users ON blog_comment.user_id = users.id
                WHERE blog_post.slug = $1 and is_reply = true
            "#,
        )
        .bind(slug)
        .fetch_all(&self.app_state.get_db_conn())
        .await
        .map_err(|e| Error::InvalidQuery(e.to_string()))?;

        for this_comment in main_comments {
            let comment = BlogCommentResponse {
                id: this_comment.id,
                content: this_comment.content,
                created_at: this_comment.created_at,
                user_id: this_comment.user_id,
                parent_id: this_comment.parent_id,
                author: this_comment.author,
                replies: Some(
                    replies
                        .iter()
                        .filter(|reply| reply.parent_id == Some(this_comment.id))
                        .cloned()
                        .collect(),
                ),
            };
            all_comments.push(comment);
        }
        Ok(all_comments)
    }
    // endregion: get comments

    // region: edit comment
    pub async fn edit_comment(
        &self,
        claims: Claims,
        payload: BlogCommentEditPayload,
    ) -> Result<BlogComment> {
        let query_result = sqlx::query_as::<_, BlogComment>(
            r#"
                UPDATE blog_comment
                SET content = COALESCE($2, content)
                WHERE id = $1 and user_id = $3
                RETURNING id, content, created_at, blog_post_id, user_id, is_reply, parent_id
            "#,
        )
        .bind(payload.comment_id)
        .bind(payload.content)
        .bind(claims.sub)
        .fetch_one(&self.app_state.get_db_conn())
        .await
        .map_err(|e| Error::InvalidQuery(e.to_string()))?;

        Ok(query_result)
    }
    // endregion: edit comment

    // region: delete comment
    pub async fn delete_comment(&self, claims: Claims, comment_id: Uuid) -> Result<CustomMessage> {
        let query_result = sqlx::query(
            r#"
                DELETE FROM blog_comment
                WHERE id = $1 and user_id = $2
            "#,
        )
        .bind(comment_id)
        .bind(claims.sub)
        .execute(&self.app_state.get_db_conn())
        .await
        .map_err(|e| Error::InvalidQuery(e.to_string()))?;

        if query_result.rows_affected() == 0 {
            return Err(Error::InvalidRequest);
        }

        let message = CustomMessage { message: true };
        Ok(message)
    }
    // endregion: delete comment

    // region: like post
    pub async fn like_post(&self, claims: Claims, slug: String) -> Result<CustomMessage> {
        let like_result = sqlx::query_as::<_, BlogLike>(
            r#"
                WITH post_data AS (
                    SELECT id
                    FROM blog_post
                    WHERE slug = $1
                  )
                  INSERT INTO blog_like (blog_post_id, user_id)
                  SELECT post_data.id, $2
                  FROM post_data
                  RETURNING id, blog_post_id, user_id
            "#,
        )
        .bind(&slug)
        .bind(claims.sub)
        .fetch_one(&self.app_state.get_db_conn())
        .await;

        match like_result {
            Ok(_) => {
                let message = CustomMessage { message: true };
                Ok(message)
            }
            Err(e) => {
                if e.to_string()
                    .contains("duplicate key value violates unique constraint")
                {
                    sqlx::query(
                        r#"
                            WITH post_data AS (
                                SELECT id
                                FROM blog_post
                                WHERE slug = $1
                            )
                            DELETE FROM blog_like
                            WHERE blog_post_id = (SELECT id FROM post_data) AND user_id = $2
                        "#,
                    )
                    .bind(slug)
                    .bind(claims.sub)
                    .execute(&self.app_state.get_db_conn())
                    .await
                    .map_err(|e| Error::InvalidQuery(e.to_string()))?;

                    let message = CustomMessage { message: false };
                    return Ok(message);
                }
                Err(Error::InvalidQuery(e.to_string()))
            }
        }
    }
    // endregion: like post

    // region: search posts
    pub async fn _search_posts(&self, _query: String) -> Result<Vec<BlogPost>> {
        // let query_result = sqlx::query_as::<_, BlogPost>(
        //     r#"
        //         SELECT id, title, slug, content, created_at, user_id
        //         FROM blog_post
        //         WHERE title ILIKE $1
        //     "#,
        // )
        // .bind(format!("%{}%", query))
        // .fetch_all(&self.app_state.get_db_conn())
        // .await
        // .map_err(|e| Error::InvalidQuery(e.to_string()))?;

        // Ok(query_result);
        todo!("search posts");
    }
    // endregion: search posts
}
