import { Rule } from 'eslint';
import * as EStree from 'estree';

export type MaxConditionNode = EStree.ReturnStatement | EStree.IfStatement;
export type UselessSwitchCaseNode = EStree.SwitchStatement;

export type NodeType< T = MaxConditionNode | UselessSwitchCaseNode > = T &
  Rule.NodeParentExtension;
