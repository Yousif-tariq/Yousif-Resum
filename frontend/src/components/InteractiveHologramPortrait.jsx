import React, { useState, useRef, useEffect } from 'react';
import profileImg from '../assets/profile.jpeg';
import profileAltImg from '../assets/profile-alt.jpg';
import { Target, Scan, Sparkles, Activity, Layers } from 'lucide-react';

export default function InteractiveHologramPortrait({ name, lang, primaryPhoto, alterEgoPhoto }) {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 }); // in percentages
  const [lensRadius, setLensRadius] = useState(0); // in pixels
  const [dwellSharpness, setDwellSharpness] = useState(0); // 0 to 1
  const [activeRegion, setActiveRegion] = useState('STANDBY');
  
  const displayPrimaryImg = primaryPhoto || profileImg;
  const displayAlterEgoImg = alterEgoPhoto || profileAltImg;
  
  const cardRef = useRef(null);
  const dwellTimerRef = useRef(null);
  const animFrameRef = useRef(null);
  const targetPosRef = useRef({ x: 50, y: 50 });
  const currentPosRef = useRef({ x: 50, y: 50 });

  // Region classification based on Y coordinate
  const detectRegion = (yPct, xPct) => {
    if (yPct < 32) {
      return lang === 'ar' ? 'منطقة الرأس • CRANIAL_CORE' : 'HEAD / CRANIAL REGION';
    } else if (yPct < 60) {
      return lang === 'ar' ? 'منطقة الصدر والكتف • THORAX & EMBLEM' : 'CHEST & SYMBIOTE EMBLEM';
    } else if (yPct < 85) {
      return lang === 'ar' ? 'منطقة اليدين والجهاز • NEURAL_HANDS' : 'HANDS & DEVICE INTERFACE';
    } else {
      return lang === 'ar' ? 'المحيط والبيئة • BIOMETRIC_LOWER' : 'LOWER BIOMETRIC FIELD';
    }
  };

  useEffect(() => {
    let lastTime = performance.now();

    const updateLoop = (now) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      currentPosRef.current.x += (targetPosRef.current.x - currentPosRef.current.x) * 0.24;
      currentPosRef.current.y += (targetPosRef.current.y - currentPosRef.current.y) * 0.24;

      setCursorPos({
        x: currentPosRef.current.x,
        y: currentPosRef.current.y
      });

      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const pctX = Math.max(0, Math.min(100, (clientX / rect.width) * 100));
    const pctY = Math.max(0, Math.min(100, (clientY / rect.height) * 100));

    targetPosRef.current = { x: pctX, y: pctY };
    setActiveRegion(detectRegion(pctY, pctX));

    // 3D Card Tilt with smooth limits
    const normX = clientX / rect.width - 0.5;
    const normY = clientY / rect.height - 0.5;
    setTilt({ x: normX * 12, y: -normY * 12 });

    setDwellSharpness(0.85);
    setLensRadius(160);

    clearTimeout(dwellTimerRef.current);
    dwellTimerRef.current = setTimeout(() => {
      setDwellSharpness(1.0);
      setLensRadius(190);
    }, 60);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setLensRadius(160);
    setDwellSharpness(0.85);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setLensRadius(0);
    setDwellSharpness(0);
    setActiveRegion('STANDBY');
    clearTimeout(dwellTimerRef.current);
  };

  const maskStyle = {
    WebkitMaskImage: isHovered
      ? `radial-gradient(circle ${lensRadius}px at ${cursorPos.x}% ${cursorPos.y}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 55%, rgba(0,0,0,0.4) 80%, transparent 100%)`
      : 'none',
    maskImage: isHovered
      ? `radial-gradient(circle ${lensRadius}px at ${cursorPos.x}% ${cursorPos.y}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 55%, rgba(0,0,0,0.4) 80%, transparent 100%)`
      : 'none'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', width: '100%', maxWidth: '390px' }}>
      
      {/* 3D Perspective Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: '1200px',
          width: '100%',
          aspectRatio: '3/4',
          cursor: 'default',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '24px',
            padding: '8px',
            background: isHovered
              ? 'linear-gradient(135deg, var(--neon-purple), var(--neon-magenta), var(--color-surface))'
              : 'linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(244, 63, 94, 0.35), var(--color-surface))',
            boxShadow: isHovered
              ? '0 0 35px rgba(168, 85, 247, 0.45), 0 25px 60px rgba(0, 0, 0, 0.85)'
              : 'var(--glow-purple), 0 20px 50px rgba(0,0,0,0.7)',
            transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
            transition: 'transform 0.15s ease-out, box-shadow 0.4s ease',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Inner Viewport Window */}
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
              background: '#04020a'
            }}
          >
            
            {/* LAYER 1: Base Primary Photo (Developer Mode) */}
            <img
              src={displayPrimaryImg}
              alt="Yousif Tariq - Developer Base Layer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                filter: 'contrast(1.1) brightness(1.02)',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none'
              }}
            />

            {/* LAYER 2: LOCALIZED REGION MASKED LAYER (Alter-Ego Hero Mode) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                ...maskStyle,
                pointerEvents: 'none',
                transition: 'opacity 0.15s ease',
                opacity: isHovered ? 1 : 0
              }}
            >
              <img
                src={displayAlterEgoImg}
                alt="Yousif Tariq - Alter Ego Localized Region"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 25%',
                  filter: `contrast(1.22) brightness(${1.0 + dwellSharpness * 0.12}) saturate(1.28) blur(${Math.max(0, (1 - dwellSharpness) * 0.8)}px)`,
                  transition: 'filter 0.12s ease'
                }}
              />

              {/* Glowing Edge Gradient */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at center, transparent 45%, rgba(168, 85, 247, 0.2) 80%, rgba(244, 63, 94, 0.3) 100%)',
                  mixBlendMode: 'screen'
                }}
              />
            </div>

            {/* Tech Corner Brackets */}
            <div style={{ position: 'absolute', top: '12px', left: '12px', borderTop: '2px solid var(--neon-purple)', borderLeft: '2px solid var(--neon-purple)', width: '16px', height: '16px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '12px', right: '12px', borderTop: '2px solid var(--neon-purple)', borderRight: '2px solid var(--neon-purple)', width: '16px', height: '16px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', borderBottom: '2px solid var(--neon-magenta)', borderLeft: '2px solid var(--neon-magenta)', width: '16px', height: '16px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '12px', right: '12px', borderBottom: '2px solid var(--neon-magenta)', borderRight: '2px solid var(--neon-magenta)', width: '16px', height: '16px', pointerEvents: 'none' }} />

            {/* Bottom HUD Info Bar */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                backdropFilter: 'blur(14px)',
                background: 'rgba(8, 4, 20, 0.88)',
                border: '1px solid rgba(168, 85, 247, 0.35)',
                borderRadius: '12px',
                padding: '10px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pointerEvents: 'none'
              }}
            >
              <div>
                <div className="font-cyber" style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>
                  {name}
                </div>
                <div className="font-mono" style={{ fontSize: '0.7rem', color: isHovered ? 'var(--neon-violet-light)' : '#a1a1aa' }}>
                  {isHovered ? `COORDS: [X:${Math.round(cursorPos.x)}% Y:${Math.round(cursorPos.y)}%]` : 'HOVER TO REVEAL REGION'}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: isHovered ? 'var(--neon-purple)' : 'var(--neon-emerald)',
                    boxShadow: isHovered ? '0 0 10px var(--neon-purple)' : '0 0 8px var(--neon-emerald)',
                    animation: 'cyber-pulse 1.2s infinite'
                  }}
                />
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.68rem',
                    color: isHovered ? 'var(--neon-violet-light)' : 'var(--neon-emerald)',
                    fontWeight: 700
                  }}
                >
                  {isHovered ? 'ACTIVE SCAN ⚡' : 'READY 🟢'}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Polished Glass Guide Note */}
      <div
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '999px',
          border: '1px solid var(--color-border)',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)'
        }}
      >
        <Scan size={14} style={{ color: 'var(--neon-purple)' }} />
        <span>
          {lang === 'ar'
            ? 'حرّك المؤشر فوق أي منطقة (الرأس، الصدر، اليدين) لكشف الجزء المطابق بدقة متناهية'
            : 'Hover cursor over any section (Head, Chest, Hands) to reveal the matching region'}
        </span>
      </div>

      <style>{`
        @keyframes spinReticle {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
