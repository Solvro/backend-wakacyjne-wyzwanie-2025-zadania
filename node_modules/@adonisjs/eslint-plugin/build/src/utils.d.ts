import { ESLintUtils } from '@typescript-eslint/utils';
export declare const createEslintRule: <Options extends readonly unknown[], MessageIds extends string>({ meta, name, ...rule }: Readonly<ESLintUtils.RuleWithMetaAndName<Options, MessageIds, {
    description: string;
}>>) => ESLintUtils.RuleModule<MessageIds, Options, {
    description: string;
}, ESLintUtils.RuleListener>;
