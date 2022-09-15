import { Rule } from 'eslint';
import * as EStree from 'estree';

type LogicalExpressionNode = EStree.LogicalExpression;

type NodeType = (EStree.ReturnStatement | EStree.IfStatement) &
  Rule.NodeParentExtension;

function getAllLogicalExpressionCount(node: LogicalExpressionNode): number {
  let expressionCount = 0;

  let hasLeft = true;
  let currentNode: LogicalExpressionNode = node;

  while (hasLeft) {
    if (currentNode.left.type === 'LogicalExpression') {
      currentNode = currentNode.left;
      expressionCount++;
    } else {
      hasLeft = false;
    }
  }

  return expressionCount + 1;
}

function checkConditionCount(node: NodeType): boolean {
  let expressions: number = 0;

  if (node.type === 'IfStatement') {
    if (node.test.type === 'LogicalExpression') {
      expressions = getAllLogicalExpressionCount(node.test);
    }
  }

  if (node.type === 'ReturnStatement') {
    if (node.argument?.type === 'LogicalExpression') {
      expressions = getAllLogicalExpressionCount(node.argument);
    }
  }

  return expressions <= 2;
}

function checkStatement(context: Rule.RuleContext, node: NodeType) {
  const isValid = checkConditionCount(node);

  if (!isValid) {
    report(context, node);
  }
}

function report(context: Rule.RuleContext, node: NodeType) {
  context.report({
    message: 'Avoid multiple logical expression in {{ identifier }}',
    node,
    data: {
      identifier: node.type,
    },
  });
}

function setupRule(context: Rule.RuleContext): Rule.RuleListener {
  return {
    ReturnStatement: (node) => checkStatement(context, node),
    IfStatement: (node) => checkStatement(context, node),
  };
}

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
  },
  create: setupRule,
};

export { rule };
