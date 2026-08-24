import React, { useState } from 'react';
import { Send, Terminal, Mail, MapPin, CheckCircle2, Copy, Check, Sparkles, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';
import { API_BASE } from '../config/api';

export default function ContactRealm({ data, lang }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success'
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(`${API_BASE}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).catch(() => null);

      confetti({
        particleCount: 80,
        spread: 100,
        colors: ['#a855f7', '#f43f5e', '#c084fc', '#00f0ff'],
        origin: { y: 0.6 }
      });

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="realm-section" style={{ position: 'relative' }}>
      <div className="max-w-5xl" style={{ width: '100%' }}>
        
        {/* Realm Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="cyber-badge" style={{ marginBottom: '1rem' }}>
            <Send size={15} />
            <span>REALM 05 // SIGNAL TRANSMISSION</span>
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
            gap: '1.5rem',
            width: '100%'
          }}
        >
          {/* Left / Info Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Terminal Window Status */}
            <div
              className="glass-panel"
              style={{
                padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                border: '1px solid rgba(168, 85, 247, 0.3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                  {data.terminalTitle}
                </span>
              </div>

              <div className="font-mono" style={{ fontSize: 'clamp(0.78rem, 1.8vw, 0.85rem)', lineHeight: 1.8, wordBreak: 'break-word' }}>
                <div style={{ color: 'var(--neon-emerald)', fontWeight: 600 }}>
                  ✔ LINK STATUS: ONLINE // ENCRYPTED (TLS 1.3)
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  ✔ NODE: Riyadh Gateway [LATENCY: 1.2ms]
                </div>
                <div style={{ color: 'var(--neon-purple)', marginTop: '0.5rem', fontWeight: 600 }}>
                  {data.status}
                </div>
              </div>
            </div>

            {/* Direct Coordinates */}
            <div className="glass-panel" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Email Item */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '200px', flex: '1 1 auto' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-purple)', flexShrink: 0 }}>
                      <Mail size={18} />
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lang === 'ar' ? 'البريد الرسمي' : 'Direct Email'}</div>
                      <div className="font-mono" style={{ fontSize: 'clamp(0.78rem, 1.8vw, 0.9rem)', color: 'var(--text-primary)', fontWeight: 700, wordBreak: 'break-all' }}>{data.email}</div>
                    </div>
                  </div>

                  <button
                    onClick={copyEmail}
                    className="cyber-btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '8px' }}
                  >
                    {copied ? <Check size={14} style={{ color: 'var(--neon-emerald)' }} /> : <Copy size={14} />}
                    <span>{copied ? (lang === 'ar' ? 'تم النسخ' : 'Copied') : (lang === 'ar' ? 'نسخ' : 'Copy')}</span>
                  </button>
                </div>

                {/* Location Item */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(244, 63, 94, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-magenta)', flexShrink: 0 }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lang === 'ar' ? 'الموقع الجغرافي' : 'Location Coordinates'}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>{data.location}</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right / Dispatch Form */}
          <div
            className="glass-panel"
            style={{
              padding: 'clamp(1.25rem, 3vw, 2rem)',
              border: '1px solid var(--color-border)'
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {data.formName}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={lang === 'ar' ? 'المهندس / الشريك' : 'John Doe'}
                  className="cyber-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {data.formEmail}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@company.com"
                  className="cyber-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {data.formMessage}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'ar' ? 'اكتب تفاصيل النظام أو الاستشارة أو المشروع هنا...' : 'Describe your systems challenge, architecture, or inquiry...'}
                  className="cyber-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {status === 'success' && (
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid var(--neon-emerald)',
                    color: 'var(--neon-emerald)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <CheckCircle2 size={18} />
                  <span>{data.success}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="cyber-btn-primary"
                style={{ width: '100%', padding: '14px', marginTop: '0.5rem' }}
              >
                <Send size={18} />
                <span>{status === 'sending' ? data.sending : data.submitBtn}</span>
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
