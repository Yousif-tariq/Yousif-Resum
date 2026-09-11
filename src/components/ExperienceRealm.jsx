import React from 'react';
import { Layers, Briefcase, Calendar, Building2, CheckCircle2, Sparkles } from 'lucide-react';

export default function ExperienceRealm({ data, lang }) {
  const isRtl = lang === 'ar';

  return (
    <section id="experience" className="realm-section" style={{ position: 'relative' }}>
      <div className="max-w-7xl" style={{ width: '100%' }}>
        
        {/* Realm Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <div className="cyber-badge" style={{ marginBottom: '0.75rem' }}>
            <Layers size={14} />
            <span>REALM 04 // NEURAL TIMELINE</span>
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

        {/* Timeline Container */}
        <div style={{ maxWidth: '54rem', margin: '0 auto', position: 'relative', width: '100%' }}>
          
          {/* Vertical Glowing Cyber Line */}
          <div
            style={{
              position: 'absolute',
              top: '15px',
              bottom: '15px',
              [isRtl ? 'right' : 'left']: 'clamp(6px, 1.5vw, 14px)',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--neon-purple), var(--neon-magenta), transparent)',
              boxShadow: '0 0 12px var(--neon-purple)'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
            {data.timeline.map((item, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  [isRtl ? 'paddingRight' : 'paddingLeft']: 'clamp(24px, 4.5vw, 42px)'
                }}
              >
                {/* Glowing Node Dot */}
                <div
                  style={{
                    position: 'absolute',
                    top: '18px',
                    [isRtl ? 'right' : 'left']: 'clamp(0px, 0.8vw, 6px)',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'var(--color-void)',
                    border: '2.5px solid var(--neon-purple)',
                    boxShadow: '0 0 14px var(--neon-purple)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2
                  }}
                >
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--neon-magenta)' }} />
                </div>

                {/* Experience Card */}
                <div
                  className="glass-panel"
                  style={{
                    padding: 'clamp(1.1rem, 2.8vw, 1.6rem)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px', marginBottom: '0.65rem' }}>
                    <div>
                      <h3 className="font-cyber" style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '3px' }}>
                        {item.role}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--neon-purple)', fontSize: '0.86rem', fontWeight: 700 }}>
                        <Building2 size={14} />
                        <span>{item.company}</span>
                      </div>
                    </div>

                    <div
                      className="font-mono cyber-badge"
                      style={{ padding: '3px 9px', fontSize: '0.72rem' }}
                    >
                      <Calendar size={12} />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {item.desc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="font-mono"
                        style={{
                          fontSize: '0.7rem',
                          padding: '3px 7px',
                          borderRadius: '6px',
                          background: 'rgba(168, 85, 247, 0.08)',
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
