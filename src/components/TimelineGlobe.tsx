import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Stars, useTexture, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

// Coordinate Map based on TimelinePosition.md
const locationMap: Record<number, [number, number, string]> = {
  2: [28.5983, 83.9310, "Himalaya"],
  3: [51.5074, -0.1278, "London: Moss"],
  4: [50.3755, -4.1427, "Plymouth: Mayflower II"],
  5: [12.1696, -68.9900, "Caribbean: Hans Hass"],
  6: [-0.1521, 37.3084, "Mt. Kenya"],
  7: [78.2232, 15.6267, "Spitzbergen"],
  8: [-90, 0, "South Pole"],
  9: [38.8951, -77.0364, "Washington D.C."],
  10: [-33.8688, 151.2093, "Sydney: Ken Rosewall"],
  11: [47.5596, 7.5886, "Basel Fair"],
  12: [55.9533, -3.1883, "Scotland: Jim Clark"],
  13: [59.3293, 18.0686, "Stockholm: Vasa"],
  14: [63.0692, -151.0070, "Mt. McKinley"],
  15: [47.1812, 7.3510, "Lengnau HQ"],
  16: [47.4917, 10.9848, "Alps: Ski Test"],
  17: [35.6762, 139.6503, "Tokyo"],
  18: [47.4582, 8.5555, "Zurich Airport"],
  19: [-17.6509, -149.4260, "Tahiti"],
  20: [47.1812, 7.3510, "Lengnau"],
  21: [46.8182, 8.2275, "Switzerland: Racing"],
  22: [47.3769, 8.5417, "Zurich: Cycling"],
  23: [28.5983, 83.9310, "Tukuche Peak"],
  24: [50.7130, -1.3005, "Mary Rose"],
  25: [46.5197, 6.6323, "Lausanne"],
};

const LAT_LON_TO_VECTOR = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
};

interface GlobeContentProps {
  progress: MotionValue<number>;
  onMarkerClick?: (id: number) => void;
}

const GlobeContent = ({ progress, onMarkerClick }: GlobeContentProps) => {
  const globeRef = useRef<THREE.Mesh>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  // Dark/night earth texture — looks premium on white background
  const [nightTexture, bumpTexture] = useTexture([
    "https://unpkg.com/three-globe/example/img/earth-night.jpg",
    "https://unpkg.com/three-globe/example/img/earth-topology.png",
  ]);

  const ids = useMemo(() => Object.keys(locationMap).map(Number).sort((a, b) => a - b), []);
  
  useFrame(({ camera }) => {
    if (!globeRef.current) return;

    const currentProgress = progress.get();
    const total = ids.length - 1;
    const index = Math.min(Math.floor(currentProgress * total), total);
    const nextIndex = Math.min(index + 1, total);
    const localProgress = (currentProgress * total) % 1;

    const p1 = locationMap[ids[index]];
    const p2 = locationMap[ids[nextIndex]];

    if (p1 && p2) {
        const [lat1, lon1] = p1;
        const [lat2, lon2] = p2;
        const targetLat = lat1 + (lat2 - lat1) * localProgress;
        const targetLon = lon1 + (lon2 - lon1) * localProgress;

        const targetVec = LAT_LON_TO_VECTOR(targetLat, targetLon, 250);
        camera.position.lerp(targetVec, 0.03);
    }

    camera.lookAt(0, 0, 0);
    globeRef.current.rotation.y += 0.0003;
  });

  return (
    <>
      <Stars radius={400} depth={80} count={2000} factor={2} saturation={0} fade speed={0.3} />
      
      {/* Lighting for the dark earth — warm highlights */}
      <directionalLight position={[200, 100, 150]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-80, -30, -80]} intensity={0.3} color="#4488aa" />
      <ambientLight intensity={0.6} />
      
      {/* Earth */}
      <Sphere ref={globeRef} args={[100, 64, 64]}>
        <meshStandardMaterial 
          map={nightTexture}
          bumpMap={bumpTexture}
          bumpScale={2}
          emissive={new THREE.Color("#1a1a2e")}
          emissiveIntensity={1.5}
          emissiveMap={nightTexture}
          roughness={0.8}
          metalness={0.1}
        />
        
        {/* Markers */}
        {ids.map((id) => {
            const entry = locationMap[id];
            if (!entry) return null;
            const [lat, lon, label] = entry;
            const pos = LAT_LON_TO_VECTOR(lat, lon, 101);
            const isHovered = hoveredId === id;

            return (
                <group key={id}>
                    <mesh 
                      position={pos}
                      onPointerOver={(e) => {
                        e.stopPropagation();
                        setHoveredId(id);
                        document.body.style.cursor = "pointer";
                      }}
                      onPointerOut={() => {
                        setHoveredId(null);
                        document.body.style.cursor = "default";
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onMarkerClick?.(id);
                      }}
                    >
                        <sphereGeometry args={[isHovered ? 2.5 : 1.5, 16, 16]} />
                        <meshBasicMaterial 
                          color={isHovered ? "#ffde17" : "#bd2126"} 
                          transparent 
                          opacity={isHovered ? 1 : 0.85} 
                        />
                    </mesh>

                    <mesh position={pos} rotation={[Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[2, 3, 32]} />
                        <meshBasicMaterial color="#bd2126" transparent opacity={0.15} side={THREE.DoubleSide} />
                    </mesh>
                    
                    {isHovered && (
                        <Html distanceFactor={15} position={[pos.x, pos.y + 5, pos.z]} center>
                            <div className="bg-white/95 backdrop-blur-md text-black text-[10px] px-3 py-1.5 rounded-lg font-sans font-semibold whitespace-nowrap shadow-xl border border-black/10 pointer-events-none">
                                📍 {label}
                            </div>
                        </Html>
                    )}
                </group>
            );
        })}
      </Sphere>

      {/* Atmospheric glow */}
      <Sphere args={[105, 64, 64]}>
        <meshPhongMaterial 
          color="#4488cc"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </>
  );
};

interface TimelineGlobeProps {
  progress: MotionValue<number>;
  onMarkerClick?: (id: number) => void;
}

export const TimelineGlobe = ({ progress, onMarkerClick }: TimelineGlobeProps) => {
  return (
    <div className="w-full h-full pointer-events-auto rounded-full overflow-hidden">
      <Canvas 
        camera={{ position: [0, 50, 280], fov: 40 }}
        style={{ background: "transparent" }}
      >
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          rotateSpeed={0.4}
          makeDefault
        />
        <GlobeContent progress={progress} onMarkerClick={onMarkerClick} />
      </Canvas>
    </div>
  );
};
