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
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          <div className="cyber-badge" style={{ marginBottom: '0.85rem' }}>
            <Cpu size={15} />
            <span>REALM 02 // ARCHITECTURE MATRIX</span>
          </div>
          <h2
            className="font-cyber text-glow-purple"
            style={{
              fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)',
              fontWeight: 800,
              marginBottom: '0.75rem',
              color: 'var(--text-heading)'
            }}
          >
            {data.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', maxWidth: '38rem', margin: '0 auto', lineHeight: 1.7 }}>
            {data.subtitle}
          </p>
        </div>

        {/* Responsive Category Selector (Swipeable Pills on Mobile) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2.5rem',
            width: '100%'
          }}
        >
          <div
            className="no-scrollbar"
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              padding: '6px',
              borderRadius: '16px',
              background: 'rgba(168, 85, 247, 0.06)',
              border: '1px solid rgba(168, 85, 247, 0.15)',
              maxWidth: '100%',
              WebkitOverflowScrolling: 'touch'
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
                    gap: '8px',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    background: isActive
                      ? 'linear-gradient(135deg, var(--neon-purple), var(--neon-magenta))'
                      : 'transparent',
                    border: 'none',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: 'clamp(0.82rem, 1.8vw, 0.92rem)',
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 0 25px rgba(168, 85, 247, 0.5)' : 'none',
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  <Icon size={16} style={{ color: isActive ? '#ffffff' : 'var(--neon-purple)', flexShrink: 0 }} />
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
            gap: 'clamp(1rem, 2.5vw, 1.5rem)',
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
                padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--color-border)',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span className="font-cyber" style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                    {skill.name}
                  </span>
                  <span className="font-mono" style={{ color: 'var(--neon-purple)', fontWeight: 800, fontSize: '0.95rem' }}>
                    {skill.level}%
                  </span>
                </div>

                {/* Cyber Progress Bar */}
                <div
                  style={{
                    height: '8px',
                    width: '100%',
                    background: 'rgba(168, 85, 247, 0.12)',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    marginBottom: '1rem',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${skill.level}%`,
                      background: 'linear-gradient(90deg, var(--neon-purple), var(--neon-magenta))',
                      borderRadius: '999px',
                      boxShadow: '0 0 12px rgba(168, 85, 247, 0.65)',
                      transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {skill.desc}
                </p>
              </div>

              <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--neon-purple)', opacity: 0.9 }}>
                <CheckCircle2 size={14} style={{ color: 'var(--neon-purple)', flexShrink: 0 }} />
                <span className="font-mono">{lang === 'ar' ? 'معتمد في بيئات الإنتاج الفعلية' : 'Production Grade Verified'}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
