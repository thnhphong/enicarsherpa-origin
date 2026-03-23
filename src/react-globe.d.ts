declare module 'react-globe.gl' {
  import React from 'react';

  export interface GlobeMethods {
    pointOfView: (pov: { lat: number; lng: number; altitude: number }, transitionMs?: number) => void;
    controls: () => {
      autoRotate: boolean;
      autoRotateSpeed: number;
      enableZoom: boolean;
      minDistance: number;
      maxDistance: number;
    };
  }

  export type GlobeProps = Record<string, unknown>;

  const Globe: React.ForwardRefExoticComponent<GlobeProps & React.RefAttributes<GlobeMethods | undefined>>;
  export default Globe;
}
