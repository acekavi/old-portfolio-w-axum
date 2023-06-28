import { API_URL } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

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

            return { message: 'Successfully logged in!' };
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
                username,
                email,
                password,
                confirm_password,
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
                    username,
                    email,
                    password,
                    confirm_password,
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
            return { message: 'Successfully signed up!' };
        }
    },
    logout: async ({ cookies, request }) => {
        const data = await request.formData();
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
            return { message: 'Successfully logged out!' };
        }
    }
};
