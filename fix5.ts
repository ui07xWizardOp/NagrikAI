import fs from 'fs';

let content = fs.readFileSync('src/components/Landing.tsx', 'utf-8');

content = content.replace(/pillColor="#6366f1"/g, 'pillColor="var(--accent)"');
content = content.replace(/hoveredPillTextColor="#ffffff"/g, 'hoveredPillTextColor="var(--text-on-accent)"');
content = content.replace(/pillTextColor="#475569"/g, 'pillTextColor="var(--text-primary)"');
content = content.replace(/bg-\[\#F8FAFC\]/g, 'bg-surface-canvas');
content = content.replace(/stroke="#64748b"/g, 'stroke="var(--text-subtle)"');

fs.writeFileSync('src/components/Landing.tsx', content);
console.log('Fixed Landing.tsx hex colors');
