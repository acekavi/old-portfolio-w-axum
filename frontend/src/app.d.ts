// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		user: string;
	}
	interface PageData {}
	interface Error {
		error: string;
	}
	interface Platform {}
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
	username: string;
	email: string;
	created_at: TimeLike;
	updated_at: TimeLike;
	error?: string;
};

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
	likes: number;
	author: string;
	error?: string;
};

declare type LikeResponse = {
	message: string;
	error?: string;
}