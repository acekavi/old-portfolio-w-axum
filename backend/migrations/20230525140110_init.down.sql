-- Add down migration script here
DROP TABLE IF EXISTS users;

-- Add index on username column
DROP INDEX IF EXISTS idx_user_username;

-- Add index on email column
DROP INDEX IF EXISTS idx_user_email;