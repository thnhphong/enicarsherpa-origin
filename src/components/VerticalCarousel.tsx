import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VerticalCarouselProps {
  children: React.ReactNode[];
  ids?: string[];
}

export const VerticalCarousel = ({ children, ids = [] }: VerticalCarouselProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".carousel-section") as HTMLElement[];

      // Create a timeline for the vertical scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${sections.length * 100}%`,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: { min: 0.2, max: 0.5 },
            delay: 0.1,
            ease: "power2.inOut",
          },
        },
      });

      const indicatorDots = container.querySelectorAll(".carousel-dot-inner");
      
      // Initial positions: all but the first section off-screen
      sections.forEach((section, i) => {
        if (i > 0) {
          gsap.set(section, { yPercent: 100 });
        }
      });

      sections.forEach((section, i) => {
        // Animation for each section (except the first one)
        if (i > 0) {
          tl.to(
            section,
            { 
              yPercent: 0, 
              duration: 1,
              ease: "none"
            },
            i - 1
          );
        }

        // Indicator animation: fill the indicator as the slide comes in
        const dotInner = indicatorDots[i];
        if (dotInner && i > 0) {
          gsap.set(dotInner, { yPercent: 100 });
          tl.to(
            dotInner,
            { 
              yPercent: 0, 
              duration: 1,
              ease: "none"
            },
            i - 1
          );
        }
      });

      // Reset slide 0 indicator since it's the starting state
      if (indicatorDots[0]) {
        gsap.set(indicatorDots[0], { yPercent: 0 });
      }
    }, wrapper);

    return () => ctx.revert(); // Reverts all GSAP modifications safely
  }, [children]);

  return (
    <div ref={wrapperRef}>
      <div 
        ref={containerRef} 
        className="relative w-full h-screen overflow-hidden bg-black"
      >
        {children.map((child, index) => (
          <div
            key={index}
            id={ids[index]}
            className="carousel-section absolute inset-0 w-full h-full pointer-events-auto"
            style={{ zIndex: index }}
          >
            {child}
          </div>
        ))}
        
        {/* Scroll Indicator */}
        <div className="carousel-indicator">
          {children.map((_, index) => (
            <div key={index} className="carousel-dot">
              <div className="carousel-dot-inner" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

