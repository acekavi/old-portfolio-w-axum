import { API_URL  } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load : PageServerLoad = (async ({ cookies }) => {
    if (jwt_token) {
        throw redirect(303, '/blog');
    }
});

type Loginparams = {
    username: string,
    password: string
}

type Registerparams = {
    username: string,
    email: string,
    password: string,
}

type Response = {
    id: UUID,
    username: string,
    email: string,
    created_at: TimeLike,
    updated_at: TimeLike,
    error? : string
}

export const actions = {
    login: async ({ cookies, request }) =>{
        const data = await request.formData();
        const username = String(data.get('username'));
        const password = String(data.get('password'));

        const loginPayload : Loginparams = { username, password };
        const response = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginPayload),
        });
        const json : Response = await response.json();

        if (!response.ok) {
            if (json.error) {
                return { error: json.error };
            }
        }

        if (response.headers.get('authorization') !== null) {
            let jwt_token = response.headers.get('authorization') ?? "";
            cookies.set('token', jwt_token, { httpOnly: true, sameSite: 'strict', secure: true, path: '/' });
            cookies.set('uid', json.id, { httpOnly: true, sameSite: 'strict', secure: true, path: '/' });
            cookies.set('uname', json.username, { httpOnly: true, sameSite: 'strict', secure: true, path: '/' });
        }
    },
    register: async({cookies , request}) => {
        const data = await request.formData();
        const username = String(data.get('username'));
        const email = String(data.get('email'));
        const password = String(data.get('password'));
        const confirm_password = String(data.get('confirm-password'));

        if (password !== confirm_password) {
            return { error: "Passwords do not match" };
        }

        const registerPayload : Registerparams = { username, email, password };
        const response = await fetch(`${API_URL}/user/register`, {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerPayload),
        });
        
        const json : Response = await response.json();
        if (!response.ok) {
            if (json.error) {
                return { error: json.error };
            }
        }

        if (response.headers.get('authorization') !== null) {
            let jwt_token = response.headers.get('authorization') ?? "";
            cookies.set('token', jwt_token, { httpOnly: true, sameSite: 'strict', secure: true, path: '/' });
            cookies.set('uid', json.id, { httpOnly: true, sameSite: 'strict', secure: true, path: '/' });
            cookies.set('uname', json.username, { httpOnly: true, sameSite: 'strict', secure: true, path: '/' });
        }
    }
};