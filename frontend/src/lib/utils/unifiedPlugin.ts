import type { Node } from 'unist';
import type { Element, Comment, DocType } from 'hast'
import { visit } from 'unist-util-visit';

interface UnifiedPluginOptions {
  tagName: string[];
  className: string;
}

function unifiedPlugin(options: UnifiedPluginOptions) {
  return function transformer(tree: Element) {
    visit(tree, 'element', (node) => {
      if (options.tagName.includes(node.tagName)) {
        node.properties = {
          ...node.properties,
          className: options.className,
        };
      }
    });
  };
}

export default unifiedPlugin;