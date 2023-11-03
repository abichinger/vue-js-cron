import { writeFileSync } from 'fs';
import nunjucks from 'nunjucks';
import path from 'path';
import { flavors } from './flavors.js';
const template = 'setup.ts.njk';
function generateSetup(flavor, outDir = './') {
    const rendered = nunjucks.render(template, flavor);
    const filePath = path.resolve(outDir, `${flavor.dir}.ts`);
    writeFileSync(filePath, rendered);
}
export function generateSetups({ outDir }) {
    for (const flavor of flavors.slice(1)) {
        generateSetup(flavor, outDir);
    }
}
//# sourceMappingURL=demo.js.map