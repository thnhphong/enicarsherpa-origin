import fs from 'fs';

const files = JSON.parse(fs.readFileSync('items.json', 'utf8'));

const chrono = ['Sherpa Graph', 'Sherpa Aqua Graph', 'Sherpa Supergraph', 'Sherpa Jet Graph'];
const dive = ['Sherpa Dive', 'Sherpa Ultradive', 'Sherpa OPS', 'Sherpa Super Divette', 'Sherpa Super Dive', 'Sherpa Divette', 'Sherpa Star Diver', 'Sea Pearl 600'];
const gmt = ['Sherpa GMT', 'Sherpa Jet', 'Sherpa Guide'];

const products = files.map((f, i) => {
  const parts = f.split('\\');
  const collection = parts[0];
  const name = parts[1].split('.')[0];
  let family = 'Other';
  
  if (chrono.includes(collection)) family = 'Chronograph';
  else if (dive.includes(collection)) family = 'Dive';
  else if (gmt.includes(collection)) family = 'GMT';

  let description = 'This luxury vintage watch is a timeless and rare piece, produced to be water-tight. The classic vintage watch is designed with timeless numerals, a subsidiary dial, and finished with the ENICAR logo at its centre.';
  if (family === 'Chronograph') {
    description = 'A masterclass in precision timing, this vintage Enicar chronograph was engineered for professionals. Featuring a robust stainless steel case and a highly legible dial, it remains a sought-after piece for collectors of historic racing and aviation timepieces.';
  } else if (family === 'Dive') {
    description = 'Designed for the depths, this Enicar dive watch features the iconic Super Compressor case technology. Known for exceptional water resistance and distinctive dual crowns, it represents the golden era of underwater exploration.';
  } else if (family === 'GMT') {
    description = 'Built for the jet-setting traveler, this Enicar GMT model allows tracking of multiple time zones simultaneously. Its distinct 24-hour hand and rotating bezel make it an indispensable tool for pilots and global adventurers.';
  }

  return {
    id: 'prod_' + i,
    family,
    collection,
    name: collection + ' ' + name,
    models: [collection],
    timelineIds: [],
    image: '/images/Products/' + f.split('\\').map(encodeURIComponent).join('/'),
    details: 'Stainless Steel Case',
    description,
    reference: collection + ' ' + name,
    caliber: 'N/A'
  };
});

const tsCode = `export interface Product {
  id: string;
  family: string;
  collection: string;
  name: string;
  models: string[];
  timelineIds: number[];
  image: string;
  details: string;
  description: string;
  reference: string;
  caliber: string;
}

export const productsData: Product[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('src/data/productsData.ts', tsCode);
