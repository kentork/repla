const fs = require('fs'),
  path = require('path')

module.exports.readRepls = root => {
  return new Promise((resolve, reject) => {
    let repls = []

    fs
      .readdirSync(root)
      .filter(file => fs.statSync(path.join(root, file)).isDirectory())
      .forEach(repl => {
        const data = fs.readFileSync(path.join(root, repl, 'repl.json'), 'utf-8')
        const json = JSON.parse(data)

        repls.push({
          id: repl,
          name: json.name,
          aceCode: json.aceCode
        })

        resolve(repls)
      })
  })
}

module.exports.readTemplate = repl => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(`./repls/${repl}/template.txt`), 'utf-8', (err, data) => {
      resolve(data)
    })
  })
}
module.exports.getRepl = repl => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(`./repls/${repl}/repl.json`), 'utf-8', (err, data) => {
      resolve(JSON.parse(data))
    })
  })
}
