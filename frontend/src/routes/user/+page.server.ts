import { API_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { readable } from 'svelte/store';

export const load: PageServerLoad = async ({ cookies }) => {
	let jwt_token = cookies.get('token');
	let user_id = cookies.get('uid');

	if (jwt_token === undefined || user_id === undefined) {
		return { error: 'Not logged in' };
	} else {
		const response = await fetch(`${API_URL}/user/${user_id}`, {
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'authorization': jwt_token ?? ''
			}
		});
	
		const json: User = await response.json();
		if (!response.ok) {
			if (json.error) {
				return { error: json.error};
			}
		} else {
			return { user: json };
		}
	}

};

export const actions = {
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
				return { error: json.error };
			}
		}

		if (response.headers.get('authorization') !== null) {
			let jwt_token = response.headers.get('authorization') ?? '';
			cookies.set('token', jwt_token, {
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				path: '/'
			});
			cookies.set('uid', json.id, { httpOnly: true, sameSite: 'strict', secure: true, path: '/' });

			return { success: true }
		}
	},
	register: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = String(data.get('username'));
		const email = String(data.get('email'));
		const password = String(data.get('password'));
		const confirm_password = String(data.get('confirm-password'));

		if (password !== confirm_password) {
			return { error: 'Passwords do not match' };
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
				return { error: json.error };
			}
		}

		if (response.headers.get('authorization') !== null) {
			let jwt_token = response.headers.get('authorization') ?? '';
			cookies.set('token', jwt_token, {
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				path: '/'
			});
			cookies.set('uid', json.id, { httpOnly: true, sameSite: 'strict', secure: true, path: '/' });
			return { success: true }
		}
	},
	logout: async ({ cookies }) => {
		let jwt_token = cookies.get('token');

		if (jwt_token === undefined) {
			return { error: 'Not logged in' };
		}

		const response = await fetch(`${API_URL}/user/logout`, {
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'authorization': jwt_token
			}
		});
		const json: MessageResponse = await response.json();
		if (!response.ok) {
			if (json.error) {
				return { error: json.error };
			}
		} else {
			cookies.delete('token');
			cookies.delete('uid');
			throw redirect(302,'/user');
		}
	}
} satisfies Actions;
