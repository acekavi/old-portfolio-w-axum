import type { Code, Literal } from 'mdast';
import type { MdastRoot } from 'remark-rehype/lib';
import type { Node } from 'unist';
import type { Element, Comment, DocType } from 'hast'
import { visit } from 'unist-util-visit';

interface UnifiedPluginOptions {
    tagName: string[];
    className: string;
}

interface CodeblockNode {
    type: string;
    value: string;
    lang: string | null;
    meta: string | null;
    data: {
        hProperties: {
            code: string;
            language: string;
        };
    };
}

function remarkCodeblock(options?: UnifiedPluginOptions) {
    return function transformer(tree: Element) {
        visit(tree, 'code', (node: Code) => {
            // console.log(node);
            // const codeblockNode: CodeblockNode = {
            //     type: 'element',
            //     tagName: 'Codeblock',
            //     value: node.value.toString(),
            //     lang: node.lang ? node.lang : 'text',
            //     meta: node.meta ? node.meta : null,
            //     data: {
            //         hProperties: {
            //             code: node.value.toString(),
            //             language: node.lang ? node.lang : 'text',
            //         },
            //     },
            // };

            node.type = 'element';
            node.tagName = 'Codeblock';
            // node.children = [codeblockNode];
            node.lang = node.lang ? node.lang : 'text';
            node.meta = node.meta ? node.meta : null;
            node.data = {
                hProperties: {
                    code: node.value.toString(),
                    language: node.lang,
                }
            }
            node.value = '';
        });
    };
}

export default remarkCodeblock;