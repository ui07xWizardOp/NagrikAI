import fs from 'fs';

let content = fs.readFileSync('src/components/Landing.tsx', 'utf-8');

// Fix focus-visible:ring-offset-indigo-50/50
content = content.replace(/focus-visible:ring-offset-indigo-50\/50/g, 'focus-visible:ring-offset-surface-canvas');

content = content.replace(/from-indigo-500/g, 'from-accent');
content = content.replace(/to-violet-500/g, 'to-accent-hover');
content = content.replace(/to-violet-600/g, 'to-accent-hover');
content = content.replace(/via-violet-500/g, 'via-accent/80');

fs.writeFileSync('src/components/Landing.tsx', content);
console.log('Fixed Landing.tsx minor errors');
