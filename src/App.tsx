import { lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { IntroSlideOne, TimelinePreview } from "./components/Introduction";
import { CollectionSlide } from "./components/ProductShowcase";
import { ProviderContact } from "./components/ProviderContact";
import { Preloader } from "./components/Preloader";
import { VerticalCarousel } from "./components/VerticalCarousel";
import { CustomCursor } from "./components/CustomCursor";

interface AppLocationState {
  replayPreloader?: boolean;
}

const InteractiveMap = lazy(() =>
  import("./components/InteractiveMap").then((module) => ({
    default: module.InteractiveMap,
  })),
);

const ProductsPage = () => {
  return (
    <>
      <CollectionSlide />
      <ProviderContact />
    </>
  );
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(() => {
    // Only show preloader if the landing page is the home page
    return typeof window !== "undefined" && window.location.pathname === "/";
  });
  const locationState = location.state as AppLocationState | null;
  const isHomeRoute = location.pathname === "/";
  const shouldReplayPreloader =
    isHomeRoute && locationState?.replayPreloader === true;
  const showPreloader = isLoading || shouldReplayPreloader;
  const shouldAnimateHero = isHomeRoute && !showPreloader;
  const isPhaseRoute = location.pathname.startsWith("/phase");
  const showNavbar = !isPhaseRoute && (isHomeRoute || !showPreloader);

  useEffect(() => {
    if (!showPreloader && location.hash) {
      const id = location.hash.replace("#", "");
      
      // Increased timeout to ensure components are ready, especially after route changes
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const carouselIds = ["hero", "intro", "preview", "products"];
          const index = carouselIds.indexOf(id);

          if (index !== -1 && isHomeRoute) {
            // Home page: scroll based on carousel index
            window.scrollTo({
              top: index * window.innerHeight,
              behavior: "smooth",
            });
          } else {
            // Other pages/sections: standard scrollIntoView with explicit block positioning
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }, 400); // 400ms is safer for page transitions
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash, showPreloader, isHomeRoute]);

  const handlePreloaderComplete = () => {
    if (shouldReplayPreloader) {
      navigate("/", { replace: true });
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

      {showNavbar && <Navbar />}

      <CustomCursor />

      {!showPreloader ? (
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <>
                <VerticalCarousel ids={["hero", "intro", "preview", "products"]}>
                  <Hero shouldAnimate={shouldAnimateHero} />
                  <IntroSlideOne />
                  <TimelinePreview />
                  <CollectionSlide />
                </VerticalCarousel>
                <ProviderContact />
              </>
            }
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/phase/:phaseId"
            element={
              <Suspense
                fallback={
                  <div className="min-h-[100dvh] bg-zinc-950 text-white flex items-center justify-center px-6">
                    <div className="text-center space-y-3">
                      <div className="font-eurostile-black uppercase tracking-[0.24em] text-red text-xs sm:text-sm">
                        Loading Timeline
                      </div>
                      <div className="text-white/45 text-sm sm:text-base">
                        Preparing the globe interface
                      </div>
                    </div>
                  </div>
                }
              >
                <InteractiveMap />
              </Suspense>
            }
          />
        </Routes>
      ) : (
        <Hero shouldAnimate={false} />
      )}
    </main>
  );
}

export default App;
