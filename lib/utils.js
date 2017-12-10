module.exports.escape = code => {
  code.replace('\\', '\\\\').replace('"', '\\"')
}
