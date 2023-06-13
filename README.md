
# acekavi.me

My Personal Portfolio Website

[![Rust](https://github.com/acekavi/acekavi.me/actions/workflows/rust.yml/badge.svg)](https://github.com/acekavi/acekavi.me/actions/workflows/rust.yml)

## Tech Stack

**Client:** React, TailwindCSS, GSAP

**Server:** Axum, Tokio, httpc-test, postgresql, AWS

## Roadmap

-   Todo

    -   [x]     Hook login credential checker to a database and hash the passwords
    -   [x]     Generate JWT token dynamically
    -   [x]     CRUD Error handling
    -   [x]     Auth Token component validation (e.g., expires, sign)
    -   [ ]     Contact me email
    -   [ ]     Hook static file storage to AWS s3
    -   [ ]     Verify user using email
    -   [ ]     Send password reset link to email

### Backend

- API Endpoints for
    -   [x]     Login
    -   [x]     Blog CRUD
    -   [ ]     FileUploads

- AWS setup
    -   [ ]     Setting up IAM
    -   [ ]     Setting up S3 buckets
    -   [ ]     Setting up Cloudfront
    -   [ ]     Setting up postgres in RDS

- Server configuration
    -   [ ]     NGINX Configuration
    -   [ ]     Subdomain forwarding
    -   [ ]     Domain setup using namecheap

### Frontend

- Homepage
    -   [x]     Hero Section
    -   [x]     About me
    -   [x]     Experience
    -   [x]     Projects
    -   [x]     Designs
    -   [x]     Contact me
    -   [x]     Contact me form

- Blog
    -   [x]     Login form
    -   [x]     Register form
    -   [ ]     Catergories
    -   [ ]     Get all posts
    -   [ ]     View single post
    -   [ ]     Admin dashboard


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`
`JWT_SECRET`

## Run Locally

Clone the project

```bash
  git clone https://github.com/acekavi/acekavi.me.git
```

Go to the project directory

```bash
  cd backend
```

Install dependencies

```bash
  cargo install cargo-watch
  cargo build
```

Start the server

```bash
  cargo watch -q -c -w src/ -x run
```

Start the client

```bash
  cargo watch -q -c -w tests/ -x "test -q quick_dev -- --nocapture"
```

Connect to the database

```bash
  sudo -i -u postgres psql -h localhost -p 5432 -U admin -d testdb
```

## Feedback

If you have any feedback, please reach out to us at avishkakavinda@proton.me


## Authors

- [@acekavi](https://www.github.com/acekavi)

