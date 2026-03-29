import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

export interface GlobeEventData {
  id: number;
  lat: number;
  lng: number;
  label: string;
}

interface TimelineGlobeProps {
  events: GlobeEventData[];
  activeEventId: number | null;
  onMarkerClick?: (id: number) => void;
  onFocusComplete?: (id: number) => void;
  onLoaded?: () => void;
}

const GLOBE_RADIUS = 100;
const MARKER_COLORS = ["#bd2126", "#00FFFF", "#FFDE17"];
const getBaseColor = (id: number) => MARKER_COLORS[id % MARKER_COLORS.length];

function getPos(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 90) * (Math.PI / 180);
  const x = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);
  return new THREE.Vector3(x, y, z);
}

// Particle Globe Component
const ParticleGlobe = ({ onLoaded }: { onLoaded?: () => void }) => {
  const [positions, setPositions] = useState<Float32Array | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "https://unpkg.com/three-globe/example/img/earth-topology.png";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      const pts: number[] = [];
      const rows = 180; // Total dot rows

      for (let lat = -90; lat <= 90; lat += 180 / rows) {
        const radiusAtLat = Math.cos(lat * (Math.PI / 180));
        if (radiusAtLat === 0) continue;
        const cols = Math.max(1, Math.floor(rows * 2 * radiusAtLat));
        for (let i = 0; i < cols; i++) {
          const lng = -180 + (i * 360) / cols;

          const x = Math.min(
            canvas.width - 1,
            Math.max(0, Math.floor(((lng + 180) / 360) * canvas.width)),
          );
          const y = Math.min(
            canvas.height - 1,
            Math.max(0, Math.floor(((90 - lat) / 180) * canvas.height)),
          );

          const idx = (y * canvas.width + x) * 4;
          const r = imgData[idx]; // Topology image has elevation>0 for land

          if (r > 5) {
            const pos = getPos(lat, lng, GLOBE_RADIUS);
            pts.push(pos.x, pos.y, pos.z);
          }
        }
      }
      setPositions(new Float32Array(pts));
      onLoaded?.();
    };
  }, [onLoaded]);

  const geometry = useMemo(() => {
    if (!positions) return null;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  if (!geometry) return null;

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color="#ffffff"
        size={0.6}
        sizeAttenuation={true}
        transparent
        opacity={1}
        fog={false}
      />
    </points>
  );
};

