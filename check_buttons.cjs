const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

const report = [];

walkDir('src/components', (filePath) => {
    if (filePath.endsWith('.tsx')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Find all button tags, even those spanning multiple lines
        // We'll use a simple parser
        let i = 0;
        while (i < content.length) {
            const btnIdx = content.indexOf('<button', i);
            if (btnIdx === -1) break;
            
            const endIdx = content.indexOf('>', btnIdx);
            if (endIdx === -1) break;
            
            const btnTag = content.substring(btnIdx, endIdx + 1);
            
            if (!btnTag.includes('onClick') && !btnTag.includes('type="submit"') && !btnTag.includes('type="reset"') && !btnTag.includes('disabled')) {
                const lineNo = content.substring(0, btnIdx).split('\n').length;
                report.push(`${filePath}:${lineNo}: ${btnTag.replace(/\s+/g, ' ')}`);
            }
            i = endIdx + 1;
        }
    }
});

console.log("Total missing onClick:", report.length);
console.log(report.join('\n'));
