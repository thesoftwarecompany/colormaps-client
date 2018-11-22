# Colormaps

> A package for the [colormaps.io](https://colormaps.io) API.

[![CircleCI](https://circleci.com/gh/thesoftwarecompany/colormaps-client/tree/master.svg?style=svg&circle-token=ae40561a9bca04ea294850cf4245b536e7e521a1)](https://circleci.com/gh/thesoftwarecompany/colormaps-client/tree/master)


# Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Browser Support](#browser-support)
* [Contribute](#contribute)
* [Credits](#credits)


### Installation
----------------
You can install this package from [NPM](https://www.npmjs.com):
```bash
npm add colormaps
```

Or with [Yarn](https://yarnpkg.com/en):
```bash
yarn add colormaps
```

#### CDN
For CDN, you can use [unpkg](https://unpkg.com):

[https://unpkg.com/colormaps/dist/bundles/colormaps.umd.min.js](https://unpkg.com/colormaps/dist/bundles/colormaps.umd.min.js)

The global namespace for colormaps is `colormaps`:
```js
const {names} = colormaps;
const items = await names();
```


### Usage
---------

#### ES6
Get the list of colormap names:
```ts
import {names} from 'colormaps';
const items = await names();
```

Get a colormap by name:
```ts
import {forName} from 'colormaps';
const colormap = await forName('viridis');
// Get it in a different format
const hexColormap = await forName('viridis', 'hex');
```

Get a random colormap:
```ts
import {random} from 'colormaps';
const colormap = await random(2); // Colormap with 2 colors
```

Get a random color:
```ts
import {randomColor} from 'colormaps';
const {color} = await randomColor();
```

Search a colormap by name:
```ts
import {search} from 'colormaps';
const matches = await search({
    name: 'vi'
});
```

Search a colormap by Euclidean distance:
```ts
import {search} from 'colormaps';
const matches = await search({
    color: '#eee',
    format: 'hex',
    distance: 0.1
});
```

#### CommonJS
Get the list of colormap names:
```ts
const {names} = require('colormaps');
const items = await names();
```


### Contribute
--------------
Releases are handled automatically by the CI using [semantic-release](https://github.com/semantic-release/semantic-release).

If you wish to contribute, please use the following guidelines:
* Use [Conventional Commits](https://conventionalcommits.org)
* Use `[ci skip]` in commit messages to skip a build
