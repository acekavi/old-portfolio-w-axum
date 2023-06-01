#[tokio::test]
async fn test_post_request() {
    let client = reqwest::Client::new();

    let res = client
        .post("localhost:3000/post")
        .body("Hello, World!")
        .send()
        .await;

    match res {
        Ok(res) => {
            assert_eq!(res.text().await.unwrap(), "Received message: Hello, World!");
        }
        Err(e) => println!("Error: {:?}", e),
    }
}
