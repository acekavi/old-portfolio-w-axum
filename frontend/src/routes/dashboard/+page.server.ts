import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';

export const load = (async ({ parent }) => {
	const { user } = await parent();

	return { user };
}) satisfies PageServerLoad;

export const actions: Actions = {
	logout: async ({ cookies, request }) => {
		const data = await request.formData();
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
		const response = await fetch(`${API_URL}/user/logout`, options);

		const json: MessageResponse = await response.json();

		if (!response.ok) {
			if (json.error) {
				return fail(422, {
					error: json.error
				});
			}
		} else {
			cookies.delete('session');
			cookies.delete('id');
			throw redirect(302, '/user');
		}
	}
};
