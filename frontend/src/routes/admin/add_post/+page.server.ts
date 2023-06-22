import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    add_post: async ({ cookies, request }) => {
        const data = await request.formData();

        console.log(data);
    }
}