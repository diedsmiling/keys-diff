import test from 'ava' // eslint-disable-line
import keysDiff from '../index'

const errorMsg = 'Both arguments should be objects!'

function getErrorAssertion(t, err, fn) {
  return function assertError(foo, bar) {
    t.throws(() => { fn(foo, bar) }, err)
  }
}

let assertError

test.beforeEach(t => {
  assertError = getErrorAssertion(t, errorMsg, keysDiff)
})

test('Should throw error if null is passed as argument', () => {
  assertError(null, null)
  assertError(null, {})
  assertError({}, null)
})

test('Should throw error if integer is passed as argument', () => {
  assertError(1, 1)
  assertError(1, {})
  assertError({}, 1)
})

test('Should throw error if string is passed as argument', () => {
  assertError('foo', 'bar')
  assertError('foo', {})
  assertError({}, 'bar')
})

test('Should throw error if array is passed as argument', () => {
  assertError(['foo'], ['bar'])
  assertError(['foo'], {})
  assertError({}, ['bar'])
})

test('Should return empty arrays on empty objects', (t) => {
  t.deepEqual(keysDiff({}, {}), [[], []])
})

test('Should return empty arrays when objects keys are equal', (t) => {
  t.deepEqual(keysDiff({ foo: 'bar' }, { foo: 'baz' }), [[], []])
  const foo = {
    foo: 'foo',
    bar: {
      baz: 'baz',
      quux: 'quux',
    },
    corge: 'corge',
  }

  const bar = {
    foo: 'foo',
    bar: {
      baz: 'baz',
      quux: 'quux',
    },
    corge: 'corge',
  }

  t.deepEqual(keysDiff(foo, bar), [[], []])
})

test('Should return empty arrays when object keys are equal but their order is different', (t) => {
  t.deepEqual(keysDiff({ foo: 'foo', bar: 'bar' }, { bar: 'bar', foo: 'foo' }), [[], []])
})

test('Should find difference in a plain object', (t) => {
  t.deepEqual(keysDiff({ foo: 'foo' }, { bar: 'bar' }), [[['foo']], [['bar']]])
})

test('Should find difference in a nested object', (t) => {
  t.deepEqual(
    keysDiff(
      {
        foo: {
          bar: 'bar',
        },
        baz: 'baz',
        qux: 'qux',
      },
      {
        foo: 'foo',
        bar: 'bar',
        baz: 'baz',
      }
    ),
    [[['foo', 'bar'], ['qux']], [['bar']]]
  )
})

test('should consider keys with empty values', (t) => {
  const a = {
    foo: 'bar',
    baz: 'qux',
  }

  const b = {
    foo: 'bar',
    baz: '',
  }

  t.deepEqual(keysDiff(a, b), [[], []])
})
