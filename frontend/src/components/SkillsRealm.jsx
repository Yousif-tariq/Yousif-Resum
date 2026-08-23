import React, { useState } from 'react';
import { Cpu, Server, Layers, ShieldCheck, Terminal, CheckCircle2, ChevronRight } from 'lucide-react';

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
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="cyber-badge" style={{ marginBottom: '1rem' }}>
            <Cpu size={15} />
            <span>REALM 02 // ARCHITECTURE MATRIX</span>
          </div>
          <h2
            className="font-cyber text-glow-purple"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              marginBottom: '0.75rem',
              color: 'var(--text-heading)'
            }}
          >
            {data.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '36rem', margin: '0 auto' }}>
            {data.subtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '3rem'
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '14px',
                  background: isActive ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(244, 63, 94, 0.25))' : 'var(--color-surface)',
                  border: `1px solid ${isActive ? 'var(--neon-purple)' : 'var(--color-border)'}`,
                  color: isActive ? 'var(--neon-purple)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 0 25px rgba(168, 85, 247, 0.35)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <Icon size={18} style={{ color: isActive ? 'var(--neon-purple)' : 'var(--text-muted)' }} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Skills Grid Display */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            maxWidth: '68rem',
            margin: '0 auto'
          }}
        >
          {currentCategoryData.skills.map((skill, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--color-border)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="font-cyber" style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                    {skill.name}
                  </span>
                  <span className="font-mono" style={{ color: 'var(--neon-purple)', fontWeight: 800, fontSize: '0.9rem' }}>
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
                    marginBottom: '1rem'
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

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {skill.desc}
                </p>
              </div>

              <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--neon-purple)', opacity: 0.9 }}>
                <CheckCircle2 size={14} style={{ color: 'var(--neon-purple)' }} />
                <span className="font-mono">{lang === 'ar' ? 'معتمد في بيئات الإنتاج الفعلية' : 'Production Grade Verified'}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
