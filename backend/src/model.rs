use crate::{Error, Result, ctx::Ctx};
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};

// region: --- Ticket Type ---
#[derive(Debug, Clone, Serialize)]
pub struct Ticket {
  pub id: u32,
  pub creator_id: u32,
  pub title: String,
}

#[derive(Deserialize)]
pub struct TicketToCreate {
  pub title: String,
}
// endregion: --- Ticket Type ---

// region: --- Modal Controller ---
#[derive(Clone)]
pub struct ModelController {
  tickets_store: Arc<Mutex<Vec<Option<Ticket>>>>,
}

// Constructor
impl ModelController {
  pub fn new() -> Result<Self> {
    Ok(Self {
      tickets_store: Arc::default(),
    })
  }
}

// region: --- CRUD ---
impl ModelController {
  pub async fn create(&self, ctx: Ctx, ticket_fc : TicketToCreate) -> Result<Ticket>{
    let mut store = self.tickets_store.lock().unwrap();

    let id: u32 = store.len() as u32;
    let ticket = Ticket {
      id,
      creator_id: ctx.user_id(),
      title: ticket_fc.title,
    };
    let ticket_clone = Some(ticket);
    store.push(ticket_clone.clone());

    ticket_clone.ok_or(Error::TicketCreateFailed)
  }

  pub async fn list(&self) -> Result<Vec<Ticket>>{
    let store = self.tickets_store.lock().unwrap();

    let tickets = store.iter()
      .filter_map(|ticket| ticket.clone())
      .collect();

    Ok(tickets)
  }

  pub async fn get(&self, id: u32) -> Result<Option<Ticket>>{
    let store = self.tickets_store.lock().unwrap();

    let ticket = store.get(id as usize);
    
    if ticket.is_some(){
      return Ok(ticket.unwrap().clone());
    } else {
      return Err(Error::TicketGetFailIDNotFound{ id });
    }
  }

  pub async fn update(&self, id: u32, ticket_fc: TicketToCreate, ctx:Ctx) -> Result<Option<Ticket>>{
    let mut store = self.tickets_store.lock().unwrap();

    let new_ticket = Ticket {
      id,
      creator_id: ctx.user_id(),
      title: ticket_fc.title,
    };
    let ticket= store.get_mut(id as usize).and_then(|ticket| ticket.replace(new_ticket));

    Ok(Some(ticket.ok_or(Error::TicketUpdateFailIDNotFound{ id })?))
  }

  pub async fn delete(&self, id: u32) -> Result<Option<Ticket>>{
    let mut store: std::sync::MutexGuard<Vec<Option<Ticket>>> = self.tickets_store.lock().unwrap();

    let ticket= store.get_mut(id as usize).and_then(|ticket: &mut Option<Ticket>| ticket.take());

    Ok(Some(ticket.ok_or(Error::TicketDeleteFailIDNotFound{ id })?))
  }

}
// endregion: --- Modal Controller ---
