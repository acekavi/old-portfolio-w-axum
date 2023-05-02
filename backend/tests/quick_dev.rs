#![allow(unused)] // For only the start

use anyhow::Result;

#[tokio::test]
async fn quick_dev() -> httpc_test::Result<()> {
  let hc = httpc_test::new_client("http://localhost:3000")?;
  
  hc.do_get("/hello").await?.print().await?;

  Ok(())
}