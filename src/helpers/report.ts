import { Rule } from 'eslint';
import type { NodeType } from '../types';
import { MESSAGES } from '../constants/report-messages';

export function report(context: Rule.RuleContext, node: NodeType) {
  context.report({
    message: MESSAGES[node.type],
    node,
    data: {
      identifier: node.type,
    },
  });
}
