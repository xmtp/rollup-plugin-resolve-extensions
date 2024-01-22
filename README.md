# @xmtp/rollup-plugin-resolve-extensions

🍣 A Rollup plugin to replace imports with resolved extensions.

## Requirements

- Node 18+
- Rollup v2.14.0+
- TypeScript 5+

> **Note**  
> This plugin only works with TypeScript projects at this time and uses the TypeScript resolver.

## Install

```bash
# npm
npm install --save-dev @xmtp/rollup-plugin-resolve-extenions

# pnpm
pnpm install -D @xmtp/rollup-plugin-resolve-extenions

# yarn
yarn add -D @xmtp/rollup-plugin-resolve-extenions
```

## Why?

This plugin replaces file imports based on file extensions. This can be useful when targeting certain environments, like the browser.

### Example

Given the following config and source files, Rollup will replace imports if a file with the specified extensions exists in the same directory as the original import.

**rollup.config.js**

```js
import { resolveExtensions } from "@xmtp/rollup-plugin-resolve-extenions";

export default [
  // node output
  {
    input: "index.js",
    output: {
      file: "node.js",
      format: "es",
    },
  },
  // browser output
  {
    input: "index.js",
    output: {
      file: "browser.js",
      format: "es",
    },
    plugins: [resolveExtensions([".browser"])],
  },
];
```

**uuid.js**

```js
import { webcrypto } from "node:crypto";

export const generateUUID = () => webcrypto.randomUUID();
```

**uuid.browser.js**

```js
export const generateUUID = () => window.crypto.randomUUID();
```

**index.js**

```js
export { generateUUID } from "./uuid";
```

Given the above config and source files, the following files will be generated:

**node.js**

```js
import { webcrypto } from "node:crypto";

const generateUUID = () => webcrypto.randomUUID();

export { generateUUID };
```

**browser.js**

```js
const generateUUID = () => window.crypto.randomUUID();

export { generateUUID };
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
// rollup.config.js
import { resolveExtensions } from "@xmtp/rollup-plugin-resolve-extenions";

export default {
  input: "src/index.ts",
  plugins: [resolveExtensions([".custom"])],
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

## Options

### `compilerOptions`

Type: `CompilerOptions`<br>
Default: `undefined`
Required: `No`

The plugin loads any [`compilerOptions`](http://www.typescriptlang.org/docs/handbook/compiler-options.html) from the `tsconfig.json` file by default. Passing options to the plugin directly overrides those options:

```js
// rollup.config.js
import { resolveExtensions } from "@xmtp/rollup-plugin-resolve-extenions";

export default {
  input: "src/index.ts",
  plugins: [
    resolveExtensions({
      compilerOptions: { lib: ["es5", "es6", "dom"], target: "es5" },
    }),
  ],
};
```

### `extensions`

Type: `string[]`<br>
Default: `undefined`
Required: `Yes`

An array of extensions to resolve.

## Contributing

See our [contribution guide](./CONTRIBUTING.md) to learn more about contributing to this project.
