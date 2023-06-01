use diesel::prelude::*;
use time::OffsetDateTime;
use uuid::Uuid;

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::schema::user)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct User {
    pub id: Uuid,
    pub username: String,
    pub password: String,
    pub email: String,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub is_active: Option<bool>,
    pub is_superuser: Option<bool>,
    pub created_at: Option<OffsetDateTime>,
    pub updated_at: Option<OffsetDateTime>,
}
