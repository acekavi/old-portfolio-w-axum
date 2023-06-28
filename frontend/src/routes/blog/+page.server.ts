import { API_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';

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
			authorization: session
		};
	}

	const response = await fetch(`${API_URL}/blog`, options);

	let json: BlogPost[] = await response.json();
	json = json.map((post: BlogPost) => ({
		...post,
		searchTerms: `${post.title} ${post.description} ${post.tags.join(' ')} ${post.category}`
	}));

	if (!response.ok) {
		if (json[0].error) {
			return { error: json[0].error };
		}
	} else {
		return { posts: json };
	}
};
