import { writeFileSync } from 'fs'
import nunjucks from 'nunjucks'
import path from 'path'
import { Flavor, flavors } from './flavors.js'

const template = 'getting-started.md.njk'
const baseUrl = 'https://abichinger.github.io/vue-js-cron'

function generateGuide(flavor: Flavor, outDir: string = './'): void {
  const rendered = nunjucks.render(template, { flavor, flavors, baseUrl })
  const filePath = path.resolve(outDir, `getting-started-${flavor.dir}.md`)
  writeFileSync(filePath, rendered)
}

export function generateGuides({ outDir }): void {
  for (const flavor of flavors) {
    generateGuide(flavor, outDir)
  }
}
