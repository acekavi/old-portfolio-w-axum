-- Add up migration script here
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the BlogPost table
CREATE TABLE IF NOT EXISTS blog_post (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOT NULL CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOT NULL CURRENT_TIMESTAMP,
    author_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX idx_blog_posts_author_id ON blog_post(author_id);
CREATE INDEX idx_blog_posts_created_at ON blog_post(created_at);

-- Create the Comment table
CREATE TABLE IF NOT EXISTS blog_comment (
    id UUID PRIMARY KEY NOT NULL DEFAULT (uuid_generate_v4()),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOT NULL CURRENT_TIMESTAMP,
    blog_post_id UUID NOT NULL REFERENCES blog_posts (id),
    user_id UUID NOT NULL REFERENCES users (id),
    parent_comment_id UUID REFERENCES blog_comment (id) ON DELETE CASCADE
);

CREATE INDEX idx_blog_comment_blog_post_id ON blog_comment(blog_post_id);
CREATE INDEX idx_blog_comment_user_id ON blog_comment(user_id);
CREATE INDEX idx_blog_comment_parent_comment_id ON comments (parent_comment_id);

-- Create the Like table
CREATE TABLE IF NOT EXISTS blog_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    blog_post_id UUID NOT NULL REFERENCES blog_post (id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX idx_blog_like_blog_post_id ON blog_likes(blog_post_id);
CREATE INDEX idx_blog_like_user_id ON blog_likes(user_id);

-- //////////////////////////////////////////////////////////////////////


-- Create the BlogPost table
CREATE TABLE IF NOT EXISTS "BlogPost" (
    id UUID PRIMARY KEY DEFAULT (uuid_generate_v4()),
    title VARCHAR NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    author_id UUID REFERENCES "User" (id)
);

-- Create index for the BlogPost table
CREATE INDEX IF NOT EXISTS idx_blogpost_author_id ON "BlogPost" (author_id);

-- Create the Comment table
CREATE TABLE IF NOT EXISTS "Comment" (
    id UUID PRIMARY KEY DEFAULT (uuid_generate_v4()),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    blog_post_id UUID REFERENCES "BlogPost" (id),
    user_id UUID REFERENCES "User" (id),
    parent_comment_id UUID,
    replies JSONB
);

-- Create indexes for the Comment table
CREATE INDEX IF NOT EXISTS idx_comment_blog_post_id ON "Comment" (blog_post_id);
CREATE INDEX IF NOT EXISTS idx_comment_user_id ON "Comment" (user_id);
CREATE INDEX IF NOT EXISTS idx_comment_parent_comment_id ON "Comment" (parent_comment_id);

-- Create the Like table
CREATE TABLE IF NOT EXISTS "Like" (
    id UUID PRIMARY KEY DEFAULT (uuid_generate_v4()),
    blog_post_id UUID REFERENCES "BlogPost" (id),
    user_id UUID REFERENCES "User" (id)
);

-- Create indexes for the Like table
CREATE INDEX IF NOT EXISTS idx_like_blog_post_id ON "Like" (blog_post_id);
CREATE INDEX IF NOT EXISTS idx_like_user_id ON "Like" (user_id);
