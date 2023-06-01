-- Add down migration script here
-- Drop the Like table
DROP TABLE IF EXISTS blog_like;

-- Drop the Comment table
DROP TABLE IF EXISTS blog_comment;

-- Drop the BlogPost table
DROP TABLE IF EXISTS blog_post;

DROP INDEX IF EXISTS idx_blog_posts_author_id;
DROP INDEX IF EXISTS idx_blog_posts_created_at;
DROP INDEX IF EXISTS idx_blog_comment_blog_post_id;
DROP INDEX IF EXISTS idx_blog_comment_user_id;
DROP INDEX IF EXISTS idx_blog_comment_parent_comment_id;
DROP INDEX IF EXISTS idx_blog_like_blog_post_id;
DROP INDEX IF EXISTS idx_blog_like_user_id;