import fs from 'fs';
import path from 'path';

const file = path.resolve('node_modules/@astrojs/vercel/dist/serverless/adapter.js');

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the SUPPORTED_NODE_VERSIONS object to include 22 and 24
  const target = `const SUPPORTED_NODE_VERSIONS = {
    18: { status: 'retiring', removal: 'Early 2025', warnDate: new Date('October 1 2024') },
    20: { status: 'default' },
};`;

  const replacement = `const SUPPORTED_NODE_VERSIONS = {
    18: { status: 'retiring', removal: 'Early 2025', warnDate: new Date('October 1 2024') },
    20: { status: 'default' },
    22: { status: 'default' },
    24: { status: 'default' },
};`;

  if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Successfully patched @astrojs/vercel adapter for Node 22/24 support!');
  } else if (content.includes('24:') || content.includes('"24":')) {
    console.log('@astrojs/vercel adapter is already patched.');
  } else {
    console.warn('Could not find the target code to patch in @astrojs/vercel adapter.');
  }
} else {
  console.warn('Vercel adapter file not found at:', file);
}
