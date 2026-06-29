import fs from 'fs';

let content = fs.readFileSync('src/components/Landing.tsx', 'utf-8');

// Colors
content = content.replace(/bg-\[\#FAFAF9\]/g, 'bg-surface-canvas');
content = content.replace(/text-\[\#0B0F14\]/g, 'text-text-primary');

content = content.replace(/bg-white/g, 'bg-surface-card');

content = content.replace(/text-slate-900/g, 'text-text-primary');
content = content.replace(/text-slate-700/g, 'text-text-secondary');
content = content.replace(/text-slate-600/g, 'text-text-secondary');
content = content.replace(/text-slate-500/g, 'text-text-secondary');
content = content.replace(/text-slate-400/g, 'text-text-subtle');
content = content.replace(/text-slate-300/g, 'text-text-subtle');

content = content.replace(/bg-slate-50/g, 'bg-surface-muted');
content = content.replace(/bg-slate-100/g, 'bg-surface-muted');
content = content.replace(/bg-slate-200/g, 'bg-surface-muted');

content = content.replace(/border-slate-50/g, 'border-border-subtle');
content = content.replace(/border-slate-100/g, 'border-border-subtle');
content = content.replace(/border-slate-200/g, 'border-border-default');

content = content.replace(/shadow-slate-200\/50/g, 'shadow-sm');
content = content.replace(/shadow-slate-200\/30/g, 'shadow-sm');

// Focus rings
content = content.replace(/ring-offset-\[\#FAFAF9\]/g, 'ring-offset-surface-canvas');
content = content.replace(/ring-slate-400/g, 'ring-text-subtle');

// Specifics
content = content.replace(/border-\[\#FAFAF9\]/g, 'border-surface-canvas');

fs.writeFileSync('src/components/Landing.tsx', content);
console.log('Fixed Landing.tsx');
