const path = require('path')
const fs = require('fs')

const _root = process.cwd()
function getPath(...args) {
  return path.resolve(_root, ...args)
}

const pkg = 'package.json'
const lcn = 'LICENSE'
const rdm = 'README.md'

const content = fs.readFileSync(
  getPath(pkg),
  { encoding: 'utf-8' }
)

const json = JSON.parse(content)

delete json.repository
delete json.bugs
delete json.homepage
delete json.scripts
delete json.browserlist
delete json.devDependencies

json.files = ['**/*']
json.main = 'index.js'
json.types = 'index.d.ts'

fs.writeFileSync(
  getPath('dist', pkg),
  JSON.stringify(json, null, 2)
)

fs.copyFileSync(getPath(lcn), getPath('dist', lcn))
fs.copyFileSync(getPath(rdm), getPath('dist', rdm))
