import { API_URL } from '$env/static/private';
import { markdownToHtml } from '$lib/utils/markdownToHtml';
import type { Actions, PageServerLoad } from './$types';
import { fail, error } from '@sveltejs/kit';


export const load: PageServerLoad = async ({ cookies, params, parent }) => {
	const { user } = await parent();
	const session = cookies.get('session');
	let options: RequestInit = {
		method: 'GET',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	if (session) {
		options.headers = {
			...options.headers,
			authorization: session.toString()
		};
	}

	const post_response = await fetch(`${API_URL}/blog/${params.slug}`, options);

	const comment_response = await fetch(`${API_URL}/blog/${params.slug}/comment`, options);

	const post: BlogPost = await post_response.json().then((post: BlogPost) => {
		post.html = markdownToHtml(post.content);
		return post;
	});
	const comments: Comments[] = await comment_response.json();

	if (!post_response.ok) {
		console.log("Post Response Error: " + post.error);
		throw error(404);
	}

	if (!comment_response.ok) {
		console.log("Comment Response Error: " + comments[0].error);
		throw error(500);
	}

	return {
		props: {
			post, comments, user: user ?? null
		}
	};
};

export const actions: Actions = {
	like: async ({ cookies, params }) => {
		const session = cookies.get('session');
		let options: RequestInit = {
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		if (session) {
			options.headers = {
				...options.headers,
				authorization: session.toString()
			};
		}

		const response = await fetch(`${API_URL}/blog/${params.slug}/like`, options);

		const json: MessageResponse = await response.json();

		if (!response.ok) {
			if (json.error) {
				return fail(422, {
					error: json.error
				});
			}
		}
		return { message: json.message ? 'Glad you liked it!' : 'You unliked the post' };
	},
	comment: async ({ cookies, params, request }) => {
		const data = await request.formData();
		const content = data.get('content');
		const parent_id = data.get('parent_id');

		const session = cookies.get('session');
		let options: RequestInit = {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		if (session) {
			options.headers = {
				...options.headers,
				authorization: session.toString()
			};
		} else {
			return fail(422, {
				error: "Please log in to comment on this post"
			});
		}

		if (content && parent_id) {
			options.body = JSON.stringify({
				content: content.toString(),
				is_reply: true,
				parent_id: parent_id.toString(),
			});
		} else if (content && !parent_id) {
			options.body = JSON.stringify({
				content: content.toString(),
				is_reply: false
			});
		} else {
			return fail(422, {
				error: "Cannot post empty comments"
			});
		}

		const response = await fetch(`${API_URL}/blog/${params.slug}/comment`, options);
		const json: CommentResponse = await response.json();

		if (!response.ok) {
			if (json.error) {
				return fail(422, {
					error: json.error
				});
			}
		}
		return { message: 'Your comment has been added!' };
	},
	delete_comment: async ({ cookies, params, request }) => {
		const data = await request.formData();
		const session = cookies.get('session');
		const comment_id = data.get('comment_id');
		let options: RequestInit = {
			method: 'DELETE',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		if (session) {
			options.headers = {
				...options.headers,
				authorization: session.toString()
			};
		} else {
			return fail(422, {
				error: 'Please log in to delete this comment'
			});
		}

		if (!comment_id) {
			return fail(422, {
				error: "You don't have permission to delete this comment"
			});
		} else {
			options.body = JSON.stringify({ comment_id: comment_id.toString() });
		}

		const response = await fetch(`${API_URL}/blog/${params.slug}/comment`, options);

		const json: MessageResponse = await response.json();

		if (!response.ok) {
			if (json.error) {
				return fail(422, {
					error: json.error
				});
			}
		}
		return { message: 'Your comment has been deleted!' };
	}
};
