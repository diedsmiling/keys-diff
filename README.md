# keys-diff
[![Build Status][travis-image]][travis-url] [![codecov](https://codecov.io/gh/diedsmiling/keys-diff/branch/master/graph/badge.svg)](https://codecov.io/gh/diedsmiling/keys-diff)


**keys-diff** is a javascript/node.js module that provides a tool for finding the difference between the keys of two objects. 

**NOTE**: This module verifies just the identity of the objects keys, not the whole structure. For full investigation, you can use modules like [deep-diff][deep-diff].
## Install
Using npm:
```bash
$ npm install keys-diff
```
Or using yarn:
```bash
yarn add keys-diff
```
## Usage

```js
import keysDiff from 'keys-diff'
const foo = {
  foo: 'foo',
  bar: {
    baz: 'baz',
    qux: 'qux'
  }
};

const bar = {
  foo: 'foo',
  bar: {
    baz: 'baz',
    quux: 'quux'
  },
  corge: 'corge'
};

keysDiff(foo, bar);
/* => 
[ 
  [ 
    [ 'bar', 'qux' ] 
   ], 
   [ 
     [ 'bar', 'quux' ], 
     [ 'corge' ] 
   ] 
]
*/
```

**NOTE:** Function receives two objects as arguments and returns a multidimensional array. First element of the returned array includes all the keys (in a form of array describing the full path in depth) from the first object that are not included the second object. In its turn, second element of the returned array includes all the keys from the second object that are not included in the first one. 

## Use cases
I needed a similar tool when I came across an issue, where I needed to track the difference between two JSON files with l18n data from different branches. Could also be used to see the difference in API response structure, schemas and so on.

[travis-image]: https://travis-ci.org/diedsmiling/keys-diff.svg?branch=master
[travis-url]: https://travis-ci.org/diedsmiling/keys-diff
[deep-diff]: https://github.com/flitbit/diff
