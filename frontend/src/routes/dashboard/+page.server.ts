import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';

export const load = (async ({ parent }) => {
	const { user } = await parent();

	return { user };
}) satisfies PageServerLoad;
