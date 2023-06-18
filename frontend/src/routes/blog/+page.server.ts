import { API_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, locals }) => {
	const response = await fetch(`${API_URL}/blog`, {
		method: 'GET',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			'authorization': cookies.get('token') ?? ''
		}
	});

	const json: BlogPost[] = await response.json();
	if (!response.ok) {
		if (json[0].error) {
			return { error: json[0].error };
		}
	} else {
		return { posts: json };
	}
};
