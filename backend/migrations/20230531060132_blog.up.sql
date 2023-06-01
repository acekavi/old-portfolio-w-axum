-- Add up migration script here
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the BlogPost table
CREATE TABLE IF NOT EXISTS blog_post (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    author_id UUID NOT NULL REFERENCES "user" (id) ON DELETE CASCADE
);

CREATE INDEX idx_blog_posts_author_id ON blog_post(author_id);
CREATE INDEX idx_blog_posts_created_at ON blog_post(created_at);

-- Create the Comment table
CREATE TABLE IF NOT EXISTS blog_comment (
    id UUID PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    blog_post_id UUID NOT NULL REFERENCES blog_post (id),
    user_id UUID NOT NULL REFERENCES "user" (id),
    is_reply BOOLEAN DEFAULT FALSE NOT NULL,
    parent_comment_id UUID REFERENCES blog_comment (id) ON DELETE CASCADE
);

CREATE INDEX idx_blog_comment_blog_post_id ON blog_comment(blog_post_id);
CREATE INDEX idx_blog_comment_user_id ON blog_comment(user_id);
CREATE INDEX idx_blog_comment_parent_comment_id ON blog_comment (parent_comment_id);

-- Create the Like table
CREATE TABLE IF NOT EXISTS blog_like (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    blog_post_id UUID NOT NULL REFERENCES blog_post (id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES "user" (id) ON DELETE CASCADE
);

CREATE INDEX idx_blog_like_blog_post_id ON blog_like(blog_post_id);
CREATE INDEX idx_blog_like_user_id ON blog_like(user_id);
