import { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { InteractiveMap } from './components/InteractiveMap';
import { ProductShowcase } from './components/ProductShowcase';
import { ProviderContact } from './components/ProviderContact';
import { Preloader } from './components/Preloader';

interface AppLocationState {
  replayPreloader?: boolean;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const locationState = location.state as AppLocationState | null;
  const shouldReplayPreloader =
    location.pathname === '/' && locationState?.replayPreloader === true;
  const showPreloader = isLoading || shouldReplayPreloader;

  const handlePreloaderComplete = () => {
    if (shouldReplayPreloader) {
      navigate('/', { replace: true });
      return;
    }

    setIsLoading(false);
  };

  return (
    <main className="bg-white min-h-screen text-black">
      <AnimatePresence mode="wait">
        {showPreloader && (
          <Preloader key="loader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {!showPreloader && (
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
