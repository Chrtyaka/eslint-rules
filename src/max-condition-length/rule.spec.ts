import { RuleTester } from 'eslint';

import { rule } from './rule';

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2022 } });

tester.run('max-condition-length -- IfStatement', rule, {
  valid: [{ code: `if(this.logic1 || this.logic2) {}` }],
  invalid: [
    {
      code: `if(this.logic1 || this.logic2 || this.logic3 || this.logic4) {}`,
      errors: [
        {
          message: 'Avoid multiple logical expression in IfStatement',
        },
      ],
    },
  ],
});

tester.run('max-condition-length -- ReturnStatement', rule, {
  valid: [
    {
      code: `function someFunction() {
              return(this.logic1 || this.logic2)
            }`,
    },
  ],
  invalid: [
    {
      code: `function someFunction() {
              return(this.logic1 || this.logic2 || this.logic3 || this.logic4)
            }`,
      errors: [
        {
          message: 'Avoid multiple logical expression in ReturnStatement',
        },
      ],
    },
  ],
});


tester.run('max-condition-length -- ReturnStatement', rule, {
  valid: [
    {
      code: `function someFunction() {
              return(this.logic1 || this.logic2 || this.logic4)
            }`,
    },
  ],
  invalid: [
    {
      code: `function someFunction() {
              return(this.logic1 || this.logic2 || this.logic4 || this.logic5 || this.logic6)
            }`,
      errors: [
        {
          message: 'Avoid multiple logical expression in ReturnStatement',
        },
      ],
    },
  ],
});