use axum::routing::{post, get, put, delete};
use axum::{Json, Router};
use axum::extract::{State, Path};

use crate::model::{ModelController, TicketToCreate, Ticket};
use crate::Result;

// region: --- Routes ---
pub fn routes(mc : ModelController) -> Router {
  Router::new()
      .route("/ticket", post(create_ticket).get(list_tickets))
      .route("/ticket/:id", get(get_ticket).put(update_ticket).delete(delete_ticket))
      .with_state(mc)
}
// endregion: --- Routes ---

// region: --- CRUD ---

// region: create ticket
async fn create_ticket (
  State(mc): State<ModelController>,
  Json(ticket_fc): Json<TicketToCreate>
) -> Result<Json<Ticket>> {
  println!("--> {:<12} - create_ticket", "HANDLER");

  let ticket: Ticket = mc.create(ticket_fc).await?;
  Ok(Json(ticket))
}
// endregion: create ticket

// region: list tickets
async fn list_tickets (
  State(mc): State<ModelController>
) -> Result<Json<Vec<Ticket>>> {
  println!("--> {:<12} - list_tickets", "HANDLER");
  let tickets: Vec<Ticket> = mc.list().await?;
  
  Ok(Json(tickets))
}
// endregion: list tickets

// region: get ticket
async fn get_ticket (
  State(mc): State<ModelController>,
  Path(id): Path<u32>
) -> Result<Json<Ticket>> {
  println!("--> {:<12} - get_ticket", "HANDLER");
  let ticket= mc.get(id).await?;
  
  Ok(Json(ticket))
}
// endregion: get ticket

// region: update ticket
async fn update_ticket (
  State(mc): State<ModelController>,
  Path(id): Path<u32>,
  Json(ticket_fc): Json<TicketToCreate>
) -> Result<Json<Ticket>> {
  println!("--> {:<12} - update_ticket", "HANDLER");
  let ticket = mc.update(id, ticket_fc).await?;
  
  Ok(Json(ticket))
}
// endregion: update ticket

// region: delete ticket
async fn delete_ticket (
  State(mc): State<ModelController>,
  Path(id): Path<u32>
) -> Result<Json<Ticket>> {
  println!("--> {:<12} - delete_ticket", "HANDLER");
  let ticket: Ticket = mc.delete(id).await?;
  
  Ok(Json(ticket))
}
//endregion: delete ticket
// endregion: --- CRUD ---