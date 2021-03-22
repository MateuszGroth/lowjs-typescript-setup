# Lowjs with typescript setup

## Setup

Install required packages

```shell
    npm install
```

Create .env file and define 'PORT'

```shell
PORT = 8080
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

## Lowjs Environment using Docker

To create docker container with lowjs installed, execute following commands:

```shell
    docker run --name lowjs -p 127.0.0.1:80:8080/tcp -it ubuntu
    $  apt update
    $  apt install -y curl git make g++ automake autoconf libtool cmake python2 nano
    $  curl https://bootstrap.pypa.io/pip/2.7/get-pip.py --output get-pip.py
    $  python2 get-pip.py
    $  pip install pyyaml
    $  apt install -y python
    $  curl -sL https://deb.nodesource.com/setup_14.x | bash
    $  apt install -y nodejs
    $  git clone --recurse-submodules https://github.com/neonious/lowjs
    $  cd lowjs
    $  make
```

Lowjs will be installend under /lowjs/bin/low
