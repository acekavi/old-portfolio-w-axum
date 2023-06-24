import { API_URL } from '$env/static/private';
import type { Actions, PageServerLoad } from './$types';
import { compile } from 'mdsvex';

import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import type { MdsvexOptions } from 'mdsvex';
import { escapeSvelte } from 'mdsvex'
import shiki from 'shiki';
import remarkGfm from 'remark-gfm';
import remarkGithub from 'remark-github/lib';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import toc from '@jsdevtools/rehype-toc';
import rehypeExternalLinks from 'rehype-external-links';

const mdsvexOption: MdsvexOptions = {
	smartypants: {
		quotes: true,
		ellipses: true,
		dashes: 'oldschool',
	},
	remarkPlugins: [
		// @ts-ignore - this is a valid remark plugin
		[remarkGfm],
		// @ts-ignore - this is a valid remark plugin
		[remarkGithub],
		// @ts-ignore - this is a valid remark plugin
		[remarkMath],
	],
	rehypePlugins: [
		// @ts-ignore - this is a valid remark plugin
		[rehypeSlug],
		// @ts-ignore - this is a valid remark plugin
		[rehypeAutolinkHeadings, { behavior: 'prepend' }],
		// @ts-ignore - this is a valid remark plugin
		[rehypeMathjax],
		// @ts-ignore - this is a valid remark plugin
		[rehypeExternalLinks, { rel: ['nofollow'], target: ['_blank'] }],
		[toc, {
			cssClasses: {
				toc: 'fixed left-5 mx-auto my-auto w-80 lg:block hidden table-of-content',
				listItem: 'font-semibold text-base',
				link: 'hover:text-primary-300 no-underline',
			},
			headings: ['h1', 'h2', 'h3'],
		}]
	],
	highlight: {
		highlighter: async (code, lang) => {
			lang = lang ? lang : 'text';
			const html = await shiki.getHighlighter({ themes: ['material-theme-darker', 'github-dark'] })
				.then(highlighter => highlighter.codeToHtml(code, { lang }));
			const escapedHtml = escapeSvelte(html);
			const language = lang;
			const codeWithHeader = `
				<div class="relative lg:w-2/5">
					<span class="absolute top-0 right-0 py-1 px-2 text-xs font-serif uppercase text-primary-500">${language}</span>
					<span class="absolute top-5 right-0">
						<button class="btn variant-glass-primary rounded-md py-1 px-2 me-2 text-xs font-serif uppercase text-slate-200" onclick="copyCode(this)">Copy</button>
					</span>
				${escapedHtml}</div>`;

			return codeWithHeader;
		},
	}
}


export const load: PageServerLoad = async ({ cookies, params, parent }) => {
	const { user } = await parent();
	const session = String(cookies.get('session'));
	let options: RequestInit = {
		method: 'GET',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	if (session !== 'undefined') {
		options.headers = {
			...options.headers,
			authorization: session
		};
	}

	const post_response = await fetch(`${API_URL}/blog/${params.slug}`, options);

	const comment_response = await fetch(`${API_URL}/blog/${params.slug}/comment`, options);

	const post: BlogPost = await post_response.json();

	const transformed_code = await compile(
		post.content,
		mdsvexOption
	)

	if (post.content && transformed_code && transformed_code.code) {
		post.content = transformed_code.code;
	}

	const comments: Comments[] = await comment_response.json();

	if (!post_response.ok || !comment_response.ok) {
		return { error: post.error ?? comments[0].error };
	}

	return { post, comments, user };
};

export const actions: Actions = {
	like: async ({ cookies, params }) => {
		const session = String(cookies.get('session'));
		let options: RequestInit = {
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		if (session !== 'undefined') {
			options.headers = {
				...options.headers,
				authorization: session
			};
		}

		const response = await fetch(`${API_URL}/blog/${params.slug}/like`, options);

		const json: MessageResponse = await response.json();

		if (!response.ok) {
			if (json.error) {
				return { error: json.error };
			}
		}
		return { message: json.message ? 'Glad you liked it!' : 'Oh! What changed your mind?' };
	},
	comment: async ({ cookies, params, request }) => {
		const data = await request.formData();
		const session = String(cookies.get('session'));
		let options: RequestInit = {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		if (session !== 'undefined') {
			options.headers = {
				...options.headers,
				authorization: session
			};
		} else {
			return { error: 'Please log in to comment on this post' };
		}

		if (data.get('content') && data.get('parent_id')) {
			options.body = JSON.stringify({
				content: data.get('content'),
				is_reply: true,
				parent_id: data.get('parent_id')
			});
		} else if (data.get('content') && !data.get('parent_id')) {
			options.body = JSON.stringify({
				content: data.get('content'),
				is_reply: false
			});
		} else {
			return { error: 'Cannot post empty comments' };
		}

		const response = await fetch(`${API_URL}/blog/${params.slug}/comment`, options);
		const json: CommentResponse = await response.json();

		if (!response.ok) {
			if (json.error) {
				return { error: json.error };
			}
		}
		return { message: 'Your comment has been added!' };
	},
	delete_comment: async ({ cookies, params, request }) => {
		const data = await request.formData();
		const session = String(cookies.get('session'));
		let options: RequestInit = {
			method: 'DELETE',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		if (session !== 'undefined') {
			options.headers = {
				...options.headers,
				authorization: session
			};
		} else {
			return { error: 'Please log in to delete this comment' };
		}

		if (!data.get('comment_id')) {
			return { error: 'Cannot delete comment' };
		} else {
			options.body = JSON.stringify({ comment_id: data.get('comment_id') });
		}

		const response = await fetch(`${API_URL}/blog/${params.slug}/comment`, options);

		const json: MessageResponse = await response.json();

		if (!response.ok) {
			if (json.error) {
				return { error: json.error };
			}
		}
		return { message: 'Your comment has been deleted!' };
	}
};
