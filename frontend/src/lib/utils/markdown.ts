import { compile } from 'mdsvex';
import type { MdsvexOptions } from 'mdsvex';
// import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import unifiedPlugin from '$lib/utils/unifiedPlugin'
import rehypeSlug from 'rehype-slug'
import remarkCodeblock from './remarkCodeblock'


export async function markdownToHtml(markdown: string) {
    // const ast = unified()
    //     .use(remarkParse)
    //     .use(remarkGfm)
    //     .use(remarkRehype)
    //     .use(rehypeSlug)
    //     .use(unifiedPlugin, { tagName: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], className: 'text-blue-500' })
    //     .use(rehypeStringify)
    //     .processSync(markdown).toString()

    // const test = unified()
    //     .use(remarkParse)
    //     .use(remarkCodeblock)
    //     .use(remarkGfm)
    //     .use(remarkRehype)
    //     .use(rehypeStringify)
    //     .processSync(markdown).toString().replaceAll('div', 'CodeBlock')

    // console.log(test.toString())

    const options: MdsvexOptions = {
        smartypants
    }
    const transformed_code = await compile(markdown,);

    return { content: test, toc: [] }
}

