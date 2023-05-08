use async_trait::async_trait;
use axum::RequestPartsExt;
use axum::extract::{FromRequestParts, State};
use axum::http::Request;
use axum::http::request::Parts;
use axum::middleware::Next;
use axum::response::Response;
use lazy_regex::regex_captures;
use tower_cookies::{Cookies, Cookie};

use crate::ctx::Ctx;
use crate::model::ModelController;
use crate::web::AUTH_TOKEN;
use crate::{Error, Result};

// region: --- Middleware Require Authentication ---
pub async fn mw_require_auth<B>(
  ctx: Result<Ctx>,
  req: Request<B>, 
  next: Next<B>
) -> Result<Response>{
  println!("--> {:<12} - mw_require_auth - {ctx:?}", "MIDDLEWARE");
  
  ctx?;

  Ok(next.run(req).await)
}

pub async fn mw_ctx_resolver<B>(
  _mc: State<ModelController>,
  cookies: Cookies,
  mut req: Request<B>, 
  next: Next<B>
) -> Result<Response>{
  println!("--> {:<12} - ctx_resolver", "MIDDLEWARE");
  
  let auth_token = cookies.get(AUTH_TOKEN).map(|c| c.value().to_string());

  // Compute result Ctx
  let result_ctx = match auth_token
      .ok_or(Error::AuthTokenInvalid)
      .and_then(parse_auth_token)
      {
        Ok((user_id, _exp, _sign)) => {

          // Todo Token component validation

          Ok(Ctx::new(user_id))
        }
        Err(e) => Err(e),
      };

  // Remove cookie is something went wrong other than missing auth token
  if result_ctx.is_err() && !matches!(result_ctx, Err(Error::AuthTokenMissing)){
    cookies.remove(Cookie::named(AUTH_TOKEN));
  }

  // Add ctx to request
  req.extensions_mut().insert(result_ctx);

  Ok(next.run(req).await)
}
// endregion: --- Middleware Require Authentication ---

// region: --- Context ---
#[async_trait]
impl<S: Send + Sync> FromRequestParts<S> for Ctx{
  type Rejection = Error;

  async fn from_request_parts(parts: &mut Parts, _state: &S) -> Result<Self>{
    println!("--> {:<12} - Ctx", "EXTRACTOR");

    parts.extensions
          .get::<Result<Ctx>>()
          .ok_or(Error::CtxMissing)?
          .clone()
  }
}
// endregion: --- Context ---

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