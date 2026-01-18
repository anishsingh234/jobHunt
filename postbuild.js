// postbuild.js for Prisma on Vercel
const { execSync } = require('child_process');

try {
  execSync('npx prisma generate', { stdio: 'inherit' });
} catch (e) {
  console.error('Prisma generate failed:', e);
  process.exit(1);
}
