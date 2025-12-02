'use client';

import { useEffect, useRef, useState } from 'react';

const AvatarModel = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<HTMLElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const container = containerRef.current;

    // Only run on client. Dynamically import the package to register the custom element
    import('@google/model-viewer')
      .then(() => {
        if (!mounted || !container) return;

        // Create the model-viewer element via DOM APIs to avoid JSX typing issues
        const mv = document.createElement('model-viewer');
        mv.setAttribute('src', '/glb_sou.glb');
        mv.setAttribute('environment-image', '/music_hall_01_1k.hdr');
  mv.setAttribute('ar', '');
  mv.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
  // keep camera-controls so users can rotate the model
  mv.setAttribute('camera-controls', '');
  mv.setAttribute('tone-mapping', 'neutral');
  mv.setAttribute('shadow-intensity', '1');
  // enable auto-rotate and make it faster; delay zero so it starts immediately
  mv.setAttribute('auto-rotate', '');
  mv.setAttribute('auto-rotate-delay', '0');
  // rotation-per-second is supported by model-viewer; use a faster value (e.g. 60deg/sec)
  mv.setAttribute('rotation-per-second', '60deg');
  // disable built-in zoom if supported and additionally block wheel/pinch zoom via JS
  mv.setAttribute('disable-zoom', '');
        mv.style.width = '100%';
        mv.style.height = '100%';
        mv.style.backgroundColor = 'transparent';

        // AR button slot
        const btn = document.createElement('button');
        btn.setAttribute('slot', 'ar-button');
        btn.className = 'absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full text-sm font-medium shadow-md border border-gray-200';
        btn.textContent = 'View in your space';
        mv.appendChild(btn);

        // Prevent wheel and pinch gestures from zooming the model while preserving rotation
        // Use non-passive listeners so we can call preventDefault.
        mv.addEventListener(
          'wheel',
          (e: Event) => {
            // stop page scroll/zoom interactions on the model
            e.preventDefault();
          },
          { passive: false }
        );

        mv.addEventListener(
          'touchmove',
          (e: TouchEvent) => {
            // if multiple touches (pinch) happen, prevent the default zoom
            if (e.touches && e.touches.length > 1) {
              e.preventDefault();
            }
          },
          { passive: false }
        );

        container.appendChild(mv);
        modelRef.current = mv;
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load @google/model-viewer', err);
        setLoading(false);
      });

    return () => {
      mounted = false;
      if (modelRef.current && container && container.contains(modelRef.current)) {
        container.removeChild(modelRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] flex justify-center items-center">
      <div ref={containerRef} className="w-full h-full" suppressHydrationWarning>
        {loading && (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-b from-transparent to-black/5 rounded-3xl">
            <div className="animate-pulse text-black/40 font-mono text-sm">Loading 3D Model...</div>
          </div>
        )}
      </div>

      {/* overlays removed as requested: say hello pill and notification badge */}
    </div>
  );
};

export default AvatarModel;
