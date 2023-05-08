#![allow(unused)] // For only the start

use anyhow::Result;
use serde_json::json;

#[tokio::test]
async fn quick_dev() -> httpc_test::Result<()> {
  let hc = httpc_test::new_client("http://localhost:3000")?;
  
  // hc.do_get("/hello?name=Avishka").await?.print().await?; // Query params check
  // hc.do_get("/hello/Kavinda").await?.print().await?; // Path params check
  // hc.do_get("/static/test.html").await?.print().await?;  // Static files check
  
  hc.do_post("/api/ticket", json!({
    "title": "Ticket 2",
  }),
  ).await?.print().await?;

  hc.do_post("/api/ticket/0", json!({
    "title": "Ticket AAA",
  })).await?.print().await?;
  hc.do_get("/api/ticket/3").await?.print().await?;

  hc.do_get("/api/ticket/0").await?.print().await?;

  hc.do_get("/api/ticket").await?.print().await?;
  Ok(())
}