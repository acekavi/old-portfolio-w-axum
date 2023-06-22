import { API_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, locals }) => {
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

	const response = await fetch(`${API_URL}/blog`, options);

	const json: BlogPost[] = await response.json();
	if (!response.ok) {
		if (json[0].error) {
			return { error: json[0].error };
		}
	} else {
		return { posts: json };
	}
};
