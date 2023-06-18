-- Add up migration script here
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the BlogPost table
CREATE TABLE IF NOT EXISTS blog_post (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(520) NOT NULL,
    content TEXT NOT NULL,
    views INT NOT NULL DEFAULT 0,
    category VARCHAR(255) NOT NULL,
    tags VARCHAR(255)[] NOT NULL,
    is_draft BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    author_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX idx_blog_posts_slug ON blog_post(slug);
CREATE INDEX idx_blog_posts_author_id ON blog_post(author_id);
CREATE INDEX idx_blog_posts_created_at ON blog_post(created_at);

-- Create a trigger function to update the slug on INSERT and UPDATE
CREATE OR REPLACE FUNCTION update_slug()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.slug := lower(regexp_replace(NEW.title, '[^a-zA-Z0-9]+', '-', 'g'));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to execute the update_slug function on INSERT and UPDATE
CREATE TRIGGER update_slug_trigger
    BEFORE INSERT OR UPDATE ON blog_post
    FOR EACH ROW
    EXECUTE FUNCTION update_slug();
    
-- Create the Comment table
CREATE TABLE IF NOT EXISTS blog_comment (
    id UUID PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    blog_post_id UUID NOT NULL REFERENCES blog_post (id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    is_reply BOOLEAN DEFAULT FALSE NOT NULL,
    parent_id UUID REFERENCES blog_comment (id) ON DELETE CASCADE,
    CONSTRAINT if_reply_make_parent_id_not_null 
        CHECK (NOT (is_reply AND parent_id IS NULL)) 
);

CREATE INDEX idx_blog_comment_blog_post_id ON blog_comment(blog_post_id);
CREATE INDEX idx_blog_comment_user_id ON blog_comment(user_id);

-- Create the Like table
CREATE TABLE IF NOT EXISTS blog_like (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    blog_post_id UUID NOT NULL REFERENCES blog_post (id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT like_and_dislike UNIQUE (blog_post_id, user_id)
);

CREATE INDEX idx_blog_like_blog_post_id ON blog_like(blog_post_id);
CREATE INDEX idx_blog_like_user_id ON blog_like(user_id);