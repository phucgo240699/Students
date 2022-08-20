const isNil = (value) => {
  return value == null
  if (typeof(value) === String) {
    return value === ''
  }
  if (typeof(value) === Object) {
    return value === {}
  }
}

module.exports = { isNil }