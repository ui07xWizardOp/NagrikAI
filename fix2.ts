import fs from 'fs';

let content = fs.readFileSync('src/components/Landing.tsx', 'utf-8');

// More replacements
content = content.replace(/divide-slate-100/g, 'divide-border-subtle');

content = content.replace(/bg-indigo-50/g, 'bg-accent/10');
content = content.replace(/text-indigo-500/g, 'text-accent');
content = content.replace(/text-indigo-600/g, 'text-accent');
content = content.replace(/text-indigo-700/g, 'text-accent-hover');
content = content.replace(/border-indigo-100/g, 'border-accent/20');
content = content.replace(/border-indigo-200/g, 'border-accent/30');
content = content.replace(/border-indigo-400/g, 'border-accent/50');
content = content.replace(/bg-indigo-100/g, 'bg-accent/20');
content = content.replace(/bg-indigo-200/g, 'bg-accent/30');
content = content.replace(/bg-indigo-300\/10/g, 'bg-accent/10');
content = content.replace(/bg-indigo-400\/10/g, 'bg-accent/10');
content = content.replace(/bg-indigo-500\/10/g, 'bg-accent/10');
content = content.replace(/bg-indigo-500\/20/g, 'bg-accent/20');

content = content.replace(/shadow-indigo-100\/50/g, 'shadow-accent/20');
content = content.replace(/shadow-indigo-100\/30/g, 'shadow-accent/10');
content = content.replace(/shadow-indigo-200\/50/g, 'shadow-accent/30');
content = content.replace(/shadow-indigo-500\/25/g, 'shadow-accent/20');

content = content.replace(/ring-indigo-500/g, 'ring-accent');

// Other specific text colors in the map area and the agents area that need to adapt to dark mode
content = content.replace(/text-purple-600/g, 'text-accent');
content = content.replace(/bg-purple-50/g, 'bg-accent/10');
content = content.replace(/bg-purple-100/g, 'bg-accent/20');
content = content.replace(/border-purple-100/g, 'border-accent/20');

content = content.replace(/text-emerald-600/g, 'text-success');
content = content.replace(/text-emerald-500/g, 'text-success');
content = content.replace(/bg-emerald-50/g, 'bg-success/10');
content = content.replace(/bg-emerald-100/g, 'bg-success/20');
content = content.replace(/bg-emerald-400/g, 'bg-success');
content = content.replace(/border-emerald-100/g, 'border-success/20');

content = content.replace(/text-blue-600/g, 'text-info');
content = content.replace(/bg-blue-50/g, 'bg-info/10');
content = content.replace(/bg-blue-100/g, 'bg-info/20');
content = content.replace(/border-blue-100/g, 'border-info/20');

content = content.replace(/text-orange-600/g, 'text-warning');
content = content.replace(/bg-orange-50/g, 'bg-warning/10');
content = content.replace(/bg-orange-100/g, 'bg-warning/20');
content = content.replace(/border-orange-100/g, 'border-warning/20');

content = content.replace(/text-red-600/g, 'text-danger');
content = content.replace(/bg-red-50/g, 'bg-danger/10');
content = content.replace(/bg-red-100/g, 'bg-danger/20');

content = content.replace(/text-violet-600/g, 'text-accent');
content = content.replace(/bg-violet-100/g, 'bg-accent/20');

fs.writeFileSync('src/components/Landing.tsx', content);
console.log('Fixed Landing.tsx specific colors');