// Individual Marker Component
const MarkerItem = ({
  event,
  activeEventId,
  onMarkerClick,
}: {
  event: GlobeEventData;
  activeEventId: number | null;
  onMarkerClick?: (id: number) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = activeEventId === event.id;
  const pos = getPos(event.lat, event.lng, GLOBE_RADIUS + 0.5);
  const ringRef = useRef<THREE.Mesh>(null);

  // Pulsing animation for active ring
  useFrame(({ clock }) => {
    if (ringRef.current && isActive) {
      const t = clock.getElapsedTime();
      const cycle = (t % 1.5) / 1.5;
      const s = 1 + cycle * 3.0; // Pulse scale from 1 to 4x
      ringRef.current.scale.set(s, s, s);
      const material = ringRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.5 * (1 - cycle);
    }
  });

  const baseColor = getBaseColor(event.id);
  const markerColor = isActive ? "#ffffff" : baseColor;

  // Scale: Active (4.0), Hover (2.5), Default (1.0)
  const scale = isActive ? 4.0 : isHovered ? 2.5 : 1.0;

  // Align orientation so ring is flat on surface
  const quaternion = useMemo(() => {
    const normal = pos.clone().normalize();
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return q;
  }, [pos]);

  return (
    <group position={pos} quaternion={quaternion}>
      {/* Interaction zone */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setIsHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onMarkerClick?.(event.id);
        }}
      >
        <sphereGeometry args={[isActive ? 8 : 4, 16, 16]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* Visual Marker */}
      <mesh>
        <sphereGeometry args={[scale, 16, 16]} />
        <meshBasicMaterial color={markerColor} />
      </mesh>

      {/* Pulsing ring for active */}
      {isActive && (
        <mesh ref={ringRef}>
          <ringGeometry args={[8.0, 10.0, 64]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* HTML tooltip / Description */}
      <Html
        distanceFactor={150}
        zIndexRange={[100, 0]}
        occlude
        className="pointer-events-none select-none"
      >
        <div
          className={`transition-all duration-300 ${isActive || isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"} bg-zinc-950/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg font-sans font-semibold shadow-xl border border-white/20 -translate-x-1/2 -translate-y-[calc(100%+12px)] whitespace-nowrap uppercase tracking-wider`}
        >
          {event.label}
        </div>
      </Html>
    </group>
  );
};

// Markers Component
const Markers = ({
  events,
  activeEventId,
  onMarkerClick,
}: {
  events: GlobeEventData[];
  activeEventId: number | null;
  onMarkerClick?: (id: number) => void;
}) => {
  return (
    <group>
      {events.map((event) => (
        <MarkerItem
          key={event.id}
          event={event}
          activeEventId={activeEventId}
          onMarkerClick={onMarkerClick}
        />
      ))}
    </group>
  );
};

// Main Component

interface ResponsiveGlobeSettings {
  fov: number;
  autoRotateSpeed: number;
}

const getResponsiveGlobeSettings = (): ResponsiveGlobeSettings => {
  if (typeof window === "undefined") {
    return { fov: 45, autoRotateSpeed: 0.5 };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const isShortViewport = height < 740;

  let fov = 45;

  if (width < 480 || isShortViewport) {
    fov = 65;
  } else if (width < 640) {
    fov = 58;
  } else if (width < 1024) {
    fov = 50;
  }

  return {
    fov,
    autoRotateSpeed: width >= 1024 && !isShortViewport ? 0.5 : 0.35,
  };
};

const useResponsiveGlobeSettings = () => {
  const [settings, setSettings] = useState<ResponsiveGlobeSettings>(
    getResponsiveGlobeSettings,
  );

  useEffect(() => {
    const updateSettings = () => setSettings(getResponsiveGlobeSettings());

    updateSettings();
    window.addEventListener("resize", updateSettings);

    return () => window.removeEventListener("resize", updateSettings);
  }, []);

  return settings;
};

// Component to sync camera FOV with responsive state
const CameraFovSync = ({ fov }: { fov: number }) => {
  useFrame(({ camera }) => {
    const cam = camera as THREE.PerspectiveCamera;
    if (Math.abs(cam.fov - fov) > 0.5) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
  });
  return null;
};

export const TimelineGlobe = ({
  events,
  activeEventId,
  onMarkerClick,
  onFocusComplete,
  onLoaded,
}: TimelineGlobeProps) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { fov, autoRotateSpeed } = useResponsiveGlobeSettings();

  useEffect(() => {
    if (controlsRef.current) {
      if (activeEventId !== null) {
        const activeEvent = events.find((e) => e.id === activeEventId);
        if (activeEvent) {
          const camPos = getPos(
            activeEvent.lat,
            activeEvent.lng,
            GLOBE_RADIUS * 2.5,
          );
          import("gsap").then(({ gsap }) => {
            gsap.to(controlsRef.current!.object.position, {
              x: camPos.x,
              y: camPos.y,
              z: camPos.z,
              duration: 1.5,
              ease: "power2.inOut",
              onComplete: () => {
                onFocusComplete?.(activeEventId);
              },
            });
          });
        }
      } else {
        // Zoom back out to default overview distance (maxDistance)
        import("gsap").then(({ gsap }) => {
          const currentPos = controlsRef.current!.object.position.clone();
          const targetDist = GLOBE_RADIUS * 4;
          // Move camera back along its current ray to the max distance
          const targetPos = currentPos.normalize().multiplyScalar(targetDist);

          gsap.to(controlsRef.current!.object.position, {
            x: targetPos.x,
            y: targetPos.y,
            z: targetPos.z,
            duration: 1.5,
            ease: "power2.inOut",
          });
        });
      }
    }
  }, [activeEventId, events, onFocusComplete]);

  return (
    <div className="w-full h-full pointer-events-auto bg-transparent cursor-pointer">
      <Canvas camera={{ position: [0, 0, GLOBE_RADIUS * 4], fov }}>
        <ambientLight intensity={0.5} />
        <CameraFovSync fov={fov} />

        <group>
          <ParticleGlobe onLoaded={onLoaded} />
          <Markers
            events={events}
            activeEventId={activeEventId}
            onMarkerClick={onMarkerClick}
          />
        </group>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          minDistance={GLOBE_RADIUS * 1.5}
          maxDistance={GLOBE_RADIUS * 4}
          autoRotate={activeEventId === null}
          autoRotateSpeed={autoRotateSpeed}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};
