import { compile } from 'mdsvex';
import type { MdsvexOptions } from 'mdsvex';
// import { unified } from 'unified'
import remarkGfm from 'remark-gfm'
import rehypeExternalLinks from 'rehype-external-links';
import remarkGithub from 'remark-github/lib';
import { escapeSvelte } from 'mdsvex'
import shiki from 'shiki';

export async function markdownToHtml(markdown: string) {
    const options: MdsvexOptions = {
        smartypants: {
            dashes: 'oldschool',
            backticks: true,
            ellipses: true,
            quotes: true,
        },
        highlight: {
            highlighter: async (code, lang) => {
                lang = lang || 'text';
                const html = await shiki.getHighlighter({ themes: ['material-theme-darker', 'github-dark'] })
                    .then(highlighter => highlighter.codeToHtml(code, { lang }));
                let escapedHtml = escapeSvelte(html);
                escapedHtml = escapedHtml.replaceAll('background-color: #212121', '');
                const language = lang;
                const codeWithHeader = `
                <div class="variant-ghost-primary rounded-md lg:w-3/6">
                    <header
                        class="tracking-widest text-sm uppercase flex justify-between items-center my-auto px-4"
                    >
                        <span class="codeblock-language font-monospace">${language}</span>
                        <button class="btn btn-sm variant-soft-surface my-1" onclick="copyCode(this)">Copy</button>
                    </header>
                    ${escapedHtml}
                </div>`;

                return codeWithHeader;
            },
        },
        // @ts-ignore - this is a valid remark plugin
        remarkPlugins: [remarkGfm, remarkGithub],
        rehypePlugins: [
            // @ts-ignore - this is a valid remark plugin
            [rehypeExternalLinks, { rel: ['nofollow'], target: ['_blank'] }],
        ]
    }

    const transformed_code = await compile(markdown, options);

    return { content: transformed_code?.code, toc: [] }
}