import React, { useState } from 'react';
import { ArrowDown, Sparkles, Terminal, Zap, Shield, Radio, Activity, Cpu, Film, Play } from 'lucide-react';
import InteractiveHologramPortrait from './InteractiveHologramPortrait';
import CyberMotionPlayer from './CyberMotionPlayer';

export default function HeroRealm({ data, lang }) {
  const [cinemaOpen, setCinemaOpen] = useState(false);
  const [selectedScene, setSelectedScene] = useState(0);

  const scrollToNext = () => {
    const el = document.getElementById('skills');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openCinemaScene = (sceneIdx = 0) => {
    setSelectedScene(sceneIdx);
    setCinemaOpen(true);
  };

  return (
    <section id="hero" className="realm-section" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="max-w-7xl" style={{ width: '100%' }}>
        
        {/* Top Floating Cyber Badge & Animated Cinema Pill */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: 'clamp(1rem, 2.5vw, 1.75rem)' }}>
          <div className="cyber-badge" style={{ padding: '6px 14px', fontSize: 'clamp(0.74rem, 1.8vw, 0.84rem)' }}>
            <Sparkles size={13} style={{ color: 'var(--neon-purple)' }} />
            <span>{data.badge}</span>
          </div>

          <button
            onClick={() => openCinemaScene(0)}
            className="cyber-btn-secondary"
            style={{
              padding: '5px 12px',
              borderRadius: '999px',
              fontSize: '0.74rem',
              borderColor: 'var(--neon-cyan)',
              color: 'var(--neon-cyan)',
              background: 'rgba(6, 182, 212, 0.1)',
              minHeight: '32px'
            }}
          >
            <Film size={13} style={{ color: 'var(--neon-cyan)' }} />
            <span>{lang === 'ar' ? 'المشاهد الحركية والكرتونية 🎬' : 'Holo-Cinema Scenes 🎬'}</span>
          </button>
        </div>

        {/* Hero Grid: Profile Hologram Frame & Bio Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            alignItems: 'center',
            gap: 'clamp(1.5rem, 3.5vw, 3rem)',
            marginBottom: 'clamp(1.75rem, 3.5vw, 2.75rem)'
          }}
        >
          
          {/* Layered Masking & Sliced Reveal Hologram Portrait */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '100%' }}>
            <InteractiveHologramPortrait 
              name={data.name} 
              lang={lang} 
              primaryPhoto={data.primaryPhoto}
              alterEgoPhoto={data.alterEgoPhoto}
            />

            {/* Quick Anime Avatar Cinema Launch Capsule */}
            <div
              onClick={() => openCinemaScene(0)}
              className="glass-panel"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '14px',
                width: 'min(100%, 360px)',
                cursor: 'pointer',
                border: '1px solid rgba(168, 85, 247, 0.35)',
                background: 'rgba(14, 8, 30, 0.88)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* 4 Stacked Mini Anime Avatars */}
                <div style={{ display: 'flex', alignItems: 'center', marginInlineEnd: '4px' }}>
                  {['/avatars/avatar_architect.jpg', '/avatars/avatar_sentinel.jpg', '/avatars/avatar_navigator.jpg', '/avatars/avatar_alchemist.jpg'].map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt="Avatar"
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1.5px solid #a855f7',
                        marginLeft: idx === 0 ? 0 : '-7px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                      }}
                    />
                  ))}
                </div>
                <div>
                  <div className="font-cyber" style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {lang === 'ar' ? 'افتارات الأنمي التفاعلية' : 'Interactive Anime Avatars'}
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.64rem', color: 'var(--neon-violet-light)' }}>
                    4 STUDIO CYBER AVATARS [LIVE]
                  </div>
                </div>
              </div>
              <Sparkles size={14} style={{ color: 'var(--neon-cyan)', flexShrink: 0 }} />
            </div>
          </div>

          {/* Hero Typography & Actions */}
          <div style={{ textAlign: lang === 'ar' ? 'right' : 'left', width: '100%' }}>
            
            <div
              className="font-mono"
              style={{
                color: 'var(--neon-purple)',
                fontSize: 'clamp(0.74rem, 1.8vw, 0.88rem)',
                fontWeight: 700,
                letterSpacing: '0.06em',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                justifyContent: 'flex-start'
              }}
            >
              <Radio size={14} className="animate-pulse-glow" style={{ color: 'var(--neon-purple)', flexShrink: 0 }} />
              <span>CORE ARCHITECT // PROTOCOL v2.6</span>
            </div>

            <h1
              className="font-cyber text-glow-purple"
              style={{
                fontSize: 'clamp(1.85rem, 4.5vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: 1.16,
                marginBottom: '0.65rem',
                color: 'var(--text-heading)',
                wordBreak: 'break-word'
              }}
            >
              {data.name}
            </h1>

            <div
              style={{
                fontSize: 'clamp(0.95rem, 2.2vw, 1.4rem)',
                fontWeight: 800,
                color: 'var(--neon-violet-light)',
                marginBottom: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-cyan)', boxShadow: '0 0 10px var(--neon-cyan)', flexShrink: 0 }} />
              <span>{data.role}</span>
            </div>

            <p
              style={{
                fontSize: 'clamp(0.88rem, 1.6vw, 1.05rem)',
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
                lineHeight: 1.65
              }}
            >
              {data.bio}
            </p>

            {/* Action CTAs */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <button
                onClick={scrollToNext}
                className="cyber-btn-primary"
                style={{ flex: '1 1 160px' }}
              >
                <Zap size={17} />
                <span>{data.ctaPrimary}</span>
              </button>

              <button
                onClick={scrollToContact}
                className="cyber-btn-secondary"
                style={{ flex: '1 1 160px' }}
              >
                <Terminal size={17} />
                <span>{data.ctaSecondary}</span>
              </button>
            </div>

            {/* Technical Highlights Quick List */}
            <div
              style={{
                display: 'flex',
                gap: '8px 12px',
                flexWrap: 'wrap',
                borderTop: '1px solid var(--color-border)',
                paddingTop: '0.9rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <Cpu size={13} style={{ color: 'var(--neon-purple)', flexShrink: 0 }} />
                <span>Distributed Systems</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <Shield size={13} style={{ color: 'var(--neon-magenta)', flexShrink: 0 }} />
                <span>High Performance C++/Rust</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <Activity size={13} style={{ color: 'var(--neon-cyan)', flexShrink: 0 }} />
                <span>Sub-5ms Latency</span>
              </div>
            </div>

          </div>

        </div>

        {/* Floating Metrics HUD Cards - Responsive 2/4 Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))',
            gap: 'clamp(0.5rem, 1.5vw, 0.85rem)',
            maxWidth: '75rem',
            margin: '0 auto',
            width: '100%'
          }}
        >
          {data.stats.map((stat, i) => (
            <div
              key={i}
              className="glass-panel"
              style={{
                padding: 'clamp(0.75rem, 1.8vw, 1.15rem) 0.6rem',
                textAlign: 'center',
                border: '1px solid var(--color-border)'
              }}
            >
              <div
                className="font-cyber text-glow-purple"
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  fontWeight: 900,
                  color: 'var(--neon-purple)',
                  marginBottom: '0.2rem'
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 'clamp(0.7rem, 1.3vw, 0.8rem)',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  lineHeight: 1.3
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div
          onClick={scrollToNext}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
            marginTop: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            cursor: 'pointer',
            opacity: 0.85,
            transition: 'opacity 0.3s ease'
          }}
        >
          <span className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--neon-purple)', fontWeight: 700 }}>
            {lang === 'ar' ? 'اسحب للأسفل للغوص داخل عصب الشبكة' : 'SCROLL TO DIVE INTO MATRIX'}
          </span>
          <ArrowDown size={16} className="animate-pulse-glow" style={{ color: 'var(--neon-purple)' }} />
        </div>

      </div>

      {/* Cyber Motion Player Cinema Modal */}
      <CyberMotionPlayer
        isOpen={cinemaOpen}
        onClose={() => setCinemaOpen(false)}
        initialSceneIndex={selectedScene}
        lang={lang}
      />
    </section>
  );
}
