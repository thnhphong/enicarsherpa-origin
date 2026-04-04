const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'src/data/productsData.ts');
let dataContent = fs.readFileSync(dataFile, 'utf-8');

const imageListFile = '/tmp/enicar_product_images.txt';
const imageList = fs.readFileSync(imageListFile, 'utf-8').split('\n').filter(Boolean);

const diskImages = {};
imageList.forEach(p => {
    const mapped = '/' + p.replace(/^public\//, '');
    const dir = path.dirname(mapped);
    const basename = path.basename(mapped, path.extname(mapped));
    const key = path.join(dir, basename).toLowerCase();
    
    diskImages[key] = mapped;
});

let matches = 0;
dataContent = dataContent.replace(/"image":\s*["']([^"']+)["']/g, (match, imagePath) => {
    const decoded = decodeURIComponent(imagePath);
    const dir = path.dirname(decoded);
    const basename = path.basename(decoded, path.extname(decoded));
    const key = path.join(dir, basename).toLowerCase();

    if (diskImages[key]) {
        matches++;
        const exactPath = diskImages[key];
        // encode it to ensure react can fetch it properly but let's just use regular string, Vite can handle unencoded string in src. But wait, in the data file it's better to keep spaces URL encoded or just let the browser handle it.
        // Actually encodeURI() will encode spaces but leave slashes.
        const encodedPath = encodeURI(exactPath).replace(/\+/g, '%2B');
        return `"image": "${encodedPath}"`;
    } else {
        console.log("NOT FOUND on disk:", decoded);
        return match;
    }
});

console.log("Updated", matches, "images");
fs.writeFileSync(dataFile, dataContent);
