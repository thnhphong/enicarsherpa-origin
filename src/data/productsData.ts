export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
}

export const productsData: Product[] = [
  {
    id: 'sherpa-graph',
    name: 'Sherpa Graph',
    tagline: 'The Choice of Champions',
    description: 'A legendary chronograph that powered the golden age of motor racing. Featuring the Valjoux 72 movement and a Robust waterproof case.',
    image: '/assets/sherpa-graph.png',
    features: ['Valjoux 72 Manual Wind', 'Tachymeter Scale', 'Waterproof Compressor Case'],
  },
  {
    id: 'jet-graph',
    name: 'Jet Graph',
    tagline: 'Precision Across Time Zones',
    description: 'The ultimate GMT chronograph for the jet age. Designed for pilots and world travelers who demand accuracy across meridians.',
    image: '/assets/jet-graph.png',
    features: ['GMT Functionality', '24-hour Bezel', 'High-Beat Movement'],
  },
  {
    id: 'aqua-graph',
    name: 'Aqua Graph',
    tagline: 'Master of the Depths',
    description: 'A professional diver chronograph designed to withstand extreme pressure while maintaining absolute timing precision.',
    image: '/assets/aqua-graph.png',
    features: ['Countdown Bezel', 'Deep-Sea Rating', 'Luminous Markers'],
  },
];
