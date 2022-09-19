import { Rule } from 'eslint';
import type { NodeType, UselessSwitchCaseNode } from '../types';
import { report } from '../helpers/report';

function getEmptyCasesPercent(node: NodeType<UselessSwitchCaseNode>): number {
  const { cases } = node;

  const emptyCases = cases.filter(
    (item) => item.consequent.length === 0,
  ).length;

  if (emptyCases === 0) {
    return 0;
  }

  const emptyCasesPercent = Math.round((emptyCases / cases.length) * 100);

  return emptyCasesPercent;
}

function checkStatement(
  context: Rule.RuleContext,
  node: NodeType<UselessSwitchCaseNode>,
) {
  const threshold = context.options[0]?.threshold ?? 50;

  const percent = getEmptyCasesPercent(node);

  const isValid = percent <= threshold;

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
    docs: {
      description:
        'Avoid useless switch cases. You can replace it by if/else or maps',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          threshold: {
            type: 'number',
            default: 50,
          },
        },
      },
    ],
  },
  create: setupRule,
};

export { rule };
