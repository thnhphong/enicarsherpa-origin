export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
  category: 'History' | 'Product' | 'Achievement';
}

export const timelineData: TimelineEvent[] = [
  {
    year: '1913',
    title: 'The Beginning',
    description: 'Ariste Racine founds his own watch business in La Chaux-de-Fonds. The brand name "ENICAR" is his family name spelled backwards.',
    category: 'History',
  },
  {
    year: '1934',
    title: 'New Factory',
    description: 'Enicar moves to Lengnau, where they start producing their own movements, becoming a true manufacture.',
    category: 'History',
  },
  {
    year: '1956',
    title: 'The Swiss Everest Expedition',
    description: 'Enicar watches are chosen by the Swiss expedition to Lhotse and Mount Everest. The performance in extreme conditions leads to the creation of the "Sherpa" line.',
    category: 'Achievement',
  },
  {
    year: '1958',
    title: 'The Sherpa Graph',
    description: 'Launch of the Sherpa Graph, which becomes one of the most iconic chronographs of the era, worn by racing legends like Jim Clark.',
    category: 'Product',
  },
  {
    year: '1960',
    title: 'Expansion of the Sherpa Line',
    description: 'Introduction of specialized models like the Sherpa Jet (GMT), Sherpa Dive, and Sherpa Ultra Dive.',
    category: 'Product',
  },
  {
    year: '1962',
    title: 'The Saturn V Connection',
    description: 'Enicar provides watches for various scientific and military applications, solidifying its reputation for precision.',
    category: 'Achievement',
  },
];
