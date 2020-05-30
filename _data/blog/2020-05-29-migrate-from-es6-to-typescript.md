---
template: BlogPost
path: /migrate-from-es6-to-typescript
date: 2020-05-29T17:12:36.571Z
title: Migrate a project from ES6 to Typescript
metaDescription:  Migrate a project from ES6 to Typescript
type: blog
---

I few days ago I started a migration of a project from ES6 to Typescript.

The main job is doing by a few configuration files.

***

## tsconfig.json

* The most important file.
* This one tell to the Typescript compiler `tsc` in what way and which files need to compile.

```json
{
  "compilerOptions": {
    "target": "es2015",
    "declaration": true,
    "sourceMap": true,
    "moduleResolution": "node",
    "declarationDir": "./public",
    "allowSyntheticDefaultImports": true,
  },
  "include": [
    "src/**/*"
  ]
}
```

***

## webpack.config.js

* The Webpack configuration only has one plugin: <a href="https://github.com/TypeStrong/ts-loader">ts-loader</a>
* The `ts-loader` plugin apply the configuration of `tsconfig.json` and execute the Typescript compiler.
* This task will be called later by the build and the dev scripts (both of them stored on package.json)
* So, for resuming:
  * `ts-loader` will compile all the `.js` and `.ts` files (from the path `src`) to ES215/UMD format (this project doesn’t need Babel anymore!)
  * And then put the result into the `public` folder:
    ```shell
      public/index.js
      public/index.js.map
      public/types.d.ts
      # and more files...
    ```
  * `index.js` is the file that any app that use the library will consume.

```js
const path = require('path');
const webpack = require('webpack');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './public')
}

module.exports = {
  mode: process.env.mode,
  entry: {
    "index": PATHS.src + "/index.ts"
  },
  output: {
    path: PATHS.dist,
    filename: "index.js",
    libraryTarget: "umd",
    libraryExport: 'default',
    library: 'NAME_OF_THE_LIBRARY',
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader"
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new webpack.IgnorePlugin(/test\.ts$/)
  ]
}
```

***

## .eslintrc

* The ESLint configuration, for maintain a codebase free of syntax errors and also for follow a common style guide.

### Javascript files

We apply these plugins to the Javascript files:
* `eslint:recomended`
* `jsdoc/recomended`

### Typescript files

We apply these plugins to the Typescript files:
* `eslint:recomended`
* `jsdoc/recomended`
* `@typescript-eslint/eslint-recommended`

```js
{
  "root": true,
  "env": {
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:jsdoc/recommended"
  ],
  "parser": "babel-eslint",
  "plugins": [
    "jsdoc"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  // Temporal workaround because this project will has
  // for a while files in format .js and .ts.
  "overrides": [
    {
      "files": [
        "**/*.ts"
      ],
      "env": {
        "es6": true,
        "node": true
      },
      "extends": [
        "eslint:recommended",
        "plugin:jsdoc/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      "parser": "@typescript-eslint/parser",
      "plugins": [
        "jsdoc",
        "@typescript-eslint"
      ]
    }
  ]
}
```

***

## .eslintignore

* The ESLint ignore configuration
* You can tell ESLint to ignore specific files and directories.
* In this case we ignore node_modules and public folders.

```js
node_modules
public
coverage
```

***

## package.json

Here you can find all the scripts of the app and also the dependencies and more metadata of the app.

### Build
* `"build": "webpack --mode=production"`
* This script builds the app for the production environment.
* This script will be called later by Gitlab for deploy the app to production (configuration stored on `.gitlab-ci.yml`)

### Dev
* `"dev": "webpack --mode=development --watch"`
* This script builds the app for the development environment.

### Linters
* `lint:js` and `lint:ts `
* Both scripts read the `.eslintrc` file and apply the configuration.
* Both scripts will be called later by Gitlab for testing the app before deploy it to production (configuration stored on `.gitlab-ci.yml`)

### Unit tests

* `test:unit`
* This script compile the library before call Jest.
* This is because, all the unit tests only validate the compiled version of the library.

```json
{
  "scripts": {
    "prepare": "npm run build",
    "build": "webpack --mode=production",
    "dev": "webpack --mode=development --watch",
    "lint:js": "eslint 'src/**/*.js'",
    "lint:ts": "eslint 'src/**/*.ts'",
    "docs": "esdoc",
    "test:unit": "yarn build && jest --notify --verbose"
  },
}
```

***

## .gitlab-ci.yml

GitLab CI/CD pipelines are configured using a YAML file called <a href="https://docs.gitlab.com/ee/ci/yaml/">.gitlab-ci.yml</a> within each project.

```yml
stages:
  - test
  - deploy

image: node:latest

before_script:
  - curl -o- -L https://yarnpkg.com/install.sh | bash
  - export PATH=${HOME}/.yarn/bin:${PATH}
  
cache:
  paths:
    - node_modules/
  
library test:
  stage: test
  script:
    - yarn
    - yarn test:unit
    - yarn lint:js
    - yarn lint:ts

pages:
  stage: deploy
  script:
    - yarn docs
    - yarn build
  artifacts:
    paths:
    - public
  only:
  - master

```