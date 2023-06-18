import { API_URL } from '$env/static/private';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, locals, params }) => {
	const response = await fetch(`${API_URL}/blog/${params.slug}`, {
		method: 'GET'
	});

	const json: BlogPost = await response.json();
	if (!response.ok) {
		if (json.error) {
			return { error: json.error };
		}
	} else {
		return { post: json };
	}
};

export const actions = {
	like: async ({ cookies, params }) => {

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
				return { error: json.error };
			}
		}
		return { like_res: json };
	}
} satisfies  Actions;
