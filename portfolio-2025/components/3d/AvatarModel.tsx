'use client';

import { useEffect, useRef, useState } from 'react';

// Helper to safely call composedPath without using `any` casts.
function getComposedPath(e: Event): EventTarget[] {
  const maybe = (e as unknown as { composedPath?: () => EventTarget[] }).composedPath;
  return typeof maybe === 'function' ? maybe.call(e) : [];
}

// store event handler refs to allow cleanup without attaching arbitrary props
const _blockMap = new WeakMap<HTMLElement, { handler: EventListener; events: readonly string[] }>();

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
        mv.setAttribute('src', '/sou_scalled.glb');
        mv.setAttribute('alt', '3D avatar model of Soufiane El Mouajjeh');
        mv.setAttribute('loading', 'eager');
        mv.setAttribute('interaction-prompt', 'none');
        mv.setAttribute('ar-scale', 'auto');
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
        // disable built-in zoom and gestures so users cannot zoom the model
        mv.setAttribute('disable-zoom', '');
        mv.style.width = '100%';
        mv.style.height = '100%';
        mv.style.backgroundColor = 'transparent';
        // AR button slot — create it early so interaction blocker can exempt it.
        const btn = document.createElement('button');
        btn.setAttribute('slot', 'ar-button');
        btn.className = 'absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full text-sm font-medium shadow-md border border-gray-200';
        btn.textContent = 'see me in your office';
        mv.appendChild(btn);

        // Prevent click/tap/double-click/contextmenu interactions from changing
        // the model's position while preserving drag-rotation. We use capture
        // phase and block several event types. Exempt the AR button so it
        // remains clickable.
        const blockInteraction = (e: Event) => {
          const composed = getComposedPath(e);
          if (composed.some((el) => el === btn || (el && typeof (el as Element).getAttribute === 'function' && (el as Element).getAttribute('slot') === 'ar-button'))) {
            return; // allow AR button clicks
          }

          // Otherwise, block the event so model-viewer internals don't react to
          // clicks/taps/double-clicks which can change position or recentre the model.
          e.preventDefault();
          e.stopPropagation();
        };

        // Attach for several event types. touchstart needs passive:false to allow preventDefault.
        mv.addEventListener('click', blockInteraction, { capture: true });
        mv.addEventListener('pointerdown', blockInteraction, { capture: true });
        mv.addEventListener('dblclick', blockInteraction, { capture: true });
        mv.addEventListener('contextmenu', blockInteraction, { capture: true });
        mv.addEventListener('touchstart', blockInteraction as EventListener, { capture: true, passive: false });

        // store references for cleanup using a WeakMap to avoid leaking types
        // and to keep TypeScript happy.
        const eventsToBlock = ['click', 'pointerdown', 'dblclick', 'contextmenu', 'touchstart'] as const;
        const handlerRef = { handler: blockInteraction as EventListener, events: eventsToBlock };
        _blockMap.set(mv, handlerRef);

  // wheel and touch gestures that change zoom are disabled; rotation via
  // dragging remains available because camera-controls is enabled.

        container.appendChild(mv);
        modelRef.current = mv;
        setLoading(false);

  // cleanup for the click handler is handled in the effect cleanup
      })
      .catch((err) => {
        console.error('Failed to load @google/model-viewer', err);
        setLoading(false);
      });

    return () => {
      mounted = false;
      if (modelRef.current && container && container.contains(modelRef.current)) {
        // remove any blocked event listeners we added
        const el = modelRef.current as HTMLElement;
        const ref = _blockMap.get(el);
        if (ref) {
          for (const ev of ref.events) {
            el.removeEventListener(ev, ref.handler as EventListener, { capture: true } as EventListenerOptions);
          }
          _blockMap.delete(el);
        }

        container.removeChild(el);
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
