import test from 'ava' // eslint-disable-line
import keysDiff from '../index'

test('Should throw error if null is passed as argument', t => {
  const errorMsg = 'Both arguments should be objects!'
  t.throws(
    () => {
      keysDiff(null, null)
    },
    errorMsg
  )

  t.throws(
    () => {
      keysDiff(null, {})
    },
    errorMsg
  )

  t.throws(
    () => {
      keysDiff({}, null)
    },
    errorMsg
  )
})
