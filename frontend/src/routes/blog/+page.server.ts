import { API_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { fail, error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, locals }) => {
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

	const response = await fetch(`${API_URL}/blog`, options);

	let json: BlogPost[] = await response.json();
	json = json.map((post: BlogPost) => ({
		...post,
		searchTerms: `${post.title} ${post.description} ${post.tags.join(' ')} ${post.category}`
	}));

	if (!response.ok) {
		console.log(json[0].error);
		throw error(500, "Internal Server Error");
	} else {
		return { posts: json };
	}
};
