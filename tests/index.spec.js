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
