
# acekavi.me

My Personal Portfolio Website


## Tech Stack

**Client:** React, TailwindCSS, GSAP

**Server:** Axum, Tokio, httpc-test, postgresql, AWS

## Roadmap

-   Todo

    -   [ ]     Hook static file storage to AWS s3
    -   [ ]     Hook login credential checker to a database and hash the passwords
    -   [ ]     Generate JWT token dynamically

### Backend

- API Endpoints for
    -   [ ]     Login
    -   [ ]     Blog CRUD
    -   [ ]     Designs CRUD
    -   [ ]     Projects CRUD
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

- TBD


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`


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


## Feedback

If you have any feedback, please reach out to us at avishkakavinda@proton.me


## Authors

- [@acekavi](https://www.github.com/acekavi)

