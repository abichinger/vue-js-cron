import { writeFileSync } from 'fs'
import nunjucks from 'nunjucks'
import path from 'path'
import { Flavor, flavors } from './flavors.js'

const template = 'README.md.njk'
const baseUrl = 'https://abichinger.github.io/vue-js-cron'

function generateReadme(flavor: Flavor, outDir: string = './'): void {
  const rendered = nunjucks.render(template, { baseUrl, flavor, flavors })
  const filePath = path.resolve(outDir, flavor.dir, 'README.md')
  writeFileSync(filePath, rendered)
}

export function generateReadmes({ outDir }): void {
  for (const flavor of flavors) {
    generateReadme(flavor, outDir)
  }
}
