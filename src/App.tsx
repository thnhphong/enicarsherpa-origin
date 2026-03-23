import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { InteractiveMap } from './components/InteractiveMap';
import { ProductShowcase } from './components/ProductShowcase';
import { ProviderContact } from './components/ProviderContact';
import { Preloader } from './components/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-white min-h-screen text-black">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <Introduction />
              <ProductShowcase />
              <ProviderContact />
            </>
          } />
          <Route path="/phase/:phaseId" element={<InteractiveMap />} />
        </Routes>
      )}
    </main>
  );
}

export default App;
