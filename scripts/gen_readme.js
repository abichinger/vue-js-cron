const nunjucks = require('nunjucks')
const fs = require('fs')

const packages = [
  { name: 'Core', dir: 'core', anchor: 'renderless' },
  { name: 'Light', dir: 'light' },
  { name: 'Vuetify', dir: 'vuetify' },
  { name: 'Element Plus', dir: 'element-plus' },
  { name: 'Ant', dir: 'ant' },
  { name: 'Quasar', dir: 'quasar' },
]
packages.forEach((p) => {
  p.json = readPackageJson(p.dir)
  p.anchor = p.anchor || p.dir
})

function readPackageJson(path) {
  const content = fs.readFileSync(path + '/package.json')
  return JSON.parse(content)
}

for (const entry of packages) {
  const rendered = nunjucks.render('./scripts/template/README.md', { entry, packages })
  fs.writeFileSync(entry.dir + '/README.md', rendered)
}
