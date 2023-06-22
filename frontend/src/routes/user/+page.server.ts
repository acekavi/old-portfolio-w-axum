import { API_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	if (user) {
		throw redirect(302, '/dashboard');
	}
};

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = String(data.get('username'));
		const password = String(data.get('password'));

		const loginPayload: Loginparams = { username, password };
		const response = await fetch(`${API_URL}/user/login`, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(loginPayload)
		});
		const json: LoginResponse = await response.json();

		if (!response.ok) {
			if (json.error) {
				return fail(422, {
					username: data.get('username'),
					password: data.get('password'),
					error: json.error
				});
			}
		}

		if (response.headers.get('authorization') !== null) {
			let jwt_token = response.headers.get('authorization') ?? '';
			cookies.set('session', jwt_token, {
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				maxAge: 60 * 60 * 8,
				path: '/'
			});
			cookies.set('id', json.id, { httpOnly: true, sameSite: 'strict', secure: true, maxAge: 60 * 60 * 8, path: '/' });

			throw redirect(302, '/dashboard');
		}
	},
	register: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = String(data.get('username'));
		const email = String(data.get('email'));
		const password = String(data.get('password'));
		const confirm_password = String(data.get('confirm-password'));

		if (password !== confirm_password) {
			return fail(422, {
				username: data.get('username'),
				email: data.get('email'),
				password: data.get('password'),
				confirm_password: data.get('confirm-password'),
				error: 'Passwords do not match'
			});
		}

		const registerPayload: Registerparams = { username, email, password };
		const response = await fetch(`${API_URL}/user/register`, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(registerPayload)
		});

		const json: LoginResponse = await response.json();
		if (!response.ok) {
			if (json.error) {
				return fail(422, {
					username: data.get('username'),
					email: data.get('email'),
					password: data.get('password'),
					confirm_password: data.get('confirm-password'),
					error: json.error
				});
			}
		}

		if (response.headers.get('authorization') !== null) {
			let jwt_token = response.headers.get('authorization') ?? '';
			cookies.set('session', jwt_token, {
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				maxAge: 60 * 60 * 8,
				path: '/'
			});
			cookies.set('id', json.id, { httpOnly: true, sameSite: 'strict', secure: true, maxAge: 60 * 60 * 8, path: '/' });
			throw redirect(302, '/dashboard');
		}
	}
};
