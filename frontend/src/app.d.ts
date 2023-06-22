// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		user: User;
	}
	interface PageData { }
	interface Error {
		error: string;
	}
	interface Platform { }
	s;
}

declare type Loginparams = {
	username: string;
	password: string;
};

declare type Registerparams = {
	username: string;
	email: string;
	password: string;
};

declare type LoginResponse = {
	id: UUID;
	error?: string;
};

declare type BlogPostResponse = {
	id: UUID;
	title: string;
	slug: string;
	description: string;
	content: string;
	views: number;
	category: string;
	tags: string[];
	is_draft: boolean;
	created_at: TimeLike;
	updated_at: TimeLike;
	author_id: UUID;
	error?: string;
}

declare type BlogPost = {
	id: UUID;
	title: string;
	slug: string;
	description: string;
	content: string;
	views: number;
	category: string;
	tags: string[];
	is_draft: boolean;
	updated_at: TimeLike;
	like_count: number;
	liked: boolean;
	author: string;
	error?: string;
};

declare type User = {
	id: UUID;
	username: string;
	email: string;
	first_name?: string;
	last_name?: string;
	is_active: boolean;
	is_superuser?: boolean;
	error?: string;
};

declare type MessageResponse = {
	message: boolean;
	error?: string;
};

declare type Comments = {
	id: UUID;
	content: string;
	created_at: TimeLike;
	user_id: UUID;
	author: string;
	parent_id?: UUID;
	replies: Comments[];
	error?: string;
};

declare type CommentPayload = {
	content: string;
	is_reply: boolean;
	parent_id?: UUID;
};

declare type CommentResponse = {
	id: UUID;
	content: string;
	created_at: TimeLike;
	blog_post_id: UUID;
	user_id: UUID;
	parent_id?: UUID;
	error?: string;
};
