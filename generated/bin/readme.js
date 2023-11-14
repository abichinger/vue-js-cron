import { writeFileSync } from 'fs';
import nunjucks from 'nunjucks';
import path from 'path';
import { flavors } from './flavors.js';
const template = 'README.md.njk';
const baseUrl = 'https://abichinger.github.io/vue-js-cron';
function generateReadme(flavor, outDir = './') {
    const rendered = nunjucks.render(template, { baseUrl, flavor, flavors });
    const filePath = path.resolve(outDir, flavor.dir, 'README.md');
    writeFileSync(filePath, rendered);
}
export function generateReadmes({ outDir }) {
    for (const flavor of flavors) {
        generateReadme(flavor, outDir);
    }
}
//# sourceMappingURL=readme.js.map