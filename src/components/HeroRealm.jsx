import React from 'react';
import { ArrowDown, Sparkles, Terminal, Zap, Shield, Radio, Activity, Cpu } from 'lucide-react';
import InteractiveHologramPortrait from './InteractiveHologramPortrait';

export default function HeroRealm({ data, lang }) {
  const scrollToNext = () => {
    const el = document.getElementById('skills');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="realm-section" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="max-w-7xl" style={{ width: '100%' }}>
        
        {/* Top Floating Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div className="cyber-badge" style={{ padding: '8px 22px', fontSize: '0.85rem' }}>
            <Sparkles size={16} />
            <span>{data.badge}</span>
          </div>
        </div>

        {/* Hero Grid: Profile Hologram Frame & Bio Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            alignItems: 'center',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            marginBottom: '3rem'
          }}
        >
          
          {/* Left / Layered Masking & Sliced Reveal Hologram Portrait */}
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <InteractiveHologramPortrait 
              name={data.name} 
              lang={lang} 
              primaryPhoto={data.primaryPhoto}
              alterEgoPhoto={data.alterEgoPhoto}
            />
          </div>

          {/* Right / Hero Typography & Actions */}
          <div style={{ textAlign: lang === 'ar' ? 'right' : 'left', width: '100%' }}>
            
            <div
              className="font-mono"
              style={{
                color: 'var(--neon-purple)',
                fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Radio size={16} className="animate-pulse-glow" style={{ color: 'var(--neon-purple)', flexShrink: 0 }} />
              <span>CORE ARCHITECT // PROTOCOL v2.6</span>
            </div>

            <h1
              className="font-cyber text-glow-purple"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: '1rem',
                color: 'var(--text-heading)',
                wordBreak: 'break-word'
              }}
            >
              {data.name}
            </h1>

            <div
              style={{
                fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
                fontWeight: 800,
                color: 'var(--neon-purple)',
                marginBottom: '1.25rem'
              }}
            >
              {data.role}
            </div>

            <p
              style={{
                fontSize: 'clamp(0.92rem, 1.6vw, 1.15rem)',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                lineHeight: 1.75
              }}
            >
              {data.bio}
            </p>

            {/* Action CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <button onClick={scrollToNext} className="cyber-btn-primary" style={{ flex: '1 1 auto' }}>
                <Zap size={18} />
                <span>{data.ctaPrimary}</span>
              </button>
              <button onClick={scrollToContact} className="cyber-btn-secondary" style={{ flex: '1 1 auto' }}>
                <Terminal size={18} />
                <span>{data.ctaSecondary}</span>
              </button>
            </div>

            {/* Technical Highlights Quick List */}
            <div
              style={{
                display: 'flex',
                gap: '12px 16px',
                flexWrap: 'wrap',
                borderTop: '1px solid var(--color-border)',
                paddingTop: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <Cpu size={15} style={{ color: 'var(--neon-purple)', flexShrink: 0 }} />
                <span>Distributed Systems</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <Shield size={15} style={{ color: 'var(--neon-magenta)', flexShrink: 0 }} />
                <span>High Performance C++/Rust</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <Activity size={15} style={{ color: 'var(--neon-cyan)', flexShrink: 0 }} />
                <span>Sub-5ms Latency</span>
              </div>
            </div>

          </div>

        </div>

        {/* Floating Metrics HUD Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
            gap: '1rem',
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
                padding: '1.25rem 0.85rem',
                textAlign: 'center',
                border: '1px solid var(--color-border)'
              }}
            >
              <div
                className="font-cyber text-glow-purple"
                style={{
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                  fontWeight: 900,
                  color: 'var(--neon-purple)',
                  marginBottom: '0.35rem'
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
                  color: 'var(--text-secondary)',
                  fontWeight: 600
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator Prompt */}
        <div
          onClick={scrollToNext}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            marginTop: '3.5rem',
            cursor: 'pointer',
            opacity: 0.85,
            transition: 'opacity 0.3s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
        >
          <span className="font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--neon-purple)', fontWeight: 700 }}>
            {lang === 'ar' ? 'اسحب للأسفل للغوص داخل الطبقات' : 'SCROLL TO DIVE DEEP'}
          </span>
          <ArrowDown size={18} className="animate-pulse-glow" style={{ color: 'var(--neon-purple)' }} />
        </div>

      </div>
    </section>
  );
}
