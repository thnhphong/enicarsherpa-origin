import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const TIMELINE_DIR = './public/images/Timeline';
const QUALITY = 80;
const RESIZE_WIDTH = 1920;

async function* walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkDir(fullPath);
    } else if (entry.isFile() && /\.(jpg|jpeg|png)$/i.test(entry.name)) {
      yield fullPath;
    }
  }
}

async function convertImage(inputPath) {
  const ext = inputPath.slice(inputPath.lastIndexOf('.'));
  const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  try {
    const inputStat = await stat(inputPath);
    console.log(`Converting: ${inputPath} (${(inputStat.size / 1024).toFixed(1)}KB)`);
    
    await sharp(inputPath)
      .resize(RESIZE_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    const outputStat = await stat(outputPath);
    const saved = ((1 - outputStat.size / inputStat.size) * 100).toFixed(1);
    console.log(`  → ${outputPath} (${(outputStat.size / 1024).toFixed(1)}KB, saved ${saved}%)`);
  } catch (err) {
    console.error(`  ✗ Error: ${err.message}`);
  }
}

async function main() {
  console.log(`\n🖼️  Converting images to WebP`);
  console.log(`   Quality: ${QUALITY}%`);
  console.log(`   Max width: ${RESIZE_WIDTH}px`);
  console.log(`   Output: ${TIMELINE_DIR}\n`);

  let count = 0;
  for await (const file of walkDir(TIMELINE_DIR)) {
    await convertImage(file);
    count++;
  }
  
  console.log(`\n✅ Done! Converted ${count} images to WebP`);
  console.log(`   Original .jpg/.png files are kept for backup.`);
}

main().catch(console.error);
