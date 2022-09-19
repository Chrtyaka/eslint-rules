import { Rule } from 'eslint';
import type { NodeType, UselessSwitchCaseNode } from '../types';
import { report } from '../helpers/report';

function getEmptyCasesPercent(node: NodeType<UselessSwitchCaseNode>): number {
  const { cases } = node;

  const emptyCases = cases.filter((item) => item.consequent.length).length;

  const emptyCasesPercent = (cases.length / emptyCases) * 100;

  return emptyCasesPercent;
}

function checkStatement(
  context: Rule.RuleContext,
  node: NodeType<UselessSwitchCaseNode>,
) {
  const percent = getEmptyCasesPercent(node);

  const isValid = percent > 50;

  if (!isValid) {
    report(context, node);
  }
}

function setupRule(context: Rule.RuleContext): Rule.RuleListener {
  return {
    SwitchStatement: (node) => checkStatement(context, node),
  };
}

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
  },
  create: setupRule,
};

export { rule };
