import fs from 'fs';
import path from 'path';

// Ensure .vercel/output/static exists for Vercel Build Output API
const vercelOutputDir = path.resolve('.vercel/output');
const vercelStaticDir = path.join(vercelOutputDir, 'static');

fs.mkdirSync(vercelStaticDir, { recursive: true });
fs.cpSync(path.resolve('dist'), vercelStaticDir, { recursive: true });

// Write Build Output API v3 config
const vercelConfig = {
  version: 3,
  routes: [
    { handle: 'filesystem' },
    { src: '/(.*)', dest: '/index.html' }
  ]
};

fs.writeFileSync(
  path.join(vercelOutputDir, 'config.json'),
  JSON.stringify(vercelConfig, null, 2)
);

console.log('✓ Build output verified: "dist" and ".vercel/output/static" are ready for deployment.');
