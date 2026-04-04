const fs = require('fs');
const files = JSON.parse(fs.readFileSync('items.json', 'utf8'));

const chrono = ['Sherpa Graph', 'Sherpa Aqua Graph', 'Sherpa Supergraph', 'Sherpa Jet Graph'];
const dive = ['Sherpa Dive', 'Sherpa Ultradive', 'Sherpa OPS', 'Sherpa Super Divette', 'Sherpa Super Dive', 'Sherpa Divette', 'Sherpa Star Diver', 'Sea Pearl 600'];
const gmt = ['Sherpa GMT', 'Sherpa Jet', 'Sherpa Guide'];

const products = files.map((f, i) => {
  const parts = f.split('\\\\');
  const collection = parts[0];
  const name = parts[1].split('.')[0];
  let family = 'Other';
  
  if (chrono.includes(collection)) family = 'Chronograph';
  else if (dive.includes(collection)) family = 'Dive';
  else if (gmt.includes(collection)) family = 'GMT';

  return {
    id: 'prod_' + i,
    family,
    collection,
    name: collection + ' ' + name,
    models: [collection],
    timelineIds: [],
    image: '/images/Products/' + f.replace(/\\\\/g, '/'),
    details: 'Stainless Steel Case'
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
}

export const productsData: Product[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('src/data/productsData.ts', tsCode);
