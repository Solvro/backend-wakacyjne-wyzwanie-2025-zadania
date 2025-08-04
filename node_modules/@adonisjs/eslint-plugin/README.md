# @adonisjs/eslint-plugin

> Compatible with ESLint>=9.0 and TypeScript >=5.4

<hr>
<br />

<div align="center">
  <h3>ESLint plugin for AdonisJS applications</h3>
  <p>
    The plugin forces your application to use lazy imports for controllers and event listeners. <strong>Lazy imports are a must when you are using HMR mode in AdonisJS</strong>.
  </p>
</div>

<br />

<div align="center">

[![gh-workflow-image]][gh-workflow-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

</div>

## Installation

The package comes pre-configured with the [@adonisjs/eslint-config](https://github.com/adonisjs/eslint-config) preset and hence manual installation is not required.

However, you can install and configure it as follows.

```sh
npm i -D @adonisjs/eslint-plugin@beta

# Install peer dependencies
npm i -D eslint@9 typescript typescript-eslint
```

## Usage

After installation, you can register the following as follows. Make sure to also setup the `typescript-eslint` parser in order for the rules to work.

```ts
// eslint.config.js
import adonisJSPlugin from '@adonisjs/eslint-plugin'

export default [
  {
    plugins: {
      '@adonisjs': adonisJSPlugin,
    },
    rules: {
      '@adonisjs/prefer-lazy-controller-import': 'error',
      '@adonisjs/prefer-lazy-listener-import': 'error',
    },
  },
]
```

## `prefer-lazy-controller-import`

> [!IMPORTANT]
> The HMR mode of AdonisJS only works with Lazy loaded controllers

The `@adonisjs/prefer-lazy-controller-import` rule complains when you import a controller using the import expression and assign it to a route. For example:

```ts
import router from '@adonisjs/core/services/router'
// ❌ Error: Replace standard import with lazy controller import
import UsersController from '#controllers/user_controller'

router.get('users', [UsersController, 'index'])
```

The rule is auto fixable, therefore you can apply the fix depending upon the shortcuts provided by your
code editor.

```ts
import router from '@adonisjs/core/services/router'
// ✅ Fixed
const UsersController = () => import('#controllers/user_controller')

router.get('users', [UsersController, 'index'])
```

## `prefer-lazy-listener-import`

> [!IMPORTANT]
> The HMR mode of AdonisJS only works with Lazy loaded event listeners

The `@adonisjs/prefer-lazy-listener-import` rule complains when you import an event listener using the import expression and assign it to an event. For example:

```ts
import emitter from '@adonisjs/core/services/emitter'
// ❌ Error: Replace standard import with lazy controller import
import SendVerificationEmail from '#listeners/send_verification_email'

emitter.on('user:created', [SendVerificationEmail, 'handle'])
```

The rule is auto fixable, therefore you can apply the fix depending upon the shortcuts provided by your
code editor.

```ts
import emitter from '@adonisjs/core/services/emitter'
// ✅ Fixed
const SendVerificationEmail = () => import('#listeners/send_verification_email')

emitter.on('user:created', [SendVerificationEmail, 'handle'])
```

<div align="center">
  <sub>Built with ❤︎ by <a href="https://github.com/Julien-R44">Julien Ripouteau</a> and <a href="https://github.com/thetutlage">Harminder Virk</a>
</div>

[gh-workflow-image]: https://img.shields.io/github/actions/workflow/status/adonisjs/eslint-plugin-adonisjs/checks.yml?style=for-the-badge
[gh-workflow-url]: https://github.com/adonisjs/eslint-plugin-adonisjs/actions/workflows/checks.yml 'Github action'
[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]: "typescript"
[npm-image]: https://img.shields.io/npm/v/@adonisjs/eslint-plugin/latest.svg?style=for-the-badge&logo=npm
[npm-url]: https://www.npmjs.com/package/@adonisjs/eslint-plugin/v/latest 'npm'
[license-url]: LICENSE.md
[license-image]: https://img.shields.io/github/license/adonisjs/eslint-plugin-adonisjs?style=for-the-badge
