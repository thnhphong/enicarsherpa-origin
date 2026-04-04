import {
  Suspense,
  lazy,
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";

import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Home, Plus } from "lucide-react";
import type { GlobeEventData } from "./TimelineGlobe";
import timelineData from "../Timeline.json";

const TimelineGlobe = lazy(() =>
  import("./TimelineGlobe").then((module) => ({
    default: module.TimelineGlobe,
  })),
);

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

interface ViewportProfile {
  width: number;
  height: number;
  orientation: "portrait" | "landscape";
  isMobile: boolean;
  isTablet: boolean;
  isShortViewport: boolean;
}

const getViewportProfile = (): ViewportProfile => {
  if (typeof window === "undefined") {
    return {
      width: 1024,
      height: 768,
      orientation: "landscape",
      isMobile: false,
      isTablet: false,
      isShortViewport: false,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    width,
    height,
    orientation: width > height ? "landscape" : "portrait",
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1024,
    isShortViewport: height < 740,
  };
};

const useViewportProfile = () => {
  const [profile, setProfile] = useState<ViewportProfile>(getViewportProfile);

  useEffect(() => {
    const updateProfile = () => setProfile(getViewportProfile());

    updateProfile();
    window.addEventListener("resize", updateProfile);

    return () => window.removeEventListener("resize", updateProfile);
  }, []);

  return profile;
};

const TimelineImage = ({
  src,
  alt,
  location,
}: {
  src: string;
  alt: string;
  location: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative group rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.4)] w-full">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-700 bg-zinc-950/20"
      />
      <div className="absolute bottom-0 left-0 z-20 ">
        <motion.div
          animate={{
            width: isExpanded ? "auto" : "44px",
            height: isExpanded ? "auto" : "44px",
            minWidth: "44px",
            minHeight: "44px",
          }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="bg-red flex items-center overflow-hidden text-white cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="w-11 h-11 flex items-center justify-center shrink-0">
            {isExpanded ? (
              <X className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5 rounded-full" />
            )}
          </div>
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="pr-6 py-2 whitespace-nowrap overflow-hidden"
              >
                <div className="font-eurostile italic text-xs sm:text-sm tracking-widest leading-tight">
                  {location.split(",").map((line, i) => (
                    <div key={i}>{line.trim()}{i === 0 && location.includes(",") ? "," : ""}</div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export const InteractiveMap = () => {
  const { phaseId } = useParams();
  const navigate = useNavigate();
  const currentPhaseId = parseInt(phaseId || "1", 10);
  const { isMobile, isTablet, isShortViewport } = useViewportProfile();

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

  const [activeEventId, setActiveEventId] = useState<number | null>(null);
  const [showOverlayId, setShowOverlayId] = useState<number | null>(null);
  const [tappedTimelineId, setTappedTimelineId] = useState<number | null>(null);
  const [isGlobeLoaded, setIsGlobeLoaded] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(checkScroll, 500); // Check after render/phase change
    return () => clearTimeout(timer);
  }, [phaseEventsData, checkScroll]);

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
    setTappedTimelineId(null);
    navigate(`/phase/${id}`);
  };

  const handleTimelineDotClick = (eventId: number) => {
    // On tap, toggle label visibility; on second tap, navigate
    if (tappedTimelineId === eventId) {
      setActiveEventId(eventId);
      setShowOverlayId(null);
      setTappedTimelineId(null);
    } else {
      setTappedTimelineId(eventId);
    }
  };

  const topVignetteHeight = isShortViewport
    ? "18%"
    : isMobile
      ? "30%"
      : isTablet
        ? "35%"
        : "40%";
  const bottomVignetteHeight = isShortViewport
    ? "18%"
    : isMobile
      ? "25%"
      : isTablet
        ? "28%"
        : "30%";
  const phaseTitleTopClass = isShortViewport
    ? "top-12"
    : isMobile
      ? "top-16"
      : "top-24";
  const timelinePaddingClass = isShortViewport
    ? "pt-16 pb-16"
    : isMobile
      ? "pt-24 pb-24"
      : "pt-32 pb-32";
  const shouldTopAlignOverlay = isMobile || isShortViewport;
  const showTimelineCue = canScrollLeft || canScrollRight;
  const timelineCueLabel = isMobile || isTablet ? "Swipe" : "Scroll";
  const timelineSnapClass = isMobile ? "snap-proximity" : "snap-mandatory";
  const timelineSidePaddingClass = isMobile ? "px-8" : "px-4 md:px-6";
  const timelineCuePositionClass = isMobile ? "-mt-16 pb-2" : "-mt-24 pb-3";

  return (
    <div className="relative w-full min-h-[100dvh] bg-zinc-950 text-white overflow-hidden font-sans">
      {/* 3D Globe Background Layer — full viewport, globe is the hero */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${showOverlayId ? "blur-xl opacity-30 scale-105" : "blur-0 opacity-100 scale-100"}`}
      >
        <Suspense fallback={null}>
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
        </Suspense>
      </div>

      {/* Top gradient vignette */}
      <div
        className={`absolute inset-x-0 top-0 h-[30%] sm:h-[35%] lg:h-[40%] bg-gradient-to-b from-zinc-950 via-zinc-950/70 to-transparent pointer-events-none z-[5] transition-opacity duration-1000 ${showOverlayId ? "opacity-0" : "opacity-100"}`}
        style={{ height: topVignetteHeight }}
      />
      {/* Bottom gradient vignette for timeline */}
      <div
        className={`absolute inset-x-0 bottom-0 h-[25%] sm:h-[28%] lg:h-[30%] bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent pointer-events-none z-[5] transition-opacity duration-1000 ${showOverlayId ? "opacity-0" : "opacity-100"}`}
        style={{ height: bottomVignetteHeight }}
      />

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
            <div className="flex flex-col items-center gap-8 md:gap-10">
              <div className="relative w-20 h-20 md:w-24 md:h-24">
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
                <div className="text-white tracking-[0.18em] md:tracking-[0.4em] text-xs md:text-base font-eurostile-black uppercase">
                  Initializing the Chronicle
                </div>
                <div className="text-white/40 tracking-[0.12em] md:tracking-[0.2em] text-[10px] md:text-xs">
                  Loading Global Interface
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation */}
      <div
        className={`safe-top-pad absolute top-0 left-0 w-full max-w-full px-3 sm:px-6 pb-3 sm:pb-6 flex items-center gap-2 sm:gap-4 z-40 transition-opacity duration-500 ${showOverlayId ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <Link
          to="/"
          className="flex items-center font-eurostile-black font-bold gap-1.5 sm:gap-2 text-red hover:text-white transition-colors min-h-11 min-w-11 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-full"
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="uppercase tracking-[0.12em] md:tracking-widest text-[10px] sm:text-xs font-bold hidden sm:inline">
            Home
          </span>
        </Link>

        <div className="flex gap-1.5 sm:gap-3 flex-1 min-w-0 overflow-x-auto no-scrollbar justify-end">
          {PHASES.map((p) => (
            <button
              key={p.id}
              onClick={() => handlePhaseChange(p.id)}
              className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 min-h-11 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${p.id === currentPhaseId ? "bg-red text-white" : "bg-white/10 text-white/50 hover:bg-white/20"}`}
            >
              {p.years.replace(/\s+/g, "")}
            </button>
          ))}
        </div>
      </div>

      {/* Phase Titles */}
      <div
        className={`absolute ${phaseTitleTopClass} left-1/2 -translate-x-1/2 text-center pointer-events-none z-30 w-full px-4 transition-all duration-700 ${showOverlayId ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"}`}
      >
        <motion.h1
          key={`title-${currentPhaseId}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[clamp(2rem,7vw,5rem)] font-script italic tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        >
          {currentPhase.title}
        </motion.h1>
        <motion.p
          key={`years-${currentPhaseId}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-red font-eurostile-black tracking-[0.18em] md:tracking-[0.5em] text-xs sm:text-sm mt-3 md:mt-4 uppercase"
        >
          {currentPhase.years}
        </motion.p>
      </div>

      {/* Bottom Timeline Bar */}
      <div
        className={`safe-bottom-pad absolute bottom-0 left-0 w-full z-50 transition-transform duration-700 ${showOverlayId ? "translate-y-full" : "translate-y-0"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">
          <div>
            <div className="min-w-0">
              <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                onWheel={(e) => {
                  if (scrollContainerRef.current) {
                    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                      scrollContainerRef.current.scrollLeft += e.deltaY;
                    }
                  }
                }}
                className={`flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar snap-x ${timelineSnapClass} touch-pan-x relative overflow-y-visible ${timelinePaddingClass} ${timelineSidePaddingClass}`}
              >
                {phaseEventsData.map((event, index) => (
                  <div key={event.id} className="relative group shrink-0">
                    {/* Tooltip — visible on hover (desktop) or tap (mobile) */}
                    <AnimatePresence>
                      {tappedTimelineId === event.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className={`absolute bottom-full mb-14 sm:mb-10 w-48 sm:w-64 bg-zinc-950/95 backdrop-blur-xl rounded-lg p-4 sm:p-5 z-[100] pointer-events-none shadow-[0_20px_50px_rgba(0,0,0,1)] text-center ring-1 ring-white/10 ${
                            index === 0
                              ? "left-0 translate-x-0"
                              : index === phaseEventsData.length - 1
                                ? "right-0 translate-x-0"
                                : "left-1/2 -translate-x-1/2"
                          }`}
                        >
                          <div className="text-xs sm:text-sm font-eurostile-black leading-tight text-white tracking-wide">
                            {event.title}
                          </div>
                          {/* Tooltip triangle — adjusted based on tooltip alignment */}
                          <div
                            className={`absolute top-full w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-black/95 ${
                              index === 0
                                ? "left-4 translate-x-0"
                                : index === phaseEventsData.length - 1
                                  ? "right-4 translate-x-0"
                                  : "left-1/2 -translate-x-1/2"
                            }`}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      onClick={() => handleTimelineDotClick(event.id)}
                      onMouseEnter={() => setTappedTimelineId(event.id)}
                      onMouseLeave={() =>
                        setTappedTimelineId((currentId) =>
                          currentId === event.id ? null : currentId,
                        )
                      }
                      onFocus={() => setTappedTimelineId(event.id)}
                      onBlur={() =>
                        setTappedTimelineId((currentId) =>
                          currentId === event.id ? null : currentId,
                        )
                      }
                      className="flex flex-col items-center gap-3 sm:gap-4 px-2 sm:px-4 outline-none transition-transform duration-300 active:scale-95 min-h-11 min-w-11 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                    >
                      <div className="text-white/40 group-hover:text-red transition-colors text-xs sm:text-sm font-bold tracking-[0.05em] sm:tracking-[0.1em]">
                        {event.year}
                      </div>
                      <div className="w-6 h-6 sm:w-5 sm:h-5 rounded-full bg-white/20 group-hover:bg-red group-hover:scale-125 transition-all shadow-[0_0_15px_rgba(255,189,33,0)] group-hover:shadow-[0_0_20px_rgba(189,33,38,0.7)]" />
                    </button>
                  </div>
                ))}
              </div>

              {showTimelineCue && (
                <div
                  className={`${timelineCuePositionClass} flex justify-center`}
                >
                  <div className="pointer-events-none inline-flex items-center gap-1.5 rounded-full border border-red/15 bg-zinc-950/65 px-2.5 py-0.5 text-[1.2rem] font-eurostile-black uppercase tracking-[0.16em] text-red/65 shadow-[0_0_16px_rgba(189,33,38,0.12)] backdrop-blur-sm">
                    <span
                      className={`flex items-center justify-center transition-opacity ${
                        canScrollLeft ? "opacity-70" : "opacity-25"
                      }`}
                    >
                      <ChevronLeft className="h-3 w-3" />
                    </span>
                    <span>{timelineCueLabel}</span>
                    <span
                      className={`flex items-center justify-center transition-opacity ${
                        canScrollRight ? "opacity-70" : "opacity-25"
                      }`}
                    >
                      <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              )}
            </div>
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
            className="absolute inset-0 z-50 bg-zinc-950/40 overflow-y-auto"
          >
            <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-end px-4 sm:px-8 safe-top-pad">
              <button
                onClick={() => {
                  setActiveEventId(null);
                  setShowOverlayId(null);
                }}
                className="pointer-events-auto w-12 h-12 min-h-11 min-w-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white hover:text-black transition-all focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-zinc-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className={`min-h-[100dvh] w-full flex justify-center ${shouldTopAlignOverlay ? "items-start" : "items-center"}`}
            >
              <div className="max-w-[90rem] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-16 items-start py-24 sm:py-32">
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="space-y-5 sm:space-y-8 border-l border-red/20 pl-6 lg:pl-10 lg:sticky lg:top-32"
                >
                  <div className="inline-block px-3 sm:px-4 py-1.5 border border-red/50 rounded-full text-red font-eurostile-black tracking-[0.6em] sm:tracking-widest text-xs sm:text-sm uppercase">
                    {activeOverlayEvent.year}
                  </div>
                  <h2 className="text-[clamp(1.75rem,6vw,4.5rem)] font-eurostile-black font-bold leading-tight">
                    {activeOverlayEvent.title}
                  </h2>
                  <p className="text-base md:text-lg lg:text-2xl font-light text-white/70 leading-relaxed max-w-[65ch]">
                    {activeOverlayEvent.description}
                  </p>
                  {activeOverlayEvent.month && (
                    <p className="text-xs sm:text-sm text-red tracking-[0.12em] sm:tracking-widest uppercase font-bold">
                      Date: {activeOverlayEvent.month}
                    </p>
                  )}
                </motion.div>

                {/* Image Gallery */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-col gap-6 sm:gap-8 lg:gap-10 pb-10"
                >
                  {activeOverlayEvent.images?.map((img, idx) => (
                    <TimelineImage
                      key={idx}
                      src={getImagePath(img)}
                      alt={`${activeOverlayEvent.title} image ${idx + 1}`}
                      location={
                        ALL_LOCATIONS[activeOverlayEvent.id]?.label ||
                        "Unknown Location"
                      }
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
