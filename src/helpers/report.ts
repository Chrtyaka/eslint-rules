import { Rule } from 'eslint';
import type { NodeType } from '../types';

const MESSAGES_MAP = {
  IfStatement: 'Avoid multiple logical expression in {{ identifier }}',
  ReturnStatement: 'Avoid multiple logical expression in {{ identifier }}',
  SwitchStatement: 'Useless empty case statements.',
};

export function report(context: Rule.RuleContext, node: NodeType) {
  context.report({
    message: MESSAGES_MAP[node.type],
    node,
    data: {
      identifier: node.type,
    },
  });
}
