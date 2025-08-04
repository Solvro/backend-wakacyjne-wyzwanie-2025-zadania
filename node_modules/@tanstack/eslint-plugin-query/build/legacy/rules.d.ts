import { ESLintUtils } from '@typescript-eslint/utils';
import { ExtraRuleDocs } from './types.js';

declare const rules: Record<string, ESLintUtils.RuleModule<string, ReadonlyArray<unknown>, ExtraRuleDocs, ESLintUtils.RuleListener>>;

export { rules };
