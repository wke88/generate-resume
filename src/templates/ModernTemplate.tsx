import React from 'react';
import { ResumeData, ResumeSettings } from '../types/resume';

interface TemplateProps {
  data: ResumeData;
  settings: ResumeSettings;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: colorTheme.primary,
          color: '#ffffff',
          padding: '32px 40px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {settings.showAvatar && personal.avatar && (
            <img
              src={personal.avatar}
              alt={personal.name}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '3px solid rgba(255,255,255,0.6)',
                objectFit: 'cover',
              }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
              {personal.name || '您的姓名'}
            </h1>
            <p style={{ fontSize: '16px', margin: '0 0 12px 0', opacity: 0.9, fontWeight: '500' }}>
              {personal.title || '职位名称'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '11px', opacity: 0.85 }}>
              {personal.email && <span>✉ {personal.email}</span>}
              {personal.phone && <span>✆ {personal.phone}</span>}
              {personal.location && <span>⊙ {personal.location}</span>}
              {personal.website && <span>⊞ {personal.website}</span>}
              {personal.github && <span>⊕ {personal.github}</span>}
              {personal.linkedin && <span>in {personal.linkedin}</span>}
            </div>
          </div>
        </div>
        {personal.summary && (
          <p style={{ margin: '16px 0 0 0', fontSize: '12px', lineHeight: '1.6', opacity: 0.9, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '16px' }}>
            {personal.summary}
          </p>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '28px 40px', flex: 1 }}>
        {/* Work Experience */}
        {workExperience.length > 0 && (
          <Section title="工作经历" color={colorTheme.primary} accentColor={colorTheme.accent}>
            {workExperience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ margin: '0 0 2px 0', fontSize: '13px', fontWeight: '600', color: colorTheme.primary }}>
                      {exp.position || '职位名称'}
                    </h3>
                    <p style={{ margin: '0', fontSize: '12px', fontWeight: '500' }}>{exp.company}</p>
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {exp.startDate} — {exp.current ? '至今' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p style={{ margin: '6px 0 4px 0', fontSize: '11.5px', color: '#475569', lineHeight: '1.5' }}>
                    {exp.description}
                  </p>
                )}
                {exp.achievements.length > 0 && (
                  <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px' }}>
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} style={{ fontSize: '11.5px', color: '#475569', lineHeight: '1.6', marginBottom: '2px' }}>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <Section title="教育经历" color={colorTheme.primary} accentColor={colorTheme.accent}>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 2px 0', fontSize: '13px', fontWeight: '600', color: colorTheme.primary }}>
                    {edu.school || '学校名称'}
                  </h3>
                  <p style={{ margin: '0 0 2px 0', fontSize: '12px' }}>
                    {edu.degree} · {edu.major}
                  </p>
                  {edu.gpa && <p style={{ margin: '0', fontSize: '11px', color: '#64748b' }}>GPA: {edu.gpa}</p>}
                  {edu.description && <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#475569' }}>{edu.description}</p>}
                </div>
                <span style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {edu.startDate} — {edu.endDate}
                </span>
              </div>
            ))}
          </Section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <Section title="专业技能" color={colorTheme.primary} accentColor={colorTheme.accent}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {skills.map((skill) => (
                <div key={skill.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  {skill.category && (
                    <span style={{ fontSize: '11.5px', fontWeight: '600', color: colorTheme.primary, minWidth: '80px', paddingTop: '2px' }}>
                      {skill.category}
                    </span>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {skill.items.map((item, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: colorTheme.accent,
                          color: colorTheme.secondary,
                          padding: '2px 8px',
                          borderRadius: '3px',
                          fontSize: '11px',
                          fontWeight: '500',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <Section title="项目经历" color={colorTheme.primary} accentColor={colorTheme.accent}>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ margin: '0 0 2px 0', fontSize: '13px', fontWeight: '600', color: colorTheme.primary }}>
                      {proj.name || '项目名称'}
                      {proj.link && (
                        <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'normal', marginLeft: '8px' }}>
                          {proj.link}
                        </span>
                      )}
                    </h3>
                    {proj.role && <p style={{ margin: '0', fontSize: '12px', fontWeight: '500' }}>{proj.role}</p>}
                  </div>
                  {(proj.startDate || proj.endDate) && (
                    <span style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                      {proj.startDate}{proj.endDate ? ` — ${proj.endDate}` : ''}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <p style={{ margin: '6px 0 6px 0', fontSize: '11.5px', color: '#475569', lineHeight: '1.5' }}>
                    {proj.description}
                  </p>
                )}
                {proj.technologies.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '4px' }}>
                    {proj.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: colorTheme.accent,
                          color: colorTheme.secondary,
                          padding: '1px 7px',
                          borderRadius: '3px',
                          fontSize: '10.5px',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <Section title="证书 & 荣誉" color={colorTheme.primary} accentColor={colorTheme.accent}>
            {certificates.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: colorTheme.primary }}>{cert.name}</span>
                  {cert.issuer && <span style={{ fontSize: '11.5px', color: '#64748b' }}> · {cert.issuer}</span>}
                </div>
                {cert.date && <span style={{ fontSize: '11px', color: '#94a3b8' }}>{cert.date}</span>}
              </div>
            ))}
          </Section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <Section title="语言能力" color={colorTheme.primary} accentColor={colorTheme.accent}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600' }}>{lang.name}</span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>{lang.level}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Custom Sections */}
        {customSections.map((section) => (
          <Section key={section.id} title={section.title} color={colorTheme.primary} accentColor={colorTheme.accent}>
            <p style={{ fontSize: '11.5px', color: '#475569', lineHeight: '1.6', margin: 0 }}>{section.content}</p>
          </Section>
        ))}
      </div>
    </div>
  );
};

const Section: React.FC<{
  title: string;
  color: string;
  accentColor: string;
  children: React.ReactNode;
}> = ({ title, color, children }) => (
  <div style={{ marginBottom: '22px' }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px',
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: '14px',
          fontWeight: '700',
          color: color,
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
        }}
      >
        {title}
      </h2>
      <div style={{ flex: 1, height: '2px', backgroundColor: color, opacity: 0.2 }} />
    </div>
    {children}
  </div>
);
