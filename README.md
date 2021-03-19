# Lowjs with typescript setup

## Setup

> install required packages

```shell
    npm install
```

## Usage

Server's source code is located in the `src` folder.
File `src/intex.ts` is used as the main entry.

To build the _production_ file (**ES5**, as is required by lowjs), use either one of these commands `npm run build `, ` npm run build:watch`. When option with the `:watch` in the end of the command is used, **production** file is going to be generated on every detected _save_.

Generated file will be located in the `dist` folder and will be named `server.js`.

## Tests

###### A valid test file needs to include `.test.ts` in its name.

To perform all of the tests located under `src` folder, run `npm run test`. The test engine will automatically detect all of the test files and execute them all at once.

## Reducing production node modules

There is an npm package called `modclean` used to reduce node_modules size, by deleting the unused files/folders.

```shell
    npm i --save modclean
```

Add `clean` script to package json, run:

```shell
    npm run clean
```

After the node_modules have been cleaned, uninstall modclean with:

```shell
    npm uninstall modclean
```
