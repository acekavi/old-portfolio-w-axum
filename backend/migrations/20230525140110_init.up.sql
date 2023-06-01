-- Add up migration script here
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the User table
CREATE TABLE IF NOT EXISTS "User" (
    id UUID PRIMARY KEY DEFAULT (uuid_generate_v4()),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    first_name VARCHAR,
    last_name VARCHAR,
    is_active BOOLEAN DEFAULT FALSE NOT NULL,
    is_superuser BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for the User table
CREATE INDEX IF NOT EXISTS idx_user_username ON "User" (username);
CREATE INDEX IF NOT EXISTS idx_user_email ON "User" (email);
