#[cfg(test)]
mod tests {
  use axum::{http::Request, Json, response::IntoResponse};
  use backend::{Input, post_handler};
use hyper::{Body, StatusCode};

  #[tokio::test]
  async fn test_post_request() {
      let input = Input {
          message: "Hello, Ace!".to_string(),
      };
      let json = serde_json::to_string(&input).unwrap();
      let _request = Request::builder()
          .method("POST")
          .uri("/post")
          .header("content-type", "application/json")
          .body(Body::from(json))
          .unwrap();

      let response = post_handler(Json(input)).await.into_response();
      assert_eq!(response.status(), StatusCode::OK);

      let body = hyper::body::to_bytes(response.into_body()).await.unwrap();
      let body_str = String::from_utf8(body.to_vec()).unwrap();
      assert_eq!(body_str, "Received message: Hello, Axum!");
  }
}