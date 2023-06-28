import { API_URL } from '$env/static/private';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, locals }) => {
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

    const response = await fetch(`${API_URL}/blog/all`, options);

    let json: BlogPost[] = await response.json();
    json = json.map((post: BlogPost) => ({
        ...post,
        searchTerms: `${post.title} ${post.description} ${post.tags.join(' ')} ${post.category}`
    }));

    if (!response.ok) {
        if (json[0].error) {
            return { error: json[0].error };
        }
    } else {
        return { posts: json };
    }
};

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

        if (session) {
            options.headers = {
                ...options.headers,
                authorization: session.toString()
            };
        } else {
            return { error: 'You aint me bitch!' };
        }


        if (title && content && description && category && tags) {
            options.body = JSON.stringify({
                title: title.toString(),
                description: description.toString(),
                content: content.toString(),
                category: category.toString(),
                tags: tags,
                is_draft: is_draft,
            });
        } else {
            return fail(422, {
                title: title.toString() || '',
                description: description.toString() || '',
                content: content.toString() || '',
                category: category.toString() || '',
                tags: tags || [],
                is_draft: is_draft ? true : false,
                error: "Please fill all the fields!"
            });
        }

        const response = await fetch(`${API_URL}/blog`, options);
        const json: any = await response.json();

        if (!response.ok) {
            if (json.error) {
                return fail(422, {
                    title: title.toString() || '',
                    description: description.toString() || '',
                    content: content.toString() || '',
                    category: category.toString() || '',
                    tags: tags || [],
                    is_draft: is_draft ? true : false,
                    error: json.error
                });
            }
        }
        return { message: 'Your post has been added!' };
    }
}