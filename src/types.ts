import { Rule } from 'eslint';
import * as EStree from 'estree';

type MaxConditionNode = EStree.ReturnStatement | EStree.IfStatement;
type UselessSwitchCaseNode = EStree.SwitchStatement;

export type NodeType = (MaxConditionNode | UselessSwitchCaseNode) &
  Rule.NodeParentExtension;
