import { rules } from './rules.cjs';
import { ESLint, Linter } from 'eslint';
import { RuleModule } from '@typescript-eslint/utils/ts-eslint';
import '@typescript-eslint/utils';
import './types.cjs';

type RuleKey = keyof typeof rules;
interface Plugin extends Omit<ESLint.Plugin, 'rules'> {
    rules: Record<RuleKey, RuleModule<any, any, any>>;
    configs: {
        recommended: ESLint.ConfigData;
        'flat/recommended': Array<Linter.Config>;
    };
}
declare const plugin: Plugin;

export { type Plugin, plugin as default, plugin };
