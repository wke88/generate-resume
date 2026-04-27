import React from 'react';
import { ResumeData, ResumeSettings } from '../types/resume';

interface TemplateProps {
  data: ResumeData;
  settings: ResumeSettings;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personal, workExperience, education, skills, projects, certificates, languages, customSections } = data;
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
        padding: '40px 48px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header - Classic centered style */}
      <div style={{ textAlign: 'center', borderBottom: `3px solid ${colorTheme.primary}`, paddingBottom: '20px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', margin: '0 0 6px 0', color: colorTheme.primary }}>
          {personal.name || '您的姓名'}
        </h1>
        <p style={{ fontSize: '14px', margin: '0 0 12px 0', color: '#475569', fontStyle: 'italic' }}>
          {personal.title}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', fontSize: '11.5px', color: '#64748b' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span>{personal.website}</span>}
          {personal.github && <span>{personal.github}</span>}
        </div>
        {personal.summary && (
          <p style={{ margin: '16px 0 0 0', fontSize: '12px', lineHeight: '1.7', color: '#475569', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
            {personal.summary}
          </p>
        )}
      </div>

      {/* Sections */}
      {workExperience.length > 0 && (
        <ClassicSection title="工作经历" color={colorTheme.primary}>
          {workExperience.map((exp, idx) => (
            <div key={exp.id} style={{ marginBottom: idx < workExperience.length - 1 ? '16px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: '0', fontSize: '13px', fontWeight: '700' }}>{exp.position}</h3>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{exp.startDate} — {exp.current ? '至今' : exp.endDate}</span>
              </div>
              <p style={{ margin: '2px 0 6px 0', fontSize: '12px', color: colorTheme.primary, fontWeight: '600' }}>{exp.company}</p>
              {exp.description && <p style={{ margin: '0 0 6px 0', fontSize: '11.5px', lineHeight: '1.5', color: '#475569' }}>{exp.description}</p>}
              {exp.achievements.length > 0 && (
                <ul style={{ margin: '0', paddingLeft: '16px' }}>
                  {exp.achievements.map((a, i) => (
                    <li key={i} style={{ fontSize: '11.5px', lineHeight: '1.6', color: '#475569' }}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ClassicSection>
      )}

      {education.length > 0 && (
        <ClassicSection title="教育经历" color={colorTheme.primary}>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: '0', fontSize: '13px', fontWeight: '700' }}>{edu.school}</h3>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{edu.startDate} — {edu.endDate}</span>
              </div>
              <p style={{ margin: '2px 0', fontSize: '12px', color: colorTheme.primary, fontWeight: '600' }}>{edu.degree} · {edu.major}</p>
              {edu.gpa && <p style={{ margin: '2px 0', fontSize: '11px', color: '#64748b' }}>GPA: {edu.gpa}</p>}
              {edu.description && <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#475569' }}>{edu.description}</p>}
            </div>
          ))}
        </ClassicSection>
      )}

      {skills.length > 0 && (
        <ClassicSection title="专业技能" color={colorTheme.primary}>
          {skills.map((skill) => (
            <div key={skill.id} style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'flex-start' }}>
              {skill.category && (
                <span style={{ fontSize: '12px', fontWeight: '700', minWidth: '80px', color: colorTheme.primary }}>{skill.category}：</span>
              )}
              <span style={{ fontSize: '12px', color: '#475569' }}>{skill.items.join(' · ')}</span>
            </div>
          ))}
        </ClassicSection>
      )}

      {projects.length > 0 && (
        <ClassicSection title="项目经历" color={colorTheme.primary}>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: '0', fontSize: '13px', fontWeight: '700' }}>{proj.name}{proj.role && <span style={{ fontWeight: '400', color: '#64748b' }}> · {proj.role}</span>}</h3>
                {(proj.startDate || proj.endDate) && (
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>{proj.startDate}{proj.endDate ? ` — ${proj.endDate}` : ''}</span>
                )}
              </div>
              {proj.description && <p style={{ margin: '4px 0', fontSize: '11.5px', lineHeight: '1.5', color: '#475569' }}>{proj.description}</p>}
              {proj.technologies.length > 0 && (
                <p style={{ margin: '0', fontSize: '11.5px', color: colorTheme.primary }}>
                  技术栈：{proj.technologies.join(' · ')}
                </p>
              )}
            </div>
          ))}
        </ClassicSection>
      )}

      {certificates.length > 0 && (
        <ClassicSection title="证书荣誉" color={colorTheme.primary}>
          {certificates.map((cert) => (
            <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px' }}>{cert.name}{cert.issuer && <span style={{ color: '#64748b' }}> · {cert.issuer}</span>}</span>
              {cert.date && <span style={{ fontSize: '11px', color: '#94a3b8' }}>{cert.date}</span>}
            </div>
          ))}
        </ClassicSection>
      )}

      {languages.length > 0 && (
        <ClassicSection title="语言能力" color={colorTheme.primary}>
          <div style={{ display: 'flex', gap: '24px' }}>
            {languages.map((lang) => (
              <span key={lang.id} style={{ fontSize: '12px' }}>
                <strong>{lang.name}</strong>{lang.level && ` (${lang.level})`}
              </span>
            ))}
          </div>
        </ClassicSection>
      )}

      {customSections.map((section) => (
        <ClassicSection key={section.id} title={section.title} color={colorTheme.primary}>
          <p style={{ fontSize: '11.5px', color: '#475569', lineHeight: '1.6', margin: 0 }}>{section.content}</p>
        </ClassicSection>
      ))}
    </div>
  );
};

const ClassicSection: React.FC<{ title: string; color: string; children: React.ReactNode }> = ({ title, color, children }) => (
  <div style={{ marginBottom: '20px' }}>
    <h2 style={{
      fontSize: '14px',
      fontWeight: '700',
      color: color,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      margin: '0 0 10px 0',
      paddingBottom: '6px',
      borderBottom: `1px solid ${color}40`,
    }}>
      {title}
    </h2>
    {children}
  </div>
);
