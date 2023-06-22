import { dev } from '$app/environment';
import type { MdsvexOptions } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

export const title = 'acekavi.me';
export const description =
	'Avishka Kavinda - Personal Website: Explore My Portfolio, Blog, and Career Journey';
export const url = dev ? 'http://localhost:5173/' : 'https://www.acekavi.me';
export const twitter = '@acekaviftw';
export const author = 'Avishka Kavinda';
export const site_img = 'https://unsplash.com/photos/TamMbr4okv4';

export const mdsvexConfig: MdsvexOptions = {
	smartypants: {
		quotes: true,
		ellipses: true,
		dashes: 'oldschool',
	},
	rehypePlugins: [
		rehypeSlug,
		rehypeAutolinkHeadings,
	]
};
