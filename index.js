/**
 * Checks if variable is an object
 *
 * @param {any} obj
 * @returns {boolean}
 */
function isObj(obj) {
  return obj === Object(obj) && !Array.isArray(obj)
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
 * @param {object} investigated
 * @param {array} res
 * @param {array} path
 * @returns {array}
 */
function seekDiffs(iterated, investigated, res, path) {
  Object.keys(iterated).forEach((key) => {
    const propPath = path.concat(key)
    if (!isObj(iterated[key])) {
      if (!deepValue(investigated, propPath)) res.push(propPath)
    } else {
      return seekDiffs(iterated[key], investigated, res, propPath)
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
 * @returns {array}
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
