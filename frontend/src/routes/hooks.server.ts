import { API_URL } from '$env/static/private';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const session = String(event.cookies.get('session'));
	const id = String(event.cookies.get('id'));
	const current_url = event.url.pathname;

	let options: RequestInit = {
		method: 'GET',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	if (session !== 'undefined' && id !== 'undefined') {
		options.headers = {
			...options.headers,
			authorization: session
		};
		const response = await fetch(`${API_URL}/user/${event.cookies.get('id')}`, options);
		const currentUser: User = await response.json();

		if (!response.ok) {
			event.cookies.delete('session');
			event.cookies.delete('id');
		}

		if (currentUser) {
			event.locals.user = {
				id: currentUser.id,
				username: currentUser.username,
				email: currentUser.email,
				first_name: currentUser.first_name,
				last_name: currentUser.last_name,
				is_active: currentUser.is_active,
				is_superuser: currentUser.is_superuser ? currentUser.is_superuser : false,
			};
		}
		if (current_url.includes('/admin') && !currentUser.is_superuser) {
			throw redirect(302, '/dashboard');
		}

	} else {
		if (current_url.includes('/dashboard') || current_url.includes('/admin')) {
			throw redirect(302, '/');
		}
	}

	return resolve(event);
}) satisfies Handle;
