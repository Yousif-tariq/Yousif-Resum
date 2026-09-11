import React, { useState } from 'react';
import { Cpu, Server, Layers, ShieldCheck, Terminal, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export default function SkillsRealm({ data, lang }) {
  const [activeCategory, setActiveCategory] = useState('systems');

  const icons = {
    systems: Cpu,
    distributed: Server,
    software: Layers,
    data: ShieldCheck
  };

  const currentCategoryData = data.categories.find(c => c.id === activeCategory) || data.categories[0];

  return (
    <section id="skills" className="realm-section" style={{ position: 'relative' }}>
      <div className="max-w-7xl" style={{ width: '100%' }}>
        
        {/* Realm Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <div className="cyber-badge" style={{ marginBottom: '0.75rem' }}>
            <Cpu size={14} />
            <span>REALM 02 // ARCHITECTURE MATRIX</span>
          </div>
          <h2
            className="font-cyber text-glow-purple"
            style={{
              fontSize: 'clamp(1.75rem, 4.2vw, 3rem)',
              fontWeight: 800,
              marginBottom: '0.65rem',
              color: 'var(--text-heading)'
            }}
          >
            {data.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', maxWidth: '38rem', margin: '0 auto', lineHeight: 1.65 }}>
            {data.subtitle}
          </p>
        </div>

        {/* Responsive Category Selector (Swipeable Pills on Mobile) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
            width: '100%'
          }}
        >
          <div
            className="no-scrollbar"
            style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              padding: '6px',
              borderRadius: '16px',
              background: 'rgba(168, 85, 247, 0.08)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              maxWidth: '100%',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory'
            }}
          >
            {data.categories.map((cat) => {
              const Icon = icons[cat.id] || Cpu;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '9px 16px',
                    borderRadius: '12px',
                    background: isActive
                      ? 'linear-gradient(135deg, var(--neon-purple), var(--neon-magenta))'
                      : 'transparent',
                    border: 'none',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 0 20px rgba(168, 85, 247, 0.45)' : 'none',
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    scrollSnapAlign: 'start',
                    minHeight: '42px',
                    touchAction: 'manipulation'
                  }}
                >
                  <Icon size={15} style={{ color: isActive ? '#ffffff' : 'var(--neon-purple)', flexShrink: 0 }} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Skills Grid Display */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(0.85rem, 2vw, 1.35rem)',
            maxWidth: '72rem',
            margin: '0 auto',
            width: '100%'
          }}
        >
          {currentCategoryData.skills.map((skill, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: 'clamp(1.1rem, 2.8vw, 1.6rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--color-border)',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="font-cyber" style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {skill.name}
                  </span>
                  <span className="font-mono" style={{ color: 'var(--neon-purple)', fontWeight: 800, fontSize: '0.9rem' }}>
                    {skill.level}%
                  </span>
                </div>

                {/* Cyber Progress Bar */}
                <div
                  style={{
                    height: '7px',
                    width: '100%',
                    background: 'rgba(168, 85, 247, 0.14)',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    marginBottom: '0.85rem',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${skill.level}%`,
                      background: 'linear-gradient(90deg, var(--neon-purple), var(--neon-magenta))',
                      borderRadius: '999px',
                      boxShadow: '0 0 10px rgba(168, 85, 247, 0.65)',
                      transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {skill.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
