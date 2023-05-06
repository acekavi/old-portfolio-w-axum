use axum::http::Request;
use axum::middleware::Next;
use axum::response::Response;
use lazy_regex::regex_captures;
use tower_cookies::Cookies;

use crate::web::AUTH_TOKEN;
use crate::{Error, Result};

// region: --- Middleware Require Authentication ---
pub async fn mw_require_auth<B>(
  cookies: Cookies,
  req: Request<B>, 
  next: Next<B>
) -> Result<Response>{
  println!("--> {:<12} - mw_require_auth", "MIDDLEWARE");
  let auth_token = cookies.get(AUTH_TOKEN).map(|c| c.value().to_string());

  // Parse auth token
  let (user_id, exp, sign) = auth_token
      .ok_or(Error::AuthTokenMissing)
      .and_then(parse_auth_token)?;

  // Todo - Token component validation (e.g., exp, sign)

  Ok(next.run(req).await)
}
// endregion: --- Middleware Require Authentication ---

// region: --- Parse Auth Token ---
// Todo - parse auth token from request
fn parse_auth_token(token: String) -> Result<(u32, String, String)>{
  let (_whole, user_id, exp, sign) = regex_captures!(
    r#"^user-(\d+)\.(.+)\.(.+)"#,
    &token
  ).ok_or(Error::AuthTokenInvalid)?;

  let user_id:u32 = user_id.parse().map_err(|_| Error::AuthTokenInvalid)?;

  // Todo - check sign against database
  Ok((user_id, exp.to_string(), sign.to_string()))
}
// endregion: --- Parse Auth Token ---