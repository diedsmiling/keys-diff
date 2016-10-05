/**
 * Checks if variable is an object
 *
 * @param {any} obj
 * @returns {boolean}
 */
function isObj(obj) {
  return obj === Object(obj)
}

/**
 * Get deep value from the object by passing path
 *
 * @param {object} obj
 * @param {array} path
 * @returns {*}
 */
function deepValue(obj, path) {
  let clonedObj = obj
  path.every((val) => {
    clonedObj = clonedObj[val]
    return !!clonedObj
  })
  return clonedObj
}

/**
 * Recursive function to detect differences
 *
 * @param {object} iterated
 * @param {object} investegated
 * @param {array} res
 * @param {array} path
 * @returns {*}
 */
function seekDiffs(iterated, investegated, res, path) {
  Object.keys(iterated).forEach((key) => {
    if (!isObj(iterated[key])) {
      const propPath = path.concat(key)
      if (!deepValue(investegated, propPath)) res.push(propPath)
    } else {
      path.push(key)
      return seekDiffs(iterated[key], investegated, res, path)
    }
    return true
  })
  return res
}

/**
 * Seeks keys difference
 *
 * @param firstObj
 * @param secondObj
 * @returns {*[]}
 */
function keysDiff(firstObj, secondObj) {
  if (!isObj(firstObj) || !isObj(secondObj)) {
    throw Error('Both arguments should be objects!')
  }
  return [
    seekDiffs(firstObj, secondObj, [], []),
    seekDiffs(secondObj, firstObj, [], []),
  ]
}

module.exports = keysDiff
