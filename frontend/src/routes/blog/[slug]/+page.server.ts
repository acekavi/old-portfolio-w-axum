import { API_URL } from '$env/static/private';
import { sleep } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params, parent }) => {
	const { user } = await parent();
	const session = String(cookies.get('session'));
	let options: RequestInit = {
		method: 'GET',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	if (session !== 'undefined') {
		options.headers = {
			...options.headers,
			authorization: session
		};
	}

	const post_response = await fetch(`${API_URL}/blog/${params.slug}`, options);

	const comment_response = await fetch(`${API_URL}/blog/${params.slug}/comment`, options);

	const post: BlogPost = await post_response.json();

	const comments: Comments[] = await comment_response.json();

	if (!post_response.ok || !comment_response.ok) {
		return { error: post.error ?? comments[0].error };
	}

	return { post, comments, user };
};

export const actions: Actions = {
	like: async ({ cookies, params }) => {
		const session = String(cookies.get('session'));
		let options: RequestInit = {
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		if (session !== 'undefined') {
			options.headers = {
				...options.headers,
				authorization: session
			};
		}

		const response = await fetch(`${API_URL}/blog/${params.slug}/like`, options);

		const json: MessageResponse = await response.json();

		if (!response.ok) {
			if (json.error) {
				return { error: json.error };
			}
		}
		return { message: json.message ? 'Glad you liked it!' : 'Oh! What changed your mind?' };
	},
	comment: async ({ cookies, params, request }) => {
		const data = await request.formData();
		const session = String(cookies.get('session'));
		let options: RequestInit = {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		if (session !== 'undefined') {
			options.headers = {
				...options.headers,
				authorization: session
			};
		} else {
			return { error: 'Please log in to comment on this post' };
		}

		if (data.get('content') && data.get('parent_id')) {
			options.body = JSON.stringify({
				content: data.get('content'),
				is_reply: true,
				parent_id: data.get('parent_id')
			});
		} else if (data.get('content') && !data.get('parent_id')) {
			options.body = JSON.stringify({
				content: data.get('content'),
				is_reply: false
			});
		} else {
			return { error: 'Cannot post empty comments' };
		}

		const response = await fetch(`${API_URL}/blog/${params.slug}/comment`, options);
		const json: CommentResponse = await response.json();

		if (!response.ok) {
			if (json.error) {
				return { error: json.error };
			}
		}
		return { message: 'Your comment has been added!' };
	},
	delete_comment: async ({ cookies, params, request }) => {
		const data = await request.formData();
		const session = String(cookies.get('session'));
		let options: RequestInit = {
			method: 'DELETE',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		if (session !== 'undefined') {
			options.headers = {
				...options.headers,
				authorization: session
			};
		} else {
			return { error: 'Please log in to delete this comment' };
		}

		if (!data.get('comment_id')) {
			return { error: 'Cannot delete comment' };
		} else {
			options.body = JSON.stringify({ comment_id: data.get('comment_id') });
		}

		const response = await fetch(`${API_URL}/blog/${params.slug}/comment`, options);

		const json: MessageResponse = await response.json();

		if (!response.ok) {
			if (json.error) {
				return { error: json.error };
			}
		}
		return { message: 'Your comment has been deleted!' };
	}
};
