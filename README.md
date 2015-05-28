# mat-less

[![npm version](https://badge.fury.io/js/mat-less.svg)](http://badge.fury.io/js/mat-less)

## Installation

```sh
npm install --save-dev mat-less
```

## Usage

```javascript
var mat  = require('mat')
var less = require('mat-less')
var rewrite = require('mat-rewrite')

mat.task('less', function () {
  mat.url([/\.css/])
    .use(rewrite([
      [/\.css/g, '.less']
    ]))
    .use(less())
})
```