import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Sparkles, X, Shield, Cpu, Activity, Zap, Maximize2, Radio, Terminal, Code2, Layers, CheckCircle2 } from 'lucide-react';

export default function CyberMotionPlayer({ isOpen, onClose, initialSceneIndex = 0, lang = 'en' }) {
  const [activeScene, setActiveScene] = useState(initialSceneIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);

  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const scenes = [
    {
      id: 'architect',
      avatar: '/avatars/avatar_architect.jpg',
      icon: Cpu,
      titleAr: 'المهندس السيبراني • نواة البيانات الفائقة',
      titleEn: 'The Cyber Architect • Quantum Data Core',
      roleAr: 'معمارية الأنظمة والتزامن الفوري',
      roleEn: 'Systems Architect & Distributed Mesh Master',
      descAr: 'شخصية المهندس السيبراني وهو يوجه تدفق الخوارزميات وتحريك النواة الكمية المضيئة عبر منصة هولوغرافية عصبية.',
      descEn: 'Master systems architect orchestrating high-throughput data streams and quantum neural matrices.',
      color: '#a855f7',
      accentColor: '#38bdf8',
      badge: 'ARCHITECT_CORE_V1',
      stats: [
        { labelEn: 'Core Sync', labelAr: 'تزامن النواة', val: '99.98%' },
        { labelEn: 'Throughput', labelAr: 'معدل النقل', val: '100 GB/s' },
        { labelEn: 'Class', labelAr: 'الفئة', val: 'Systems Overlord' }
      ]
    },
    {
      id: 'sentinel',
      avatar: '/avatars/avatar_sentinel.jpg',
      icon: Shield,
      titleAr: 'حارسة الدفاع • درع الحماية السيبرانية',
      titleEn: 'The Sentinel Guardian • Cyber Defense Matrix',
      roleAr: 'أمان البنية التحتية واعتراض التهديدات',
      roleEn: 'Zero-Trust Infrastructure & Threat Nullifier',
      descAr: 'شخصية الدفاع السيبراني المدرعة بدرع طاقة هولوغرافي يصد التهديدات ويحصن خوادم الحوسبة السحابية.',
      descEn: 'Tactical anime defender commanding an impenetrable photonic shield that deflects active exploits.',
      color: '#f43f5e',
      accentColor: '#10b981',
      badge: 'DEFENSE_SENTINEL_24/7',
      stats: [
        { labelEn: 'Threat Intercept', labelAr: 'اعتراض التهديد', val: '100%' },
        { labelEn: 'Firewall Latency', labelAr: 'زمن الجدار', val: '0.12ms' },
        { labelEn: 'Class', labelAr: 'الفئة', val: 'Defense Valkyrie' }
      ]
    },
    {
      id: 'navigator',
      avatar: '/avatars/avatar_navigator.jpg',
      icon: Activity,
      titleAr: 'ملاحة الفضاء • شبكة المدارات السحابية',
      titleEn: 'The Network Navigator • Celestial Cloud Mesh',
      roleAr: 'توجيه حزم الألياف والمحطات المدارية',
      roleEn: 'Orbital Routing & Sub-5ms Space Highway',
      descAr: 'شخصية ملاح الأقمار والخوادم المدارية توجه مسارات البيانات بسرعة الضوء عبر الفضاء السيبراني.',
      descEn: 'Celestial network pilot coordinating satellite constellation mesh networks with sub-5ms latency.',
      color: '#38bdf8',
      accentColor: '#a855f7',
      badge: 'SUB_5MS_ORBIT_LINK',
      stats: [
        { labelEn: 'Packet Loss', labelAr: 'فقدان الحزم', val: '0.000%' },
        { labelEn: 'Orbit Relays', labelAr: 'العقد المدارية', val: '4,096 Nodes' },
        { labelEn: 'Class', labelAr: 'الفئة', val: 'Celestial Pilot' }
      ]
    },
    {
      id: 'alchemist',
      avatar: '/avatars/avatar_alchemist.jpg',
      icon: Zap,
      titleAr: 'كيميائي الأكواد • المترجم الفوري العالي',
      titleEn: 'The Code Alchemist • High-Perf Compiler',
      roleAr: 'توليف أكواد C++/Rust إلى طاقة برمجية',
      roleEn: 'Algorithmic Synthesis & Kernel Hacker',
      descAr: 'مهندس ومترجم الأكواد الفورية يولد الكريستالات الخوارزمية لرفع كفاءة المعالجة إلى أقصى حد.',
      descEn: 'Algorithmic sorcerer weaving pure Rust and C++ low-level memory constructs into blazing fast binaries.',
      color: '#10b981',
      accentColor: '#f59e0b',
      badge: 'HIGH_PERF_RUST_CORE',
      stats: [
        { labelEn: 'Compile Speed', labelAr: 'سرعة الترجمة', val: '0.02ms' },
        { labelEn: 'Efficiency', labelAr: 'الكفاءة', val: '99.9%' },
        { labelEn: 'Class', labelAr: 'الفئة', val: 'Kernel Sorcerer' }
      ]
    }
  ];

  const currentScene = scenes[activeScene];

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Synchronize initial scene when opened
  useEffect(() => {
    if (isOpen) {
      setActiveScene(initialSceneIndex);
      setProgress(0);
    }
  }, [isOpen, initialSceneIndex]);

  // Background Ambient Particle Aura Canvas Loop
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.0,
      vy: (Math.random() - 0.5) * 1.0,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.7 + 0.3
    }));

    let animId;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isPlaying) {
        angle += 0.02 * speed;
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.25 * speed));
      }

      // Draw Rotating Outer Energy Rings
      ctx.save();
      ctx.translate(width / 2, height / 2);

      ctx.beginPath();
      ctx.arc(0, 0, Math.min(width, height) * 0.36, 0, Math.PI * 2);
      ctx.strokeStyle = `${currentScene.color}30`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 12]);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, Math.min(width, height) * 0.42, angle, angle + Math.PI * 1.2);
      ctx.strokeStyle = `${currentScene.accentColor}45`;
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.stroke();

      ctx.restore();

      // Draw Floating Quantum Particles
      particles.forEach((p) => {
        if (isPlaying) {
          p.x += p.vx * speed;
          p.y += p.vy * speed;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${currentScene.color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = currentScene.color;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, activeScene, isPlaying, speed, currentScene]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(3, 2, 8, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        animation: 'fadeIn 0.22s ease-out'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel-glow"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '960px',
          maxHeight: '94vh',
          maxHeight: '94dvh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: '20px',
          border: `1px solid ${currentScene.color}40`,
          boxShadow: `0 0 50px ${currentScene.color}30, 0 25px 60px rgba(0,0,0,0.9)`,
          background: 'rgba(8, 4, 18, 0.97)',
          margin: 'auto 0.5rem'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header HUD Bar */}
        <div
          style={{
            padding: '0.85rem 1.1rem',
            paddingTop: 'max(0.85rem, var(--sat))',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            background: 'rgba(12, 6, 26, 0.7)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: `linear-gradient(135deg, ${currentScene.color}, ${currentScene.accentColor})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: `0 0 14px ${currentScene.color}`,
                flexShrink: 0
              }}
            >
              <currentScene.icon size={16} />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span className="font-cyber" style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', whiteSpace: 'nowrap' }}>
                  {lang === 'ar' ? currentScene.titleAr.split('•')[0] : currentScene.titleEn.split('•')[0]}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.62rem',
                    padding: '2px 6px',
                    borderRadius: '5px',
                    background: `${currentScene.color}25`,
                    border: `1px solid ${currentScene.color}60`,
                    color: currentScene.color,
                    fontWeight: 700
                  }}
                >
                  {currentScene.badge}
                </span>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {lang === 'ar' ? currentScene.roleAr : currentScene.roleEn}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="cyber-btn-secondary"
            style={{
              width: '36px',
              height: '36px',
              padding: 0,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            aria-label="إغلاق الشاشة السينمائية"
          >
            <X size={17} />
          </button>
        </div>

        {/* Main Stage & Studio Avatar Showcase */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            minHeight: '280px',
            maxHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: 'radial-gradient(circle at 50% 50%, rgba(20, 10, 42, 0.75), rgba(4, 2, 10, 0.98))'
          }}
        >
          {/* Background Ambient Canvas */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          />

          {/* Studio Anime Character Avatar Display */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animation: 'floatSlow 4s ease-in-out infinite'
            }}
          >
            {/* Holographic Glowing Frame */}
            <div
              style={{
                position: 'relative',
                width: 'clamp(180px, 28vw, 250px)',
                height: 'clamp(180px, 28vw, 250px)',
                borderRadius: '22px',
                padding: '4px',
                background: `linear-gradient(135deg, ${currentScene.color}, rgba(255,255,255,0.4), ${currentScene.accentColor})`,
                boxShadow: `0 0 35px ${currentScene.color}60, 0 15px 35px rgba(0,0,0,0.8)`
              }}
            >
              <img
                src={currentScene.avatar}
                alt={currentScene.titleEn}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '18px',
                  display: 'block'
                }}
              />

              {/* Status HUD Tag on Avatar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(6, 4, 14, 0.88)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${currentScene.color}80`,
                  borderRadius: '999px',
                  padding: '2px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.6)'
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: currentScene.color,
                    boxShadow: `0 0 8px ${currentScene.color}`
                  }}
                />
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.64rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '0.04em'
                  }}
                >
                  LIVE SYNAPSE ACTIVE
                </span>
              </div>
            </div>

            {/* Micro Stats Pills under Avatar */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                marginTop: '0.85rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                padding: '0 0.5rem'
              }}
            >
              {currentScene.stats.map((s, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(15, 8, 30, 0.8)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '9px',
                    padding: '3px 8px',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                    {lang === 'ar' ? s.labelAr : s.labelEn}
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.74rem', fontWeight: 800, color: currentScene.accentColor }}>
                    {s.val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Avatar Character Switcher Tabs - Mobile Swipeable Snap Pills */}
        <div
          className="no-scrollbar"
          style={{
            padding: '0.65rem 0.85rem',
            background: 'rgba(10, 5, 22, 0.9)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory'
          }}
        >
          {scenes.map((sc, idx) => {
            const isSelected = activeScene === idx;
            return (
              <button
                key={sc.id}
                onClick={() => {
                  setActiveScene(idx);
                  setProgress(0);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 10px',
                  borderRadius: '12px',
                  background: isSelected ? `${sc.color}25` : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${isSelected ? sc.color : 'rgba(255, 255, 255, 0.1)'}`,
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  flex: '1 0 auto',
                  minWidth: '135px',
                  scrollSnapAlign: 'start',
                  minHeight: '44px',
                  touchAction: 'manipulation'
                }}
              >
                {/* Circular Mini Avatar Icon */}
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: `1.5px solid ${isSelected ? sc.color : 'rgba(255,255,255,0.2)'}`,
                    boxShadow: isSelected ? `0 0 10px ${sc.color}` : 'none'
                  }}
                >
                  <img
                    src={sc.avatar}
                    alt={sc.titleEn}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ overflow: 'hidden', minWidth: 0 }}>
                  <div
                    className="font-cyber"
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {lang === 'ar' ? sc.titleAr.split('•')[0] : sc.titleEn.split('•')[0]}
                  </div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {sc.badge.split('_')[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Player Controls Bar */}
        <div
          style={{
            padding: '0.65rem 1rem',
            paddingBottom: 'max(0.75rem, var(--sab))',
            background: 'rgba(7, 3, 16, 0.95)',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}
        >
          {/* Play/Pause & Speed */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="cyber-btn-secondary"
              style={{
                width: '38px',
                height: '38px',
                padding: 0,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isPlaying ? 'rgba(168, 85, 247, 0.15)' : 'var(--color-surface)',
                borderColor: isPlaying ? 'var(--neon-purple)' : 'var(--color-border)'
              }}
              title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل الحركة'}
            >
              {isPlaying ? <Pause size={16} style={{ color: 'var(--neon-purple)' }} /> : <Play size={16} />}
            </button>

            <button
              onClick={() => setSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
              className="cyber-btn-secondary"
              style={{
                padding: '6px 10px',
                fontSize: '0.74rem',
                borderRadius: '10px',
                minHeight: '38px'
              }}
            >
              <span className="font-mono" style={{ fontWeight: 700 }}>{speed}x</span>
            </button>
          </div>

          {/* Timeline progress line */}
          <div style={{ flex: 1, margin: '0 8px' }}>
            <div
              style={{
                height: '5px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '999px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${currentScene.color}, ${currentScene.accentColor})`,
                  borderRadius: '999px',
                  boxShadow: `0 0 8px ${currentScene.color}`
                }}
              />
            </div>
          </div>

          <div className="font-mono" style={{ fontSize: '0.68rem', color: currentScene.color, fontWeight: 700, flexShrink: 0 }}>
            {Math.round(progress)}%
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
