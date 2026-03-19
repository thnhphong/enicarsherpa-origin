import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { Timeline } from './components/Timeline';
import { ProductShowcase } from './components/ProductShowcase';
import { ProviderContact } from './components/ProviderContact';
import { Preloader } from './components/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-charcoal min-h-screen text-ivory">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <Hero />
          <Introduction />
          <Timeline />
          <ProductShowcase />
          <ProviderContact />
        </>
      )}
    </main>
  );
}

export default App;
