import { existsSync, mkdirSync, writeFileSync } from 'fs';
import nunjucks from 'nunjucks';
import path from 'path';
import { flavors } from './flavors.js';
const template = 'main.ts.njk';
const indexTemplate = 'index.html.njk';
function generateMain(flavor, outDir = './') {
    const rendered = nunjucks.render(template, flavor);
    const filePath = path.resolve(outDir, 'src', `${flavor.dir}-main.ts`);
    writeFileSync(filePath, rendered);
}
function generateIndex(flavor, outDir = './') {
    const rendered = nunjucks.render(indexTemplate, flavor);
    const dir = path.resolve(outDir, flavor.dir);
    if (!existsSync(dir)) {
        mkdirSync(dir);
    }
    const filePath = path.resolve(outDir, flavor.dir, 'index.html');
    writeFileSync(filePath, rendered);
}
export function generateSetups({ outDir }) {
    for (const flavor of flavors.slice(1)) {
        generateMain(flavor, outDir);
        generateIndex(flavor, outDir);
    }
}
//# sourceMappingURL=demo.js.map