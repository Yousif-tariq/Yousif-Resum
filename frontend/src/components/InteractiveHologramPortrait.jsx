import React, { useState, useRef, useEffect } from 'react';
import profileImg from '../assets/profile.jpeg';
import profileAltImg from '../assets/profile-alt.jpg';
import { Target, Scan, Activity, Zap } from 'lucide-react';

export default function InteractiveHologramPortrait({ name, lang, primaryPhoto, alterEgoPhoto }) {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 38 });
  const [activeRegion, setActiveRegion] = useState('STANDBY');
  const [autoScan, setAutoScan] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const displayPrimaryImg = primaryPhoto || profileImg;
  const displayAlterEgoImg = alterEgoPhoto || profileAltImg;
  
  const cardRef = useRef(null);
  const animFrameRef = useRef(null);
  const targetPosRef = useRef({ x: 50, y: 38 });
  const currentPosRef = useRef({ x: 50, y: 38 });
  const autoScanAngleRef = useRef(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouch);
    }
  }, []);

  const detectRegion = (yPct) => {
    if (yPct < 35) {
      return lang === 'ar' ? 'منطقة الرأس • CRANIAL_CORE' : 'HEAD / CRANIAL REGION';
    } else if (yPct < 62) {
      return lang === 'ar' ? 'منطقة الصدر • THORAX_MATRIX' : 'CHEST & EMBLEM';
    } else if (yPct < 85) {
      return lang === 'ar' ? 'منطقة اليدين • NEURAL_INTERFACE' : 'HANDS & DEVICE INTERFACE';
    } else {
      return lang === 'ar' ? 'المحيط • BIOMETRIC_LOWER' : 'BIOMETRIC FIELD';
    }
  };

  // Run interpolation only when active or in autoScan mode
  useEffect(() => {
    let lastTime = performance.now();

    const updateLoop = (now) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (autoScan && !isHovered) {
        autoScanAngleRef.current += delta * 1.6;
        const autoX = 50 + Math.sin(autoScanAngleRef.current) * 26;
        const autoY = 44 + Math.cos(autoScanAngleRef.current * 0.8) * 30;
        targetPosRef.current = { x: autoX, y: autoY };
        setActiveRegion(detectRegion(autoY));
      }

      currentPosRef.current.x += (targetPosRef.current.x - currentPosRef.current.x) * 0.25;
      currentPosRef.current.y += (targetPosRef.current.y - currentPosRef.current.y) * 0.25;

      setCursorPos({
        x: Math.round(currentPosRef.current.x * 10) / 10,
        y: Math.round(currentPosRef.current.y * 10) / 10
      });

      if (isHovered || autoScan) {
        animFrameRef.current = requestAnimationFrame(updateLoop);
      }
    };

    if (isHovered || autoScan) {
      animFrameRef.current = requestAnimationFrame(updateLoop);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [autoScan, isHovered, lang]);

  const processPosition = (clientX, clientY) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const pctX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const pctY = Math.max(0, Math.min(100, (y / rect.height) * 100));

    targetPosRef.current = { x: pctX, y: pctY };
    setActiveRegion(detectRegion(pctY));

    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    setTilt({ x: normX * 8, y: -normY * 8 });
  };

  const handleMouseMove = (e) => {
    processPosition(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      setIsHovered(true);
      processPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchStart = (e) => {
    setIsHovered(true);
    if (e.touches && e.touches[0]) {
      processPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsHovered(false);
      setTilt({ x: 0, y: 0 });
    }, 1800);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    if (!autoScan) {
      setActiveRegion('STANDBY');
    }
  };

  const isRevealing = isHovered || autoScan;
  const lensRadius = isTouchDevice ? 125 : 150;

  const maskStyle = {
    WebkitMaskImage: isRevealing
      ? `radial-gradient(circle ${lensRadius}px at ${cursorPos.x}% ${cursorPos.y}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.3) 80%, transparent 100%)`
      : 'none',
    maskImage: isRevealing
      ? `radial-gradient(circle ${lensRadius}px at ${cursorPos.x}% ${cursorPos.y}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.3) 80%, transparent 100%)`
      : 'none'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem', width: '100%', maxWidth: 'min(100%, 370px)', margin: '0 auto' }}>
      
      {/* 3D Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          perspective: '1000px',
          width: '100%',
          aspectRatio: '3/4',
          cursor: 'crosshair',
          position: 'relative',
          touchAction: 'none'
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '24px',
            padding: '6px',
            background: isRevealing
              ? 'linear-gradient(135deg, var(--neon-purple), var(--neon-cyan), var(--color-surface))'
              : 'linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(6, 182, 212, 0.3), var(--color-surface))',
            boxShadow: isRevealing
              ? '0 0 35px rgba(168, 85, 247, 0.45), 0 20px 50px rgba(0, 0, 0, 0.85)'
              : '0 0 25px rgba(168, 85, 247, 0.25), 0 15px 40px rgba(0, 0, 0, 0.65)',
            transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            transition: 'transform 0.15s ease-out, box-shadow 0.3s ease'
          }}
        >
          {/* Viewport Window */}
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '18px',
              overflow: 'hidden',
              position: 'relative',
              background: '#04020a'
            }}
          >
            
            {/* Base Primary Photo */}
            <img
              src={displayPrimaryImg}
              alt="Yousif Tariq - Primary Engineer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                filter: 'contrast(1.08) brightness(1.02)',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none'
              }}
            />

            {/* Localized Alter-Ego Layer */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                ...maskStyle,
                pointerEvents: 'none',
                opacity: isRevealing ? 1 : 0,
                transition: 'opacity 0.15s ease'
              }}
            >
              <img
                src={displayAlterEgoImg}
                alt="Yousif Tariq - Cyber Alter Ego"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 25%',
                  filter: 'contrast(1.22) brightness(1.08) saturate(1.25)'
                }}
              />

              {/* Holographic Cyan Reticle */}
              <div
                style={{
                  position: 'absolute',
                  top: `${cursorPos.y}%`,
                  left: `${cursorPos.x}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  border: '1.5px dashed var(--neon-cyan)',
                  boxShadow: '0 0 16px rgba(6, 182, 212, 0.6)',
                  pointerEvents: 'none',
                  animation: 'spinReticle 6s linear infinite'
                }}
              />
            </div>

            {/* Scan Laser Line */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--neon-purple), var(--neon-cyan), transparent)',
                top: `${cursorPos.y}%`,
                opacity: isRevealing ? 0.8 : 0.15,
                pointerEvents: 'none'
              }}
            />

            {/* Corner Brackets */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', borderTop: '2px solid var(--neon-purple)', borderLeft: '2px solid var(--neon-purple)', width: '14px', height: '14px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '10px', right: '10px', borderTop: '2px solid var(--neon-purple)', borderRight: '2px solid var(--neon-purple)', width: '14px', height: '14px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', borderBottom: '2px solid var(--neon-cyan)', borderLeft: '2px solid var(--neon-cyan)', width: '14px', height: '14px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', borderBottom: '2px solid var(--neon-cyan)', borderRight: '2px solid var(--neon-cyan)', width: '14px', height: '14px', pointerEvents: 'none' }} />

            {/* Top Right Region Badge */}
            <div
              className="font-mono"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(8, 4, 20, 0.85)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '8px',
                padding: '2px 8px',
                fontSize: '0.64rem',
                color: 'var(--neon-violet-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                pointerEvents: 'none'
              }}
            >
              <Activity size={11} className="animate-pulse-glow" style={{ color: 'var(--neon-cyan)' }} />
              <span>{isRevealing ? activeRegion.split('•')[0] : 'NEURAL v2.6'}</span>
            </div>

            {/* Bottom Status Bar */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                right: '12px',
                background: 'rgba(7, 3, 16, 0.9)',
                border: '1px solid rgba(168, 85, 247, 0.35)',
                borderRadius: '10px',
                padding: '8px 12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pointerEvents: 'none'
              }}
            >
              <div>
                <div className="font-cyber" style={{ fontSize: '0.84rem', fontWeight: 800, color: '#ffffff' }}>
                  {name}
                </div>
                <div className="font-mono" style={{ fontSize: '0.66rem', color: isRevealing ? 'var(--neon-violet-light)' : '#9ca3af' }}>
                  {isRevealing ? `[X:${Math.round(cursorPos.x)}% Y:${Math.round(cursorPos.y)}%]` : (isTouchDevice ? 'TOUCH TO SCAN' : 'HOVER TO REVEAL')}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: isRevealing ? 'var(--neon-cyan)' : 'var(--neon-emerald)',
                    boxShadow: isRevealing ? '0 0 8px var(--neon-cyan)' : '0 0 8px var(--neon-emerald)'
                  }}
                />
                <span className="font-mono" style={{ fontSize: '0.64rem', color: isRevealing ? 'var(--neon-cyan)' : 'var(--neon-emerald)', fontWeight: 700 }}>
                  {isRevealing ? 'SCAN ⚡' : 'ONLINE'}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Control Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'center' }}>
        <button
          onClick={() => setAutoScan(prev => !prev)}
          className="cyber-btn-secondary"
          style={{
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '0.78rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: autoScan ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(6, 182, 212, 0.3))' : 'var(--color-surface)',
            borderColor: autoScan ? 'var(--neon-cyan)' : 'var(--color-border)',
            color: autoScan ? 'var(--neon-cyan)' : 'var(--text-secondary)',
            minHeight: '34px'
          }}
        >
          <Zap size={13} style={{ color: autoScan ? 'var(--neon-cyan)' : 'var(--neon-purple)' }} />
          <span>{autoScan ? (lang === 'ar' ? 'إيقاف المسح' : 'Stop Scan') : (lang === 'ar' ? 'مسح آلي ⚡' : 'Auto Scan ⚡')}</span>
        </button>

        <div
          className="glass-panel"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '6px 12px',
            borderRadius: '999px',
            border: '1px solid var(--color-border)',
            fontSize: '0.73rem',
            color: 'var(--text-secondary)',
            minHeight: '34px'
          }}
        >
          <Scan size={12} style={{ color: 'var(--neon-purple)', flexShrink: 0 }} />
          <span>
            {lang === 'ar'
              ? (isTouchDevice ? 'اسحب إصبعك للكشف' : 'حرّك المؤشر للكشف')
              : (isTouchDevice ? 'Drag to reveal' : 'Hover to reveal')}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes spinReticle {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
