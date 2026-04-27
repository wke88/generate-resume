import React from 'react';
import { ResumeData, ResumeSettings } from '../types/resume';
import { FONT_FAMILY_CSS } from '../data/defaults';
import { makeFsScaler, getSectionTitle, getVisibleOrderedKeys } from './_utils';

interface TemplateProps {
  data: ResumeData;
  settings: ResumeSettings;
}

/**
 * CompactTemplate —— 紧凑风格
 */
export const CompactTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personal, workExperience, education, skills, projects, certificates, languages, customSections } = data;
  const { colorTheme, fontSize, fontFamily } = settings;

  // Compact 原来基准更小一档（10/11/12），这里保持紧凑感：基准按 11px 处理
  const fs = makeFsScaler(fontSize - 1);

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section style={{ marginBottom: '12px' }}>
      <h2
        style={{
          margin: '0 0 6px 0',
          fontSize: fs(11),
          fontWeight: 700,
          color: colorTheme.primary,
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          borderBottom: `2px solid ${colorTheme.primary}`,
          paddingBottom: '2px',
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
            <div key={exp.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span>
                  <strong style={{ color: colorTheme.primary }}>{exp.position}</strong>
                  <span style={{ color: '#64748b' }}> · {exp.company}</span>
                </span>
                <span style={{ fontSize: fs(10), color: '#94a3b8', whiteSpace: 'nowrap' }}>
                  {exp.startDate} — {exp.current ? '至今' : exp.endDate}
                </span>
              </div>
              {exp.description && <p style={{ margin: '2px 0', color: '#475569', lineHeight: 1.45 }}>{exp.description}</p>}
              {exp.achievements?.length > 0 && (
                <ul style={{ margin: '2px 0 0 0', paddingLeft: '14px', lineHeight: 1.45, color: '#334155' }}>
                  {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Section>
      ),
    education: () =>
      education.length > 0 && (
        <Section key="education" title={getSectionTitle(settings, 'education', '教育')}>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <span>
                <strong>{edu.school}</strong>
                <span style={{ color: '#64748b' }}> · {edu.degree} {edu.major}</span>
                {edu.gpa && <span style={{ color: '#94a3b8' }}> · GPA {edu.gpa}</span>}
              </span>
              <span style={{ fontSize: fs(10), color: '#94a3b8' }}>{edu.startDate} — {edu.endDate}</span>
            </div>
          ))}
        </Section>
      ),
    skills: () =>
      skills.length > 0 && (
        <Section key="skills" title={getSectionTitle(settings, 'skills', '技能')}>
          {skills.map((s) => (
            <div key={s.id} style={{ marginBottom: '2px', lineHeight: 1.5 }}>
              <strong style={{ color: colorTheme.primary }}>{s.category}：</strong>
              <span style={{ color: '#334155' }}>{s.items.join('、')}</span>
            </div>
          ))}
        </Section>
      ),
    projects: () =>
      projects.length > 0 && (
        <Section key="projects" title={getSectionTitle(settings, 'projects', '项目')}>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  <strong style={{ color: colorTheme.primary }}>{p.name}</strong>
                  {p.role && <span style={{ color: '#64748b' }}> · {p.role}</span>}
                </span>
                <span style={{ fontSize: fs(10), color: '#94a3b8' }}>{p.startDate} — {p.endDate}</span>
              </div>
              {p.description && <p style={{ margin: '2px 0', color: '#475569', lineHeight: 1.45 }}>{p.description}</p>}
              {p.technologies?.length > 0 && (
                <p style={{ margin: 0, fontSize: fs(10), color: '#64748b' }}>{p.technologies.join(' · ')}</p>
              )}
            </div>
          ))}
        </Section>
      ),
    certificates: () =>
      certificates.length > 0 && (
        <Section key="certificates" title={getSectionTitle(settings, 'certificates', '证书')}>
          {certificates.map((c) => (
            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span>
                <strong>{c.name}</strong>
                {c.issuer && <span style={{ color: '#64748b' }}> — {c.issuer}</span>}
              </span>
              <span style={{ fontSize: fs(10), color: '#94a3b8' }}>{c.date}</span>
            </div>
          ))}
        </Section>
      ),
    languages: () =>
      languages.length > 0 && (
        <Section key="languages" title={getSectionTitle(settings, 'languages', '语言')}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {languages.map((l) => (
              <span key={l.id}>
                <strong>{l.name}</strong>
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
              <p style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#334155', lineHeight: 1.5 }}>{s.content}</p>
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
        padding: '14mm 16mm',
        fontFamily: FONT_FAMILY_CSS[fontFamily],
        fontSize: fs(11),
        color: colorTheme.text,
        backgroundColor: colorTheme.background,
        boxSizing: 'border-box',
      }}
    >
      {/* Header - 紧凑 */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingBottom: '10px',
          marginBottom: '14px',
          borderBottom: `3px solid ${colorTheme.primary}`,
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: fs(22), fontWeight: 700, color: colorTheme.primary }}>
            {personal.name || '您的姓名'}
          </h1>
          {personal.title && (
            <p style={{ margin: '2px 0 0 0', fontSize: fs(12), color: '#64748b' }}>{personal.title}</p>
          )}
        </div>
        <div style={{ textAlign: 'right', fontSize: fs(10), color: '#475569', lineHeight: 1.6 }}>
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
          {(personal.website || personal.github || personal.linkedin) && (
            <div>
              {[personal.website, personal.github, personal.linkedin].filter(Boolean).join(' · ')}
            </div>
          )}
        </div>
      </header>

      {personal.summary && (
        <p style={{ margin: '0 0 12px 0', fontSize: fs(11), color: '#475569', lineHeight: 1.5 }}>
          {personal.summary}
        </p>
      )}

      {orderedKeys.map((key) => sectionRenderers[key]?.())}
    </div>
  );
};
