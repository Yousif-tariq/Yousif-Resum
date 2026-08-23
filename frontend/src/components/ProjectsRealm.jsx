import React, { useState } from 'react';
import { Code2, ExternalLink, Activity, Zap, CheckCircle2, X, Terminal, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProjectsRealm({ data, lang }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleInspect = (project) => {
    setSelectedProject(project);
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        colors: ['#a855f7', '#f43f5e', '#c084fc', '#00f0ff'],
        origin: { y: 0.7 }
      });
    } catch (e) {}
  };

  return (
    <section id="projects" className="realm-section" style={{ position: 'relative' }}>
      <div className="max-w-7xl" style={{ width: '100%' }}>
        
        {/* Realm Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="cyber-badge" style={{ marginBottom: '1rem' }}>
            <Code2 size={15} />
            <span>REALM 03 // PROJECT MULTIVERSE</span>
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

        {/* Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.75rem',
            maxWidth: '75rem',
            margin: '0 auto'
          }}
        >
          {data.items.map((project) => (
            <div
              key={project.id}
              className="glass-panel"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--color-border)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <span className="cyber-badge">
                    {project.category}
                  </span>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--neon-purple)', boxShadow: '0 0 8px var(--neon-purple)' }} />
                </div>

                <h3
                  className="font-cyber"
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    marginBottom: '0.85rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    marginBottom: '1.5rem'
                  }}
                >
                  {project.desc}
                </p>

                {/* Micro Stats Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                    padding: '10px',
                    borderRadius: '12px',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--color-border)',
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                  }}
                >
                  {Object.entries(project.stats).map(([key, val], idx) => (
                    <div key={idx}>
                      <div className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--neon-purple)' }}>
                        {val}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="font-mono"
                      style={{
                        fontSize: '0.75rem',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        background: 'rgba(168, 85, 247, 0.1)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--neon-violet-light)',
                        fontWeight: 600
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleInspect(project)}
                className="cyber-btn-secondary"
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  fontSize: '0.88rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Cpu size={16} />
                <span>{lang === 'ar' ? 'فحص المعمارية والتفاصيل' : 'Inspect System Blueprint'}</span>
              </button>

            </div>
          ))}
        </div>

      </div>

      {/* Deep Architecture Blueprint Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--modal-overlay)',
            backdropFilter: 'blur(18px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-panel-glow"
            style={{
              maxWidth: '38rem',
              width: '100%',
              padding: '2.5rem',
              border: '1px solid var(--neon-purple)',
              boxShadow: 'var(--glow-purple)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div className="cyber-badge">
                <Terminal size={14} />
                <span>SYSTEM ARCHITECTURE REPORT</span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="cyber-btn-secondary"
                style={{ padding: '6px 10px', borderRadius: '8px' }}
              >
                <X size={18} />
              </button>
            </div>

            <h3 className="font-cyber text-glow-purple" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-heading)' }}>
              {selectedProject.title}
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {selectedProject.desc}
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--neon-purple)', marginBottom: '0.75rem', fontWeight: 800 }}>
                {lang === 'ar' ? 'المعايير والخصائص المعمارية:' : 'Core Architectural Milestones:'}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedProject.features.map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--neon-purple)', flexShrink: 0 }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="cyber-btn-primary"
              style={{ width: '100%' }}
            >
              <span>{lang === 'ar' ? 'إغلاق المعمارية' : 'Close Blueprint'}</span>
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
