import fs from 'fs';
import path from 'path';

const dir = 'public/images';
const files = fs.readdirSync(dir);

// Specific known mappings for files with hash prefixes:
const hashPrefixRegex = /^[a-z0-9]{20,}_(.+)$/i;

let copiedCount = 0;
for (const f of files) {
  const match = f.match(hashPrefixRegex);
  if (match) {
    const cleanName = match[1];
    const srcPath = path.join(dir, f);
    const destPath = path.join(dir, cleanName);
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${f} -> ${cleanName}`);
      copiedCount++;
    } else {
      console.log(`Already exists: ${cleanName}`);
    }
  }
}
console.log(`Finished copying ${copiedCount} files.`);

// Now let's audit every single .tsx/.ts file in src/ to verify every /images/... path exists!
function getAllFiles(dirPath, arrayOfFiles = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      arrayOfFiles.push(fullPath);
    }
  }
  return arrayOfFiles;
}

const sourceFiles = getAllFiles('src');
console.log(`\nAuditing ${sourceFiles.length} source files for image references...`);

let missingTotal = 0;
for (const sf of sourceFiles) {
  const content = fs.readFileSync(sf, 'utf8');
  const matches = [...content.matchAll(/['"](\/images\/[^'"]+)['"]/g)].map(m => m[1]);
  const unique = [...new Set(matches)];
  for (const img of unique) {
    const diskPath = path.join('public', img.replace(/^\//, ''));
    if (!fs.existsSync(diskPath)) {
      console.error(`[MISSING in ${sf}]: ${img} -> ${diskPath}`);
      missingTotal++;
    }
  }
}

if (missingTotal === 0) {
  console.log('SUCCESS: All image references in all source files exist on disk!');
} else {
  console.error(`WARNING: ${missingTotal} missing images found!`);
}
