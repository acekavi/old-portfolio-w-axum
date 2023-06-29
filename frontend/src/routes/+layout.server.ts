import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	return {
		user: locals.user as User,
		url: url.pathname,
	};
};