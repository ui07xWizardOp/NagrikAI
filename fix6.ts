import fs from 'fs';

let content = fs.readFileSync('src/components/Landing.tsx', 'utf-8');

content = content.replace(/bg-blue-200\/10/g, 'bg-info/10');
content = content.replace(/to-blue-500/g, 'to-info');

fs.writeFileSync('src/components/Landing.tsx', content);
console.log('Fixed Landing.tsx blue colors');
