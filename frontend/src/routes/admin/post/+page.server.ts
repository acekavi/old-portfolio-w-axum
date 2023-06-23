import { API_URL } from '$env/static/private';
import type { Actions, PageServerLoad } from './$types';

export const actions: Actions = {
    add_post: async ({ cookies, request }) => {
        const data = await request.formData();

        const title = data.get('title');
        const content = data.get('content');
        const description = data.get('description');
        const category = data.get('category');
        const tags = data.getAll('tags');
        const is_draft = data.get('is_draft') === null ? false : true;

        const session = cookies.get('session');

        let options: RequestInit = {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        if (session !== undefined) {
            options.headers = {
                ...options.headers,
                authorization: session
            };
        } else {
            return { error: 'Please log in to add a new post' };
        }


        if (title && content && description && category && tags) {
            options.body = JSON.stringify({
                title,
                description,
                content,
                category,
                tags,
                is_draft,
            });
        } else {
            return { error: 'You missed some fields' };
        }

        const response = await fetch(`${API_URL}/blog`, options);
        const json: any = await response.json();

        if (!response.ok) {
            if (json.error) {
                return { error: json.error };
            }
        }
        return { message: 'Your post has been added!' };
    }
}