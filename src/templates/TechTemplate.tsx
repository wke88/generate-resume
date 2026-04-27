import React from 'react';
import { ResumeData, ResumeSettings } from '../types/resume';

interface TemplateProps {
  data: ResumeData;
  settings: ResumeSettings;
}

export const TechTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personal, workExperience, education, skills, projects, certificates, languages } = data;
  const { colorTheme, fontSize, fontFamily } = settings;

  const fontSizeMap = { small: '11px', medium: '12px', large: '13px' };
  const fontFamilyMap = {
    sans: "'Inter', system-ui, sans-serif",
    serif: "Georgia, serif",
    mono: "'JetBrains Mono', monospace",
  };

  return (
    <div
      id="resume-preview"
      style={{
        width: '210mm',
        minHeight: '297mm',
        fontFamily: fontFamilyMap[fontFamily as keyof typeof fontFamilyMap],
        fontSize: fontSizeMap[fontSize as keyof typeof fontSizeMap],
        color: colorTheme.text,
        backgroundColor: colorTheme.background,
        display: 'grid',
        gridTemplateColumns: '68mm 1fr',
        boxSizing: 'border-box',
      }}
    >
      {/* Left Sidebar */}
      <div style={{ backgroundColor: colorTheme.primary, color: '#fff', padding: '32px 24px', minHeight: '297mm' }}>
        {settings.showAvatar && personal.avatar && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src={personal.avatar} alt={personal.name} style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid rgba(255,255,255,0.3)', objectFit: 'cover' }} />
          </div>
        )}
        <h1 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 4px 0', lineHeight: '1.3' }}>{personal.name || '您的姓名'}</h1>
        <p style={{ fontSize: '12px', margin: '0 0 20px 0', opacity: 0.8, fontWeight: '400' }}>{personal.title}</p>

        {/* Contact */}
        <SideSection title="联系方式">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {personal.email && <div style={{ fontSize: '11px', opacity: 0.9 }}>✉ {personal.email}</div>}
            {personal.phone && <div style={{ fontSize: '11px', opacity: 0.9 }}>✆ {personal.phone}</div>}
            {personal.location && <div style={{ fontSize: '11px', opacity: 0.9 }}>⊙ {personal.location}</div>}
            {personal.github && <div style={{ fontSize: '11px', opacity: 0.9 }}>⊕ {personal.github}</div>}
            {personal.website && <div style={{ fontSize: '11px', opacity: 0.9 }}>⊞ {personal.website}</div>}
            {personal.linkedin && <div style={{ fontSize: '11px', opacity: 0.9 }}>in {personal.linkedin}</div>}
          </div>
        </SideSection>

        {/* Skills */}
        {skills.length > 0 && (
          <SideSection title="技能">
            {skills.map((skill) => (
              <div key={skill.id} style={{ marginBottom: '10px' }}>
                {skill.category && <p style={{ fontSize: '11px', fontWeight: '700', margin: '0 0 4px 0', opacity: 0.9 }}>{skill.category}</p>}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {skill.items.map((item, idx) => (
                    <span key={idx} style={{
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      padding: '2px 7px',
                      borderRadius: '3px',
                      fontSize: '10.5px',
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </SideSection>
        )}

        {/* Education */}
        {education.length > 0 && (
          <SideSection title="教育经历">
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px' }}>
                <p style={{ margin: '0 0 2px', fontSize: '12px', fontWeight: '700' }}>{edu.school}</p>
                <p style={{ margin: '0 0 2px', fontSize: '11px', opacity: 0.85 }}>{edu.degree} · {edu.major}</p>
                <p style={{ margin: '0', fontSize: '10.5px', opacity: 0.7 }}>{edu.startDate} — {edu.endDate}</p>
                {edu.gpa && <p style={{ margin: '2px 0 0', fontSize: '10.5px', opacity: 0.75 }}>GPA: {edu.gpa}</p>}
              </div>
            ))}
          </SideSection>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <SideSection title="语言能力">
            {languages.map((lang) => (
              <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px' }}>
                <span style={{ fontWeight: '600' }}>{lang.name}</span>
                <span style={{ opacity: 0.75 }}>{lang.level}</span>
              </div>
            ))}
          </SideSection>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <SideSection title="证书">
            {certificates.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '8px' }}>
                <p style={{ margin: '0 0 2px', fontSize: '11.5px', fontWeight: '600' }}>{cert.name}</p>
                {cert.issuer && <p style={{ margin: '0', fontSize: '10.5px', opacity: 0.75 }}>{cert.issuer} · {cert.date}</p>}
              </div>
            ))}
          </SideSection>
        )}
      </div>

      {/* Right Content */}
      <div style={{ padding: '32px 28px' }}>
        {personal.summary && (
          <div style={{ marginBottom: '22px' }}>
            <ContentSection title="个人简介" color={colorTheme.primary}>
              <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.7', color: '#475569' }}>{personal.summary}</p>
            </ContentSection>
          </div>
        )}

        {workExperience.length > 0 && (
          <ContentSection title="工作经历" color={colorTheme.primary}>
            {workExperience.map((exp, idx) => (
              <div key={exp.id} style={{ marginBottom: idx < workExperience.length - 1 ? '18px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ margin: '0 0 1px 0', fontSize: '13px', fontWeight: '700', color: colorTheme.primary }}>{exp.position}</h3>
                  <span style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: '8px' }}>{exp.startDate} — {exp.current ? '至今' : exp.endDate}</span>
                </div>
                <p style={{ margin: '0 0 6px 0', fontSize: '12px', fontWeight: '600' }}>{exp.company}</p>
                {exp.description && <p style={{ margin: '0 0 6px 0', fontSize: '11.5px', color: '#475569', lineHeight: '1.5' }}>{exp.description}</p>}
                {exp.achievements.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: '16px' }}>
                    {exp.achievements.map((a, i) => (
                      <li key={i} style={{ fontSize: '11.5px', color: '#475569', lineHeight: '1.6', marginBottom: '2px' }}>{a}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ContentSection>
        )}

        {projects.length > 0 && (
          <ContentSection title="项目经历" color={colorTheme.primary}>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ margin: '0 0 2px 0', fontSize: '13px', fontWeight: '700', color: colorTheme.primary }}>
                    {proj.name}{proj.role && <span style={{ color: '#64748b', fontWeight: '400', fontSize: '12px' }}> · {proj.role}</span>}
                  </h3>
                  {(proj.startDate || proj.endDate) && <span style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{proj.startDate}{proj.endDate && ` — ${proj.endDate}`}</span>}
                </div>
                {proj.description && <p style={{ margin: '4px 0', fontSize: '11.5px', color: '#475569', lineHeight: '1.5' }}>{proj.description}</p>}
                {proj.technologies.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    {proj.technologies.map((tech, idx) => (
                      <span key={idx} style={{ backgroundColor: colorTheme.accent, color: colorTheme.secondary, padding: '1px 7px', borderRadius: '3px', fontSize: '10.5px', fontWeight: '500' }}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </ContentSection>
        )}
      </div>
    </div>
  );
};

const SideSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: '22px' }}>
    <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 10px 0', opacity: 0.7, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '6px' }}>
      {title}
    </h2>
    {children}
  </div>
);

const ContentSection: React.FC<{ title: string; color: string; children: React.ReactNode }> = ({ title, color, children }) => (
  <div style={{ marginBottom: '22px' }}>
    <h2 style={{
      fontSize: '13px',
      fontWeight: '700',
      color: color,
      margin: '0 0 12px 0',
      paddingBottom: '6px',
      borderBottom: `2px solid ${color}`,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    }}>
      {title}
    </h2>
    {children}
  </div>
);
