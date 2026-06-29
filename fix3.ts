import fs from 'fs';

let content = fs.readFileSync('src/components/Landing.tsx', 'utf-8');

// Specifics
content = content.replace(/via-white/g, 'via-surface-card');
content = content.replace(/from-indigo-50\/50/g, 'from-accent/5');
content = content.replace(/to-blue-50\/50/g, 'to-info/5');

content = content.replace(/border-white/g, 'border-surface-canvas');
content = content.replace(/bg-white\/50/g, 'bg-surface-canvas/50');
content = content.replace(/bg-white\/20/g, 'bg-surface-card/20');

// Text white inside colored backgrounds is mostly okay, but we can change it to text-text-on-accent for better matching
content = content.replace(/text-white/g, 'text-text-on-accent');

fs.writeFileSync('src/components/Landing.tsx', content);
console.log('Fixed Landing.tsx remaining hardcoded colors');
