'use client';

import { useCallback, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container } from '@tsparticles/engine';

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);
  const [themeColor, setThemeColor] = useState('#00E5A0');

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  useEffect(() => {
    const updateColor = () => {
      const style = getComputedStyle(document.documentElement);
      const live = style.getPropertyValue('--color-live').trim();
      if (live) setThemeColor(live);
    };
    updateColor();

    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional: log or interact with the container
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="hero-particles"
      particlesLoaded={particlesLoaded}
      style={{ pointerEvents: 'none' }}
      options={{
        fullScreen: {
          enable: true,
          zIndex: 50,
        },
        fpsLimit: 60,
        interactivity: {
          detectsOn: 'window',
          events: {
            onHover: {
              enable: true,
              mode: 'repulse',
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
            },
          },
          color: {
            value: themeColor,
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: { min: 0.15, max: 0.4 },
            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
            },
          },
          size: {
            value: { min: 1.5, max: 4 },
          },
          links: {
            enable: true,
            distance: 150,
            color: themeColor,
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: 'none' as const,
            random: true,
            straight: false,
            outModes: {
              default: 'out' as const,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
