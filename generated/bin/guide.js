import { writeFileSync } from 'fs';
import nunjucks from 'nunjucks';
import path from 'path';
import { flavors } from './flavors.js';
const template = 'getting-started.md.njk';
function generateGuide(flavor, outDir = './') {
    const rendered = nunjucks.render(template, { flavor, flavors });
    const filePath = path.resolve(outDir, `getting-started-${flavor.dir}.md`);
    writeFileSync(filePath, rendered);
}
export function generateGuides({ outDir }) {
    for (const flavor of flavors) {
        generateGuide(flavor, outDir);
    }
}
//# sourceMappingURL=guide.js.map