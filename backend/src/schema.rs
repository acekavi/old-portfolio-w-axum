// @generated automatically by Diesel CLI.

diesel::table! {
    user (id) {
        id -> Uuid,
        #[max_length = 50]
        username -> Varchar,
        #[max_length = 255]
        password -> Varchar,
        #[max_length = 255]
        email -> Varchar,
        #[max_length = 50]
        first_name -> Nullable<Varchar>,
        #[max_length = 50]
        last_name -> Nullable<Varchar>,
        is_active -> Nullable<Bool>,
        is_superuser -> Nullable<Bool>,
        created_at -> Nullable<Timestamptz>,
        updated_at -> Nullable<Timestamptz>,
    }
}
