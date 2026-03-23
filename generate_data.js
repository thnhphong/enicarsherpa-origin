import fs from 'fs';

const timeline = JSON.parse(fs.readFileSync('src/Timeline.json', 'utf-8'));
const locationMap = {
  1: [47.1812, 7.3510, "Lengnau", "Switzerland"],
  2: [28.5983, 83.9310, "Himalaya", "Nepal"],
  3: [51.5074, -0.1278, "London", "UK"],
  4: [50.3755, -4.1427, "Plymouth", "UK"],
  5: [12.1696, -68.9900, "Caribbean Sea", "Caribbean"],
  6: [-0.1521, 37.3084, "Mt. Kenya", "Kenya"],
  7: [78.2232, 15.6267, "Spitzbergen", "Norway"],
  8: [-90, 0, "South Pole", "Antarctica"],
  9: [38.8951, -77.0364, "Washington D.C.", "USA"],
  10: [-33.8688, 151.2093, "Sydney", "Australia"],
  11: [47.5596, 7.5886, "Basel", "Switzerland"],
  12: [55.9533, -3.1883, "Scotland", "UK"],
  13: [59.3293, 18.0686, "Stockholm", "Sweden"],
  14: [63.0692, -151.0070, "Mt. McKinley", "USA"],
  15: [47.1812, 7.3510, "Lengnau", "Switzerland"],
  16: [47.4917, 10.9848, "Alps", "Austria"],
  17: [35.6762, 139.6503, "Tokyo", "Japan"],
  18: [47.4582, 8.5555, "Zurich", "Switzerland"],
  19: [-17.6509, -149.4260, "Tahiti", "French Polynesia"],
  20: [47.1812, 7.3510, "Lengnau", "Switzerland"],
  21: [46.8182, 8.2275, "Switzerland", "Switzerland"],
  22: [47.3769, 8.5417, "Zurich", "Switzerland"],
  23: [28.5983, 83.9310, "Tukuche Peak", "Nepal"],
  24: [50.7130, -1.3005, "Solent", "UK"],
  25: [46.5197, 6.6323, "Lausanne", "Switzerland"],
  26: [47.1812, 7.3510, "Lengnau", "Switzerland"]
};

const globeEvents = timeline.map(event => {
  const loc = locationMap[event.id] || [0, 0, "Unknown", "Unknown"];
  return {
    ...event,
    lat: loc[0],
    lng: loc[1],
    location: loc[2],
    country: loc[3],
    products: []
  };
});

const tsContent = `export interface GlobeEvent {
  id: number;
  year: string;
  month?: string;
  title: string;
  location: string;
  country: string;
  lat: number;
  lng: number;
  description: string;
  images: string[];
  products: string[];
}

export const globeEventsData: GlobeEvent[] = ${JSON.stringify(globeEvents, null, 2)};
`;

fs.writeFileSync('src/data/globeEventsData.ts', tsContent);
console.log('Successfully created src/data/globeEventsData.ts');
