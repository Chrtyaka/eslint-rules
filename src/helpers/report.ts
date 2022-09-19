import { Rule } from 'eslint';
import type { NodeType } from '../types';

export function report(context: Rule.RuleContext, node: NodeType) {
  context.report({
    message: 'Avoid multiple logical expression in {{ identifier }}',
    node,
    data: {
      identifier: node.type,
    },
  });
}
