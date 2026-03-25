import { useState, useMemo, useCallback } from "react";

import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { TimelineGlobe } from "./TimelineGlobe";
import type { GlobeEventData } from "./TimelineGlobe";
import timelineData from "../Timeline.json";

const ALL_LOCATIONS: Record<
  number,
  { lat: number; lng: number; label: string }
> = {
  1: { lat: 50.0, lng: 5.0, label: "Lengnau, Switzerland" },
  2: { lat: 32.0, lng: 80.0, label: "Himalaya" },
  3: { lat: 52.0, lng: 1.0, label: "London: Moss" },
  4: { lat: 50.3755, lng: -4.1427, label: "Plymouth: Mayflower II" },
  5: { lat: 15.0, lng: -65.0, label: "Caribbean: Hans Hass" },
  6: { lat: -2.0, lng: 40.0, label: "Mt. Kenya" },
  7: { lat: 75.0, lng: 20.0, label: "Spitzbergen" },
  8: { lat: -85.0, lng: 60.0, label: "South Pole" },
  9: { lat: 35.0, lng: -75.0, label: "Washington D.C." },
  10: { lat: -38.0, lng: 150.0, label: "Sydney: Ken Rosewall" },
  11: { lat: 48.0, lng: 8.0, label: "Basel Fair" },
  12: { lat: 58.0, lng: -5.0, label: "Scotland: Jim Clark" },
  13: { lat: 62.0, lng: 22.0, label: "Stockholm: Vasa" },
  14: { lat: 60.0, lng: -145.0, label: "Mt. McKinley" },
  15: { lat: 53.0, lng: 3.0, label: "Lengnau HQ" },
  16: { lat: 47.0, lng: 13.0, label: "Alps: Ski Test" },
  17: { lat: 32.0, lng: 142.0, label: "Tokyo" },
  18: { lat: 48.0, lng: 12.0, label: "Zurich Airport" },
  19: { lat: -22.0, lng: -145.0, label: "Tahiti" },
  20: { lat: 43.0, lng: 10.0, label: "Lengnau" },
  21: { lat: 45.0, lng: 13.0, label: "Switzerland: Racing" },
  22: { lat: 55.0, lng: 15.0, label: "Zurich: Cycling" },
  23: { lat: 24.0, lng: 88.0, label: "Tukuche Peak" },
  24: { lat: 49.0, lng: -1.0, label: "Mary Rose" },
  25: { lat: 40.0, lng: 5.0, label: "Lausanne" },
  26: { lat: 38.0, lng: 8.0, label: "Lengnau: The End" },
};

const PHASES = [
  {
    id: 1,
    title: "Predecessors of Sherpa",
    years: "1955 - 1956",
    filter: (id: number) => id === 1 || id === 2,
  },
  {
    id: 2,
    title: "The Golden Era",
    years: "1957 - 1971",
    filter: (id: number) => id >= 3 && id <= 25,
  },
  {
    id: 3,
    title: "The Downfall of Enicar",
    years: "1977 - 1987",
    filter: (id: number) => id === 26,
  },
];

