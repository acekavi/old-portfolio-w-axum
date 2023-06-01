use serde::Deserialize;

// region: User Create payload
#[derive(Deserialize)]
pub struct UserCreatePayload {
    pub username: String,
    pub password: String,
    pub email: String,
}
// endregion: User Create payload

// region: User Login payload
#[derive(Deserialize)]
pub struct UserLoginPayload {
    pub username: String,
    pub password: String,
}
// endregion: User Create payload

// region: User Update payload
#[derive(Deserialize)]
pub struct UserUpdatePayload {
    pub email: Option<String>,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
}
// endregion: User Update payload
// region: password change payload
#[derive(Deserialize)]
pub struct PasswordChangePayload {
    pub old_password: String,
    pub new_password: String,
}
// endregion: password change payload
