import { RuleTester } from 'eslint';

import { rule } from './rule';
import { MESSAGES } from '../constants/report-messages';

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2022 } });

const validCode = `
function switchCase(){
  switch (locale) {
    case 'ru':
      return ru;
    case 'zh':
      return locale;
    default:
      return 'en';
  }
}
`;

const invalidCode = `
function switchCase(){
  switch (locale) {
    case 'ru':
    case 'en':
    case 'fr':
    case 'et':
    case 'pl':
    case 'kk':
    case 'uk':
    case 'ka':
    case 'hy':
    case 'uz':
    case 'mn':
    case 'az':
    case 'ro':
    case 'tr':
    case 'zh':
      return locale;
    default:
      return 'en';
  }
}
`;

const validCodeWithThreshold = `
function switchCase(){
  switch (locale) {
    case 'uk':
    case 'ka':
    case 'hy':
    case 'uz':
    case 'mn':
    case 'az':
    case 'ro':
    case 'tr':
      return ru
    case 'zh':
      return locale;
    default:
      return 'en';
  }
}
`;

tester.run('useless switch cases', rule, {
  valid: [validCode],
  invalid: [
    {
      code: invalidCode,
      errors: [
        {
          message: MESSAGES.SwitchStatement,
        },
      ],
    },
  ],
});

tester.run('useless switch cases with threshold', rule, {
  valid: [
    {
      code: validCodeWithThreshold,
      options: [{ threshold: 70 }],
    },
  ],
  invalid: [
    {
      code: invalidCode,
      errors: [
        {
          message: MESSAGES.SwitchStatement,
        },
      ],
      options: [{ threshold: 70 }],
    },
  ],
});