export const InteractiveMap = () => {
  const { phaseId } = useParams();
  const navigate = useNavigate();
  const currentPhaseId = parseInt(phaseId || "1", 10);

  const [activeEventId, setActiveEventId] = useState<number | null>(null);
  const [showOverlayId, setShowOverlayId] = useState<number | null>(null);
  const [hoveredTimelineId, setHoveredTimelineId] = useState<number | null>(
    null,
  );
  const [isGlobeLoaded, setIsGlobeLoaded] = useState(false);

  const currentPhase = PHASES.find((p) => p.id === currentPhaseId) || PHASES[0];

  const phaseEventsData = useMemo(() => {
    return timelineData.filter((item) => currentPhase.filter(item.id));
  }, [currentPhase]);

  const globeEvents: GlobeEventData[] = useMemo(() => {
    return phaseEventsData.map((e) => {
      const loc = ALL_LOCATIONS[e.id] || { lat: 0, lng: 0, label: "Unknown" };
      return { id: e.id, lat: loc.lat, lng: loc.lng, label: loc.label };
    });
  }, [phaseEventsData]);

  const activeOverlayEvent = useMemo(() => {
    return showOverlayId
      ? timelineData.find((e) => e.id === showOverlayId)
      : null;
  }, [showOverlayId]);

  const getImagePath = (path: string | undefined) => {
    if (!path) return "";
    return `/images/Timeline/${path
      .replace(/\\/g, "/")
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/")}`;
  };

  const handlePhaseChange = (id: number) => {
    setActiveEventId(null);
    setShowOverlayId(null);
    navigate(`/phase/${id}`);
  };

  const handleNextPhase = () => {
    if (currentPhaseId < 3) handlePhaseChange(currentPhaseId + 1);
  };

  const handlePrevPhase = () => {
    if (currentPhaseId > 1) handlePhaseChange(currentPhaseId - 1);
  };

  return (
    <div className="relative w-screen h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
      {/* 3D Globe Background Layer */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${showOverlayId ? "blur-xl opacity-30 scale-105" : "blur-0 opacity-100 scale-100"}`}
      >
        <TimelineGlobe
          events={globeEvents}
          activeEventId={activeEventId}
          onMarkerClick={useCallback((id: number) => {
            setActiveEventId(id);
            setShowOverlayId(null);
          }, [])}
          onFocusComplete={useCallback(
            (id: number) => setShowOverlayId(id),
            [],
          )}
          onLoaded={useCallback(() => setIsGlobeLoaded(true), [])}
        />
      </div>

      {/* Cinematic Loading Overlay */}
      <AnimatePresence>
        {!isGlobeLoaded && (
          <motion.div
            key="globe-loading-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-[200] flex flex-col items-center justify-center bg-zinc-950 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center gap-10">
              <div className="relative w-24 h-24">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-t-2 border-r-2 border-white/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border-b-2 border-l-2 border-red/60 rounded-full"
                />
                <motion.div
                  animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-[38%] bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                />
              </div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="text-white tracking-[0.4em] text-sm md:text-base font-eurostile-black uppercase">
                  Initializing the Chronicle
                </div>
                <div className="text-white/40 tracking-[0.2em] text-[10px] md:text-xs">
                  Loading Global Interface
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation */}
      <div
        className={`absolute top-0 left-0 w-full p-6 flex justify-between items-center z-40 transition-opacity duration-500 ${showOverlayId ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <Link
          to="/"
          className="flex items-center font-eurostile-black font-bold gap-2 text-red hover:text-white transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="uppercase tracking-widest text-xs font-bold">
            Home
          </span>
        </Link>

        <div className="flex gap-4">
          {PHASES.map((p) => (
            <button
              key={p.id}
              onClick={() => handlePhaseChange(p.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${p.id === currentPhaseId ? "bg-red text-white" : "bg-white/10 text-white/50 hover:bg-white/20"}`}
            >
              {p.years.replace(/\s+/g, "")}
            </button>
          ))}
        </div>
      </div>

      {/* Phase Titles */}
      <div
        className={`absolute top-24 left-1/2 -translate-x-1/2 text-center pointer-events-none z-30 transition-all duration-700 ${showOverlayId ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"}`}
      >
        <motion.h1
          key={`title-${currentPhaseId}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-script  italic tracking-wide"
        >
          {currentPhase.title}
        </motion.h1>
        <motion.p
          key={`years-${currentPhaseId}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-red font-eurostile-black tracking-[0.5em] text-sm mt-4 uppercase"
        >
          {currentPhase.years}
        </motion.p>
      </div>

      {/* Bottom Timeline Bar */}
      <div
        className={`absolute bottom-0 left-0 w-full z-50 transition-transform duration-700 ${showOverlayId ? "translate-y-full" : "translate-y-0"}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pt-32 pb-4 relative overflow-y-visible">
            {phaseEventsData.map((event) => (
              <div key={event.id} className="relative group shrink-0">
                <AnimatePresence>
                  {hoveredTimelineId === event.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-10 w-64 bg-black/95 backdrop-blur-xl rounded-lg p-5 z-[100] pointer-events-none shadow-[0_20px_50px_rgba(0,0,0,1)] text-center ring-1 ring-white/10"
                    >
                      <div className="text-sm md:text-base font-eurostile-black leading-tight text-white tracking-wide">
                        {event.title}
                      </div>
                      {/* Tooltip triangle */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-black/95" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => {
                    setActiveEventId(event.id);
                    setShowOverlayId(null);
                  }}
                  onMouseEnter={() => setHoveredTimelineId(event.id)}
                  onMouseLeave={() => setHoveredTimelineId(null)}
                  className="flex flex-col items-center gap-4 px-4 outline-none transition-transform duration-300 active:scale-95"
                >
                  <div className="text-white/40 group-hover:text-red transition-colors text-sm font-bold tracking-[0.1em]">
                    {event.year}
                  </div>
                  <div className="w-5 h-5 rounded-full bg-white/20 group-hover:bg-red group-hover:scale-125 transition-all shadow-[0_0_15px_rgba(255,189,33,0)] group-hover:shadow-[0_0_20px_rgba(189,33,38,0.7)]" />
                </button>
              </div>
            ))}
          </div>

          {/* Phase Navigation Arrows */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPhase}
              disabled={currentPhaseId === 1}
              className="flex font-eurostile-black font-bold items-center gap-2 text-red hover:text-white disabled:opacity-20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" /> Prev Phase
            </button>
            <button
              onClick={handleNextPhase}
              disabled={currentPhaseId === 3}
              className="font-eurostile-black font-bold flex  items-center gap-2 text-red hover:text-white disabled:opacity-20 transition-colors"
            >
              Next Phase <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cinematic Event Takeover Overlay */}
      <AnimatePresence>
        {activeOverlayEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/40"
          >
            <button
              onClick={() => {
                setActiveEventId(null);
                setShowOverlayId(null);
              }}
              className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white hover:text-black transition-all z-50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full max-h-[80vh] overflow-y-auto no-scrollbar">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="space-y-8"
              >
                <div className="inline-block px-4 py-1.5 border border-red/50 rounded-full text-red font-eurostile-black tracking-widest text-sm uppercase">
                  {activeOverlayEvent.year}
                </div>
                <h2 className="text-5xl md:text-7xl font-eurostile-black font-bold leading-tight">
                  {activeOverlayEvent.title}
                </h2>
                <p className="text-xl md:text-2xl font-light text-white/70 leading-relaxed">
                  {activeOverlayEvent.description}
                </p>
                {activeOverlayEvent.month && (
                  <p className="text-sm text-red   tracking-widest uppercase font-bold">
                    Date: {activeOverlayEvent.month}
                  </p>
                )}
              </motion.div>

              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {activeOverlayEvent.images?.map((img, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl overflow-hidden shadow-2xl ${idx === 0 && activeOverlayEvent.images!.length % 2 !== 0 ? "sm:col-span-2" : ""}`}
                  >
                    <img
                      src={getImagePath(img)}
                      alt={activeOverlayEvent.title}
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
