import React from 'react';
import { ResumeData, ResumeSettings } from '../types/resume';
import { makeFsScaler, getSectionTitle, getVisibleOrderedKeys, FONT_FAMILY_CSS } from './_utils';

interface TemplateProps {
  data: ResumeData;
  settings: ResumeSettings;
}

/**
 * ElegantTemplate —— 优雅风格
 */
export const ElegantTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personal, workExperience, education, skills, projects, certificates, languages, customSections } = data;
  const { colorTheme, fontSize, fontFamily } = settings;

  const fs = makeFsScaler(fontSize);
  const fontFamilyMap = FONT_FAMILY_CSS;

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section style={{ marginBottom: '22px' }}>
      <h2
        style={{
          margin: '0 0 12px 0',
          fontSize: fs(11),
          fontWeight: 600,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: colorTheme.primary,
          textAlign: 'center',
          borderTop: `1px solid ${colorTheme.primary}`,
          borderBottom: `1px solid ${colorTheme.primary}`,
          padding: '6px 0',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );

  const sectionRenderers: Record<string, () => React.ReactNode> = {
    workExperience: () =>
      workExperience.length > 0 && (
        <Section key="workExperience" title={getSectionTitle(settings, 'workExperience', '工作经历')}>
          {workExperience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: fs(13), fontWeight: 600 }}>{exp.position || '职位名称'}</span>
                  <span style={{ margin: '0 6px', color: '#94a3b8' }}>·</span>
                  <span style={{ fontSize: fs(12), fontStyle: 'italic', color: colorTheme.primary }}>{exp.company}</span>
                </div>
                <span style={{ fontSize: fs(11), color: '#94a3b8', whiteSpace: 'nowrap' }}>
                  {exp.startDate} — {exp.current ? '至今' : exp.endDate}
                </span>
              </div>
              {exp.description && (
                <p style={{ margin: '4px 0 6px 0', fontSize: fs(11.5), color: '#475569', lineHeight: 1.6 }}>{exp.description}</p>
              )}
              {exp.achievements?.length > 0 && (
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '18px', fontSize: fs(11.5), lineHeight: 1.6, color: '#334155' }}>
                  {exp.achievements.map((a, i) => (
                    <li key={i} style={{ marginBottom: '2px' }}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      ),
    education: () =>
      education.length > 0 && (
        <Section key="education" title={getSectionTitle(settings, 'education', '教育经历')}>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: fs(12.5), fontWeight: 600 }}>{edu.school}</span>
                  <span style={{ margin: '0 6px', color: '#94a3b8' }}>·</span>
                  <span style={{ fontSize: fs(12), color: colorTheme.primary }}>{edu.degree} {edu.major}</span>
                </div>
                <span style={{ fontSize: fs(11), color: '#94a3b8' }}>{edu.startDate} — {edu.endDate}</span>
              </div>
              {edu.gpa && <p style={{ margin: '2px 0', fontSize: fs(11), color: '#64748b' }}>GPA: {edu.gpa}</p>}
              {edu.description && <p style={{ margin: '2px 0 0 0', fontSize: fs(11.5), color: '#475569', lineHeight: 1.5 }}>{edu.description}</p>}
            </div>
          ))}
        </Section>
      ),
    skills: () =>
      skills.length > 0 && (
        <Section key="skills" title={getSectionTitle(settings, 'skills', '专业技能')}>
          {skills.map((s) => (
            <div key={s.id} style={{ marginBottom: '6px', fontSize: fs(11.5), lineHeight: 1.6 }}>
              <span style={{ fontWeight: 600, color: colorTheme.primary }}>{s.category}：</span>
              <span style={{ color: '#334155' }}>{s.items.join(' · ')}</span>
            </div>
          ))}
        </Section>
      ),
    projects: () =>
      projects.length > 0 && (
        <Section key="projects" title={getSectionTitle(settings, 'projects', '项目经历')}>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: fs(12.5), fontWeight: 600 }}>{p.name}</span>
                <span style={{ fontSize: fs(11), color: '#94a3b8' }}>{p.startDate} — {p.endDate}</span>
              </div>
              {p.role && <p style={{ margin: '2px 0', fontSize: fs(11.5), fontStyle: 'italic', color: colorTheme.primary }}>{p.role}</p>}
              {p.description && <p style={{ margin: '2px 0', fontSize: fs(11.5), color: '#475569', lineHeight: 1.5 }}>{p.description}</p>}
              {p.technologies?.length > 0 && (
                <p style={{ margin: '4px 0 0 0', fontSize: fs(10.5), color: '#64748b' }}>
                  {p.technologies.join(' / ')}
                </p>
              )}
            </div>
          ))}
        </Section>
      ),
    certificates: () =>
      certificates.length > 0 && (
        <Section key="certificates" title={getSectionTitle(settings, 'certificates', '证书荣誉')}>
          {certificates.map((c) => (
            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs(11.5), marginBottom: '4px' }}>
              <span>
                <span style={{ fontWeight: 600 }}>{c.name}</span>
                {c.issuer && <span style={{ color: '#64748b' }}> — {c.issuer}</span>}
              </span>
              <span style={{ color: '#94a3b8' }}>{c.date}</span>
            </div>
          ))}
        </Section>
      ),
    languages: () =>
      languages.length > 0 && (
        <Section key="languages" title={getSectionTitle(settings, 'languages', '语言能力')}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: fs(11.5) }}>
            {languages.map((l) => (
              <span key={l.id}>
                <span style={{ fontWeight: 600 }}>{l.name}</span>
                <span style={{ color: '#64748b' }}> · {l.level}</span>
              </span>
            ))}
          </div>
        </Section>
      ),
    customSections: () =>
      customSections.length > 0 && (
        <React.Fragment key="customSections">
          {customSections.map((s) => (
            <Section key={s.id} title={s.title}>
              <p style={{ margin: 0, fontSize: fs(11.5), lineHeight: 1.6, whiteSpace: 'pre-wrap', color: '#334155' }}>{s.content}</p>
            </Section>
          ))}
        </React.Fragment>
      ),
  };

  const orderedKeys = getVisibleOrderedKeys(settings, Object.keys(sectionRenderers));

  return (
    <div
      id="resume-preview"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '22mm 20mm',
        fontFamily: fontFamilyMap[fontFamily],
        fontSize: fs(12),
        color: colorTheme.text,
        backgroundColor: colorTheme.background,
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1
          style={{
            margin: 0,
            fontSize: fs(30),
            fontWeight: 300,
            letterSpacing: '8px',
            color: colorTheme.primary,
          }}
        >
          {personal.name || '姓 名'}
        </h1>
        {personal.title && (
          <p style={{ margin: '6px 0 10px 0', fontSize: fs(12), letterSpacing: '2px', color: '#64748b', textTransform: 'uppercase' }}>
            {personal.title}
          </p>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: fs(11),
            color: '#64748b',
          }}
        >
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span>{personal.website}</span>}
          {personal.github && <span>{personal.github}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section style={{ marginBottom: '22px', textAlign: 'center' }}>
          <p
            style={{
              margin: 0,
              fontSize: fs(11.5),
              lineHeight: 1.7,
              color: '#475569',
              fontStyle: 'italic',
              maxWidth: '150mm',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {personal.summary}
          </p>
        </section>
      )}

      {/* Sections by order */}
      {orderedKeys.map((key) => sectionRenderers[key]?.())}
    </div>
  );
};
