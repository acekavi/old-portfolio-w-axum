import { API_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params, parent }) => {
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

    const post_response = await fetch(`${API_URL}/blog/${params.slug}`, options);
    const post: BlogPost = await post_response.json();

    return { post };
};

export const actions: Actions = {
    edit_post: async ({ cookies, request, params }) => {
        const data = await request.formData();

        const title = data.get('title');
        const content = data.get('content');
        const description = data.get('description');
        const category = data.get('category');
        const tags = data.getAll('tags');
        const is_draft = data.get('is_draft') === null ? false : true;

        const session = cookies.get('session');

        let options: RequestInit = {
            method: 'PATCH',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        if (session) {
            options.headers = {
                ...options.headers,
                authorization: session
            };
        } else {
            return { error: 'Please log in to update this post' };
        }

        options.body = JSON.stringify({
            title: title.toString(),
            description: description.toString(),
            content: content.toString(),
            category: category.toString(),
            tags: tags,
            is_draft: is_draft,
        });

        const response = await fetch(`${API_URL}/blog/${params.slug}`, options);
        const json: MessageResponse = await response.json();

        if (!response.ok) {
            if (json.error) {
                return { error: json.error };
            }
        }
        return { message: 'Your post has been updated!' };
    },
    delete_post: async ({ cookies, params, request }) => {
        const session = cookies.get('session');
        let options: RequestInit = {
            method: 'DELETE',
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
        } else {
            return { error: 'You aint me bitch!' };
        }

        const response = await fetch(`${API_URL}/blog/${params.slug}`, options);

        const json: MessageResponse = await response.json();

        if (!response.ok) {
            if (json.error) {
                return { error: json.error };
            }
        }
        throw redirect(302, '/admin');
    }
}