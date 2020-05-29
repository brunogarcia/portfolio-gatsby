---
template: BlogPost
path: /migrate-from-es6-to-typescript
date: 2020-05-29T17:12:36.571Z
title: Migrate a project from ES6 to Typescript
metaDescription:  Migrate a project from ES6 to Typescript
type: blog
---

I few days ago I started a migration of a project from ES6 to Typescript.

The main job is doing by a few configuration files:

## tsconfig.json

* The most important file.
* This one tell to the Typescript compiler `tsc` in what way and which files need to compile.

## webpack.config.js

* The Webpack configuration only has one plugin: <a href="https://github.com/TypeStrong/ts-loader">ts-loader</a>
  * This plugin apply the configuration of `tsconfig.json` and execute the Typescript compiler.
* This task will be called later by the build and the dev scripts (both of them stored on package.json)
* So, for resuming:
  * ts-loader will compile all the `.js` and `.ts` files (from the path src) to ES215 format (this project doesn’t need Babel anymore!)
  * And then put the result into:
    ```shell
      public/index.js
      public/index.js.map
      public/types.d.ts
      ...
    ```
  * `index.js` is the file that any app that use the library will consume.

## .eslintrc

* The ESLint configuration, for maintain a codebase free of syntax errors and also for follow a common style guide.
* We apply these plugins to the Javascript files:
  * `eslint:recomended`
  * `jsdoc/recomended`
* And these plugins to the Typescript files:
  * `eslint:recomended`
  * `jsdoc/recomended`
  * `@typescript-eslint/eslint-recommended`

## .eslintignore

* The ESLint ignore configuration
* You can tell ESLint to ignore specific files and directories.
* In this case we ignore node_modules and public folders.

## package.json

* Here you can find all the scripts of the app (and also the dependencies and more metadata of the app)
* In this scenario, we need to check out these scripts. 
  * `"build": "webpack --mode=production"`
    * This script builds the app for the production environment.
    * This script will be called later by Gitlab for deploy the app to production (configuration stored on `.gitlab-ci.yml`)
  * `"dev": "webpack --mode=development --watch"`
    * This script builds the app for the development environment.
  * `lint:js` and `lint:ts `
    * Both scripts read the `.eslintrc` file and apply the configuration.
    * Both scripts will be called later by Gitlab for testing the app before deploy it to production (configuration stored on `.gitlab-ci.ym`l)

## test:unit

* This script compile the library before call Jest.
* This is because, all the unit tests only validate the compiled version of the library.