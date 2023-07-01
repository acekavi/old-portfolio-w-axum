import { API_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { fail, error } from '@sveltejs/kit';
import { markdownToHtml } from '$lib/utils/markdownToHtml';

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
    let post: BlogPost = await post_response.json().then((post: BlogPost) => {
        markdownToHtml(post.content);
        return post;
    });

    if (!post_response.ok) {
        console.log(post.error);
        throw error(404);
    }
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

        let body = {
            title: title?.toString(),
            description: description?.toString(),
            content: content?.toString(),
            category: category?.toString(),
            tags: tags.map((tag) => String(tag)),
            is_draft: is_draft
        };

        if (session) {
            options.headers = {
                ...options.headers,
                authorization: session
            };
        } else {
            return fail(422, {
                post: body,
                error: "Please log in to update this post!"
            });
        }

        options.body = JSON.stringify(body);

        const response = await fetch(`${API_URL}/blog/${params.slug}`, options);
        const json: MessageResponse = await response.json();

        if (!response.ok) {
            if (json.error) {
                return fail(422, {
                    post: body,
                    error: json.error
                });
            }
        }
        return {
            post: body,
            message: 'Your post has been updated!'
        };
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
            return fail(422, {
                error: 'Nice try Bitch!'
            });
        }

        const response = await fetch(`${API_URL}/blog/${params.slug}`, options);

        const json: MessageResponse = await response.json();

        if (!response.ok) {
            if (json.error) {
                return fail(422, {
                    error: json.error
                });
            }
        }
        throw redirect(302, '/admin');
    }
}