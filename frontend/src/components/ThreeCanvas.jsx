import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas({ scrollProgress = 0, mousePos = { x: 0, y: 0 }, theme = 'dark' }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const stateRef = useRef({
    starPoints: null,
    nebulaPoints: null,
    dustPoints: null,
    targetMouse: { x: 0, y: 0 },
    currentMouse: { x: 0, y: 0 }
  });

  // Handle Dynamic Theme Transition
  useEffect(() => {
    if (!sceneRef.current) return;
    const isLight = theme === 'light';

    if (sceneRef.current.fog) {
      sceneRef.current.fog.color.setHex(isLight ? 0xf8fafc : 0x05030e);
    }
    if (rendererRef.current) {
      rendererRef.current.setClearColor(isLight ? 0xf8fafc : 0x05030e, 1);
    }
  }, [theme]);

  // Update target mouse on prop change
  useEffect(() => {
    stateRef.current.targetMouse.x = mousePos.x || 0;
    stateRef.current.targetMouse.y = mousePos.y || 0;
  }, [mousePos]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Helper: Create Soft Circular Glow Particle Texture Procedurally
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(220, 200, 255, 0.85)');
      gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.35)');
      gradient.addColorStop(0.8, 'rgba(6, 182, 212, 0.08)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const particleTexture = createGlowTexture();

    // 1. Clean Scene & Subtle Fog
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const isLight = theme === 'light';
    scene.fog = new THREE.FogExp2(isLight ? 0xf8fafc : 0x05030e, 0.012);

    // 2. Camera Setup
    const isMobile = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 60 : 50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 45);
    cameraRef.current = camera;

    // 3. WebGL Renderer with High Precision
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(isLight ? 0xf8fafc : 0x05030e, 1);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Layer 1: Ethereal Floating Nebula Starfield (Luminous Points)
    const starCount = isMobile ? 350 : 750;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starScales = new Float32Array(starCount);
    const starSpeeds = new Float32Array(starCount);

    const palette = [
      new THREE.Color(0xa855f7), // Neon Purple
      new THREE.Color(0xc084fc), // Violet Light
      new THREE.Color(0x38bdf8), // Sky Blue
      new THREE.Color(0x818cf8), // Indigo
      new THREE.Color(0xffffff)  // Pure Starlight
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      // Cylindrical / Spherical distribution
      const radius = 15 + Math.random() * 45;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 80;

      starPositions[i3] = Math.cos(theta) * radius;
      starPositions[i3 + 1] = y;
      starPositions[i3 + 2] = Math.sin(theta) * radius - 10;

      const col = palette[Math.floor(Math.random() * palette.length)];
      starColors[i3] = col.r;
      starColors[i3 + 1] = col.g;
      starColors[i3 + 2] = col.b;

      starScales[i] = 1.0 + Math.random() * 2.5;
      starSpeeds[i] = 0.2 + Math.random() * 0.8;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: isMobile ? 2.4 : 3.2,
      map: particleTexture || undefined,
      vertexColors: true,
      transparent: true,
      opacity: isLight ? 0.45 : 0.75,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false
    });

    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);
    stateRef.current.starPoints = starPoints;

    // 5. Layer 2: Gentle Ambient Cosmic Wave Mesh (Ultra-fine minimalistic undulating grid)
    const waveCount = isMobile ? 120 : 250;
    const waveGeo = new THREE.BufferGeometry();
    const wavePositions = new Float32Array(waveCount * 3);
    const waveColors = new Float32Array(waveCount * 3);

    for (let i = 0; i < waveCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 50 - 5;
      const y = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 3 - 8;

      wavePositions[i3] = x;
      wavePositions[i3 + 1] = y;
      wavePositions[i3 + 2] = z;

      waveColors[i3] = 0.65;
      waveColors[i3 + 1] = 0.35;
      waveColors[i3 + 2] = 0.98;
    }

    waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
    waveGeo.setAttribute('color', new THREE.BufferAttribute(waveColors, 3));

    const waveMat = new THREE.PointsMaterial({
      size: isMobile ? 1.6 : 2.2,
      map: particleTexture || undefined,
      vertexColors: true,
      transparent: true,
      opacity: isLight ? 0.3 : 0.55,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false
    });

    const wavePoints = new THREE.Points(waveGeo, waveMat);
    scene.add(wavePoints);
    stateRef.current.dustPoints = wavePoints;

    // 6. Smooth Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation (Lerp)
      stateRef.current.currentMouse.x += (stateRef.current.targetMouse.x - stateRef.current.currentMouse.x) * 0.04;
      stateRef.current.currentMouse.y += (stateRef.current.targetMouse.y - stateRef.current.currentMouse.y) * 0.04;

      const mx = stateRef.current.currentMouse.x;
      const my = stateRef.current.currentMouse.y;

      // Subtle slow rotation of stardust
      if (starPoints) {
        starPoints.rotation.y = elapsedTime * 0.02 + mx * 0.08;
        starPoints.rotation.x = Math.sin(elapsedTime * 0.015) * 0.03 - my * 0.05;

        // Gentle floating particle breathing
        const pos = starGeo.attributes.position.array;
        for (let i = 0; i < starCount; i++) {
          const i3 = i * 3;
          pos[i3 + 1] += Math.sin(elapsedTime * starSpeeds[i] + i) * 0.012;
        }
        starGeo.attributes.position.needsUpdate = true;
      }

      // Gentle undulating cosmic wave
      if (wavePoints) {
        wavePoints.rotation.y = -elapsedTime * 0.015 - mx * 0.05;
        const wpos = waveGeo.attributes.position.array;
        for (let i = 0; i < waveCount; i++) {
          const i3 = i * 3;
          wpos[i3 + 1] = Math.sin(elapsedTime * 0.8 + wpos[i3] * 0.15) * 2.2 - 6;
        }
        waveGeo.attributes.position.needsUpdate = true;
      }

      // Camera responds elegantly to scroll & parallax
      const targetCamZ = 45 - scrollProgress * 18;
      const targetCamY = -scrollProgress * 25 + my * 2.5;
      const targetCamX = mx * 3.5;

      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;

      camera.lookAt(0, -scrollProgress * 20, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize Handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mobile = width < 768;

      camera.fov = mobile ? 60 : 50;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      starGeo.dispose();
      starMat.dispose();
      waveGeo.dispose();
      waveMat.dispose();
      if (particleTexture) particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        transition: 'background 0.5s ease'
      }}
    />
  );
}
