import { API_URL } from '$env/static/private';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const current_user = cookies.get('uid');

	const post_response = await fetch(`${API_URL}/blog/${params.slug}`, {
		method: 'GET',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			'authorization': cookies.get('token') ?? ''
		}
	});
	
	const comment_response = await fetch(`${API_URL}/blog/${params.slug}/comment`, {
		method: 'GET',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			'authorization': cookies.get('token') ?? ''
		}
	});
	const post: BlogPost = await post_response.json();

	const comments: Comments[] = await comment_response.json();


	if(!post_response.ok || !comment_response.ok) {
		return { error: post.error ?? comments.error };
	}

	return { post : post, comments : comments, current_user: current_user ?? null };
};

export const actions = {
	like: async ({ cookies, params }) => {

		if (!cookies.get('token')) {
			return { error: 'You must be logged in to like a post' };
		}
		
		const response = await fetch(`${API_URL}/blog/${params.slug}/like`, {
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'authorization': cookies.get('token') ?? ''
			}
		});
		const json: LikeResponse = await response.json();

		if (!response.ok) {
			if (json.error) {
				return { error:  
				(json.error.includes('Failed to parse token!') ? "Please Log in to like this post" : json.error) };
			}
		}
		return { res_message: json };
	},
	comment: async ({ cookies, params, request }) => {
		if (!cookies.get('token')) {
			return { error: 'You must be logged in to comment on a post' };
		}
		const data = await request.formData();
		const content = String(data.get('content'));
		const parent_id = String(data.get('parent_id'));

		let body: CommentPayload;
		if(parent_id != ""){
			body = { content: content, is_reply: true, parent_id: parent_id };
		}else{
			body = { content: content, is_reply: false };
		}
		const response = await fetch(`${API_URL}/blog/${params.slug}/comment`, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'authorization': cookies.get('token') ?? ''
			},
			body: JSON.stringify(body)
		});

		const json: CommentResponse = await response.json();

		if (!response.ok) {
			if (json.error) {
				return { error: json.error };
			}
		}else{
			return { res_message: { message: "Your comment has been added!"} };
		}
	},
	delete: async ({ cookies, params, request }) => {
		if (!cookies.get('token')) {
			return { error: 'You must be logged in to delete a post' };
		}
		const data = await request.formData();
		const comment_id = String(data.get('comment_id'));

		const response = await fetch(`${API_URL}/blog/${params.slug}/comment`, {
			method: 'DELETE',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'authorization': cookies.get('token') ?? ''
			},
			body: JSON.stringify({ comment_id: comment_id })
		});

		const json: MessageResponse = await response.json();

		if (!response.ok) {
			if (json.error) {
				return { error: json.error };
			}
		}else{
			return { res_message: json.message };
		}
	}
} satisfies  Actions;
