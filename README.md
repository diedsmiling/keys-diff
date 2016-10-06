# keys-diff
Finds difference between the kyes of two objects. 
## Install
```bash
$ npm install keys-diff
```

##Usage

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

**NOTE:** The function receives two objects as the arguments and returns a multidimensional array. The first item of the returned array includes all the keys (in a form of array describing the full path in depth), from the first object, that are not included the second object. In its turn, the second item of the returned array includes all the keys from the second object that are not included in the first one. 

##Use cases
I needed a similar tool when I came across an issue, where I needed to track the difference between two JSON files with l18n data from different branches, and later merge. Could also be used to see the difference in API response structure, schemas and so on.
