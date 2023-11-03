import { writeFileSync } from 'fs'
import nunjucks from 'nunjucks'
import path from 'path'
import { Flavor, flavors } from './flavors.js'

const template = 'setup.ts.njk'

function generateSetup(flavor: Flavor, outDir: string = './'): void {
  const rendered = nunjucks.render(template, flavor)
  const filePath = path.resolve(outDir, `${flavor.dir}.ts`)
  writeFileSync(filePath, rendered)
}

export function generateSetups({ outDir }): void {
  for (const flavor of flavors.slice(1)) {
    generateSetup(flavor, outDir)
  }
}
