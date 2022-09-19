import { uselessSwitchCases } from './useless-switch-case/rule';
import { maxConditionLength } from './max-condition-length/rule';

export default {
  rules: {
    'useless-switch-cases': uselessSwitchCases,
    'max-condition-length': maxConditionLength,
  },
};
