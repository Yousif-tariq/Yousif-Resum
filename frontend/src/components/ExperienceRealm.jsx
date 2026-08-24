import React from 'react';
import { Layers, Briefcase, Calendar, Building2, CheckCircle2 } from 'lucide-react';

export default function ExperienceRealm({ data, lang }) {
  return (
    <section id="experience" className="realm-section" style={{ position: 'relative' }}>
      <div className="max-w-7xl" style={{ width: '100%' }}>
        
        {/* Realm Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="cyber-badge" style={{ marginBottom: '1rem' }}>
            <Layers size={15} />
            <span>REALM 04 // NEURAL TIMELINE</span>
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

        {/* Timeline Container */}
        <div style={{ maxWidth: '52rem', margin: '0 auto', position: 'relative' }}>
          
          {/* Vertical Glowing Cyber Line */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              bottom: '10px',
              [lang === 'ar' ? 'right' : 'left']: 'clamp(10px, 2.5vw, 20px)',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--neon-purple), var(--neon-magenta), transparent)',
              boxShadow: '0 0 14px var(--neon-purple)'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {data.timeline.map((item, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  [lang === 'ar' ? 'paddingRight' : 'paddingLeft']: 'clamp(32px, 5vw, 55px)'
                }}
              >
                {/* Glowing Node Dot */}
                <div
                  style={{
                    position: 'absolute',
                    top: '24px',
                    [lang === 'ar' ? 'right' : 'left']: 'clamp(2px, 1.5vw, 11px)',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'var(--color-void)',
                    border: '3px solid var(--neon-purple)',
                    boxShadow: '0 0 15px var(--neon-purple)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2
                  }}
                >
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--neon-magenta)' }} />
                </div>

                {/* Experience Card */}
                <div
                  className="glass-panel"
                  style={{
                    padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '0.75rem' }}>
                    <div>
                      <h3 className="font-cyber" style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {item.role}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--neon-purple)', fontSize: '0.88rem', fontWeight: 700 }}>
                        <Building2 size={15} />
                        <span>{item.company}</span>
                      </div>
                    </div>

                    <div
                      className="font-mono cyber-badge"
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      <Calendar size={13} />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                    {item.desc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="font-mono"
                        style={{
                          fontSize: '0.72rem',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: 'rgba(168, 85, 247, 0.1)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--neon-violet-light)',
                          fontWeight: 600
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
