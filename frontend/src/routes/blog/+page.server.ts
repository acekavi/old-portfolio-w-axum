import type { PageServerLoad } from "./$types";

export const load : PageServerLoad = (async ({ cookies, locals }) => {
    const jwt_token = cookies.get('token');
    if (jwt_token) {
        console.log("Token found : " + jwt_token);
    }
});