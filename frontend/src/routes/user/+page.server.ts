import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import type { UUID } from 'crypto';
import type { TimeLike } from 'fs';

type Loginparams = {
    username: string
    password: string
}

type loginResponse = {
    id: UUID,
    username: string,
    email: string,
    created_at: TimeLike
    updated_at: TimeLike
}

export const load : PageServerLoad = (async ({ cookies }) => {
    const token = cookies.get('session-id');
    if (token) {
        return {
            props: {
                token
            }
        };
    }
    return {
        status: 302,
        headers: {
            location: '/'
        }
    };
});

export const actions : Actions = {
    login: async(event) => {
        const data = await event.request.formData();
        try {
            if (data.get('username') !== '' && data.get('password') !== '') {
                const response = await fetch("http://127.0.0.1:3000/user/login", {
                    method: 'POST',
                    credentials: "same-origin",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: data.get('username'),
                        password: data.get('password')
                    })
                });
                const jsonData : loginResponse = await response.json();
                const authHeader = response.headers.get('authorization');

                event.cookies.set('user-id', jsonData.id), { path: '/', secure: true, httpOnly: true };
                event.cookies.set('token', authHeader), { path: '/', secure: true, httpOnly: true };

                return {
                    success: true,
                    user: jsonData
                };
            }
		} catch (error) {
			return fail(422, {
				username: data.get('username'),
				error: error.message
			});
		}
    },
    register: async({cookies , request}) => {
        const data = await request.formData();
        console.log(data, cookies);
    }
}