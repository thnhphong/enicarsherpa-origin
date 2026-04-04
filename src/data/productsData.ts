export interface Product {
  id: string;
  collection: 'LAND' | 'RACING' | 'DIVING';
  name: string;
  models: string[];
  timelineIds: number[];
}

export const productsData: Product[] = [
  {
    id: 'land',
    collection: 'LAND',
    name: 'The Guide',
    models: ['Sherpa Guide'],
    timelineIds: [2, 6, 14, 23],
  },
  {
    id: 'racing',
    collection: 'RACING',
    name: 'The Graph',
    models: ['Sherpa Graph'],
    timelineIds: [3, 12, 16, 21],
  },
  {
    id: 'dive',
    collection: 'DIVING',
    name: 'The Dive',
    models: ['Sherpa OPS', 'Sherpa Dive', 'Aquagraph'],
    timelineIds: [1, 5, 9, 19],
  },
];
