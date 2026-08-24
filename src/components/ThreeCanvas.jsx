import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas({ scrollProgress = 0, mousePos = { x: 0, y: 0 }, theme = 'dark' }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const stateRef = useRef({
    particles: null,
    lightTrails: [],
    cityBuildings: [],
    portalRings: [],
    coreGroup: null,
    gridFloor: null,
    gridCeiling: null,
    lights: []
  });

  // Handle Theme Switching in 3D Scene
  useEffect(() => {
    if (!sceneRef.current) return;
    const isLight = theme === 'light';

    // Update Fog Color
    sceneRef.current.fog.color.setHex(isLight ? 0xf5f3ff : 0x04020a);

    // Update Building Colors
    stateRef.current.cityBuildings.forEach(({ tower, wire }) => {
      if (isLight) {
        tower.material.color.setHex(0xe9d5ff);
        tower.material.emissive.setHex(0xf3e8ff);
        wire.material.color.setHex(0x9333ea);
        wire.material.opacity = 0.28;
      } else {
        tower.material.color.setHex(0x090518);
        tower.material.emissive.setHex(0x1a0b2e);
        wire.material.color.setHex(0xa855f7);
        wire.material.opacity = 0.22;
      }
    });

    // Update Lights
    if (stateRef.current.lights.length >= 3) {
      const [pLight, mLight, cLight] = stateRef.current.lights;
      if (isLight) {
        pLight.color.setHex(0x9333ea);
        pLight.intensity = 6;
        mLight.color.setHex(0xe11d48);
        mLight.intensity = 5;
      } else {
        pLight.color.setHex(0xa855f7);
        pLight.intensity = 5;
        mLight.color.setHex(0xf43f5e);
        mLight.intensity = 4.5;
      }
    }

    // Update Grids
    if (stateRef.current.gridFloor) {
      stateRef.current.gridFloor.material.opacity = isLight ? 0.25 : 0.38;
    }
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Volumetric Exponential Fog
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(theme === 'light' ? 0xf5f3ff : 0x04020a, 0.021);

    // 2. Perspective Camera
    const isMobile = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 68 : 60,
      window.innerWidth / window.innerHeight,
      0.1,
      1200
    );
    camera.position.set(0, 0, 18);
    cameraRef.current = camera;

    // 3. WebGL Renderer with High Dynamic Range
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile || window.devicePixelRatio < 2,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. Dynamic Lighting System
    const ambientLight = new THREE.AmbientLight(0x130a26, 2.2);
    scene.add(ambientLight);

    const purplePointLight = new THREE.PointLight(0xa855f7, 5, 90);
    purplePointLight.position.set(10, 8, 12);
    scene.add(purplePointLight);

    const magentaPointLight = new THREE.PointLight(0xf43f5e, 4.5, 90);
    magentaPointLight.position.set(-10, -8, 8);
    scene.add(magentaPointLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 2.5, 60);
    cyanPointLight.position.set(0, 12, 5);
    scene.add(cyanPointLight);

    stateRef.current.lights = [purplePointLight, magentaPointLight, cyanPointLight];

    // 5. Cyberpunk City Towers & Monoliths
    const buildingsGroup = new THREE.Group();
    const cityBuildings = [];
    const buildingGeo = new THREE.BoxGeometry(1, 1, 1);

    const buildingMatWire = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });

    const buildingMatSolid = new THREE.MeshStandardMaterial({
      color: 0x090518,
      roughness: 0.2,
      metalness: 0.95,
      emissive: 0x1a0b2e,
      emissiveIntensity: 0.55
    });

    for (let i = 0; i < 48; i++) {
      const isLeft = i % 2 === 0;
      const xPos = isLeft ? -16 - Math.random() * 14 : 16 + Math.random() * 14;
      const zPos = 20 - i * 4.5;
      const height = 12 + Math.random() * 32;
      const width = 3 + Math.random() * 5;
      const depth = 3 + Math.random() * 6;

      const towerMesh = new THREE.Mesh(buildingGeo, buildingMatSolid);
      towerMesh.scale.set(width, height, depth);
      towerMesh.position.set(xPos, height / 2 - 12, zPos);

      const wireMesh = new THREE.Mesh(buildingGeo, buildingMatWire);
      wireMesh.scale.set(width * 1.01, height * 1.01, depth * 1.01);
      wireMesh.position.copy(towerMesh.position);

      buildingsGroup.add(towerMesh);
      buildingsGroup.add(wireMesh);
      cityBuildings.push({ tower: towerMesh, wire: wireMesh, initY: towerMesh.position.y });
    }
    scene.add(buildingsGroup);
    stateRef.current.cityBuildings = cityBuildings;

    // 6. Neon Light Trails / Data Highways
    const trailCount = 18;
    const lightTrails = [];

    for (let i = 0; i < trailCount; i++) {
      const angle = (i / trailCount) * Math.PI * 2;
      const radius = 9 + (i % 3) * 3;
      const colorVal = i % 3 === 0 ? 0xa855f7 : i % 3 === 1 ? 0xf43f5e : 0xc084fc;

      const points = [];
      for (let z = 25; z >= -120; z -= 15) {
        const spiralX = Math.cos(angle + z * 0.03) * radius;
        const spiralY = Math.sin(angle + z * 0.03) * radius * 0.7;
        points.push(new THREE.Vector3(spiralX, spiralY, z));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 70, 0.06, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: colorVal,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });

      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      scene.add(tubeMesh);
      lightTrails.push(tubeMesh);
    }
    stateRef.current.lightTrails = lightTrails;

    // 7. Volumetric Starfield & Cyber Dust (2500 Particles)
    const particleCount = 2500;
    const pGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0xa855f7);
    const c2 = new THREE.Color(0xf43f5e);
    const c3 = new THREE.Color(0xc084fc);
    const c4 = new THREE.Color(0x00f0ff);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 55;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 55;
      positions[i * 3 + 2] = Math.random() * 140 - 110;

      const rVal = Math.random();
      const col = rVal < 0.45 ? c1 : rVal < 0.75 ? c2 : rVal < 0.9 ? c3 : c4;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    pGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(pGeometry, pMaterial);
    scene.add(particles);
    stateRef.current.particles = particles;

    // 8. Dimensional Portal Gateway Rings
    const portalRings = [];
    const ringGeo = new THREE.TorusGeometry(4.8, 0.05, 16, 120);

    for (let i = 0; i < 10; i++) {
      const isPurple = i % 2 === 0;
      const ringMat = new THREE.MeshBasicMaterial({
        color: isPurple ? 0xa855f7 : 0xf43f5e,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = 15 - i * 14;
      scene.add(ring);
      portalRings.push(ring);
    }
    stateRef.current.portalRings = portalRings;

    // 9. Central Quantum Core Entity
    const coreGroup = new THREE.Group();
    const icoGeo = new THREE.IcosahedronGeometry(2.0, 2);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x05020c,
      emissive: 0xa855f7,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.95,
      wireframe: true
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    const gyroMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const gyroRing1 = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.03, 16, 80), gyroMat);
    const gyroRing2 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.03, 16, 80), gyroMat);
    gyroRing1.rotation.x = Math.PI / 3;
    gyroRing2.rotation.y = Math.PI / 4;
    coreGroup.add(gyroRing1);
    coreGroup.add(gyroRing2);

    coreGroup.position.set(0, 0, 5);
    scene.add(coreGroup);
    stateRef.current.coreGroup = coreGroup;

    // 10. Infinite Cyber Grid Floor & Ceiling
    const gridFloor = new THREE.GridHelper(120, 60, 0xa855f7, 0x2e1065);
    gridFloor.position.y = -9;
    gridFloor.material.transparent = true;
    gridFloor.material.opacity = 0.38;
    scene.add(gridFloor);
    stateRef.current.gridFloor = gridFloor;

    const gridCeiling = new THREE.GridHelper(120, 60, 0xf43f5e, 0x2e1065);
    gridCeiling.position.y = 14;
    gridCeiling.material.transparent = true;
    gridCeiling.material.opacity = 0.22;
    scene.add(gridCeiling);
    stateRef.current.gridCeiling = gridCeiling;

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (coreGroup) {
        coreGroup.rotation.x = elapsedTime * 0.25;
        coreGroup.rotation.y = elapsedTime * 0.35;
        gyroRing1.rotation.z = elapsedTime * 0.4;
        gyroRing2.rotation.x = -elapsedTime * 0.3;
      }

      portalRings.forEach((ring, idx) => {
        ring.rotation.z = elapsedTime * (0.12 + idx * 0.04) * (idx % 2 === 0 ? 1 : -1);
      });

      if (particles) {
        particles.rotation.z = elapsedTime * 0.015;
      }

      if (gridFloor) {
        gridFloor.position.z = (elapsedTime * 3.5) % 2.0 - 9;
      }
      if (gridCeiling) {
        gridCeiling.position.z = (elapsedTime * 3.5) % 2.0 - 9;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!camera || !renderer) return;
      const isMob = window.innerWidth < 768;
      camera.fov = isMob ? 68 : 60;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update 3D Camera Depth & Parallax
  useEffect(() => {
    if (!cameraRef.current) return;

    const targetZ = 18 - scrollProgress * 115;
    cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.12;

    const targetX = mousePos.x * 3.5;
    const targetY = -mousePos.y * 2.8;

    cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.06;
    cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.06;

    cameraRef.current.lookAt(targetX * 0.35, targetY * 0.35, cameraRef.current.position.z - 15);

    if (stateRef.current.coreGroup) {
      const core = stateRef.current.coreGroup;
      const distFromCore = cameraRef.current.position.z - core.position.z;
      if (distFromCore < 5 && distFromCore > -12) {
        const expand = Math.max(1, 1 + (5 - distFromCore) * 0.85);
        core.scale.set(expand, expand, expand);
      }
    }
  }, [scrollProgress, mousePos]);

  return (
    <div
      ref={containerRef}
      className="webgl-canvas-container"
      aria-hidden="true"
    />
  );
}
