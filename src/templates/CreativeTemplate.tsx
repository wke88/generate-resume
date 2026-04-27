import React from 'react';
import { ResumeData, ResumeSettings } from '../types/resume';
import { makeFsScaler, getSectionTitle, getVisibleOrderedKeys, FONT_FAMILY_CSS } from './_utils';

interface TemplateProps {
  data: ResumeData;
  settings: ResumeSettings;
}

/**
 * CreativeTemplate —— 创意风格
 * 特点：左侧彩色装饰竖条 + 姓名超大字号 + 卡片式模块
 */
export const CreativeTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personal, workExperience, education, skills, projects, certificates, languages, customSections } = data;
  const { colorTheme, fontSize, fontFamily } = settings;

  const fs = makeFsScaler(fontSize);
  const fontFamilyMap = FONT_FAMILY_CSS;

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section style={{ marginBottom: '20px' }}>
      <h2
        style={{
          margin: '0 0 10px 0',
          fontSize: fs(14),
          fontWeight: 700,
          color: colorTheme.primary,
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: '4px',
          background: colorTheme.accent,
        }}
      >
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );

  const sectionRenderers: Record<string, () => React.ReactNode> = {
    workExperience: () =>
      workExperience.length > 0 && (
        <Section key="workExperience" title={getSectionTitle(settings, 'workExperience', '工作经历')}>
          {workExperience.map((exp) => (
            <div
              key={exp.id}
              style={{
                marginBottom: '12px',
                padding: '10px 12px',
                borderLeft: `3px solid ${colorTheme.primary}`,
                background: '#fafafa',
                borderRadius: '0 6px 6px 0',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: fs(13), fontWeight: 700, color: colorTheme.primary }}>{exp.position || '职位名称'}</span>
                  <span style={{ fontSize: fs(12), color: '#475569' }}> @ {exp.company}</span>
                </div>
                <span style={{ fontSize: fs(11), color: '#94a3b8' }}>{exp.startDate} — {exp.current ? '至今' : exp.endDate}</span>
              </div>
              {exp.description && <p style={{ margin: '6px 0 4px 0', fontSize: fs(11.5), color: '#475569', lineHeight: 1.5 }}>{exp.description}</p>}
              {exp.achievements?.length > 0 && (
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '18px', fontSize: fs(11.5), lineHeight: 1.6, color: '#334155' }}>
                  {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
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
            <div key={edu.id} style={{ marginBottom: '8px', fontSize: fs(11.5) }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700 }}>{edu.school}</span>
                <span style={{ color: '#94a3b8' }}>{edu.startDate} — {edu.endDate}</span>
              </div>
              <p style={{ margin: '2px 0', color: colorTheme.primary }}>{edu.degree} · {edu.major}</p>
              {edu.description && <p style={{ margin: '2px 0 0 0', color: '#64748b' }}>{edu.description}</p>}
            </div>
          ))}
        </Section>
      ),
    skills: () =>
      skills.length > 0 && (
        <Section key="skills" title={getSectionTitle(settings, 'skills', '技能')}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {skills.map((s) => (
              <div key={s.id} style={{ fontSize: fs(11.5) }}>
                <span style={{ fontWeight: 700, color: colorTheme.primary }}>{s.category}</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                  {s.items.map((item, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '2px 8px',
                        fontSize: fs(10.5),
                        background: colorTheme.accent,
                        color: colorTheme.secondary,
                        borderRadius: '10px',
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
      ),
    projects: () =>
      projects.length > 0 && (
        <Section key="projects" title={getSectionTitle(settings, 'projects', '项目经历')}>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: '10px', fontSize: fs(11.5) }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, color: colorTheme.primary }}>{p.name}</span>
                <span style={{ color: '#94a3b8' }}>{p.startDate} — {p.endDate}</span>
              </div>
              {p.role && <p style={{ margin: '2px 0', color: '#64748b' }}>{p.role}</p>}
              {p.description && <p style={{ margin: '2px 0', color: '#475569', lineHeight: 1.5 }}>{p.description}</p>}
              {p.technologies?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                  {p.technologies.map((t, i) => (
                    <span key={i} style={{ fontSize: fs(10), color: colorTheme.primary }}>#{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Section>
      ),
    certificates: () =>
      certificates.length > 0 && (
        <Section key="certificates" title={getSectionTitle(settings, 'certificates', '证书荣誉')}>
          {certificates.map((c) => (
            <div key={c.id} style={{ fontSize: fs(11.5), marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <span>
                <strong>{c.name}</strong>
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {languages.map((l) => (
              <span
                key={l.id}
                style={{
                  padding: '2px 10px',
                  fontSize: fs(11),
                  background: colorTheme.accent,
                  color: colorTheme.secondary,
                  borderRadius: '12px',
                }}
              >
                {l.name} · {l.level}
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
        fontFamily: fontFamilyMap[fontFamily],
        fontSize: fs(12),
        color: colorTheme.text,
        backgroundColor: colorTheme.background,
        display: 'flex',
      }}
    >
      {/* 左侧彩色装饰条 */}
      <div
        style={{
          width: '10mm',
          background: `linear-gradient(180deg, ${colorTheme.primary}, ${colorTheme.secondary})`,
          flexShrink: 0,
        }}
      />
      {/* 主要内容 */}
      <div style={{ flex: 1, padding: '20mm 18mm' }}>
        {/* Header */}
        <header style={{ marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          {settings.showAvatar && personal.avatar && (
            <img
              src={personal.avatar}
              alt={personal.name}
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: `3px solid ${colorTheme.primary}`,
              }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: fs(32), fontWeight: 800, color: colorTheme.primary, letterSpacing: '-0.5px' }}>
              {personal.name || '您的姓名'}
            </h1>
            <p style={{ margin: '2px 0 8px 0', fontSize: fs(13), color: '#64748b', fontWeight: 500 }}>{personal.title}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: fs(10.5), color: '#475569' }}>
              {personal.email && <span>✉ {personal.email}</span>}
              {personal.phone && <span>✆ {personal.phone}</span>}
              {personal.location && <span>⊙ {personal.location}</span>}
              {personal.website && <span>⊞ {personal.website}</span>}
              {personal.github && <span>⊕ {personal.github}</span>}
              {personal.linkedin && <span>in {personal.linkedin}</span>}
            </div>
          </div>
        </header>

        {/* Summary */}
        {personal.summary && (
          <section
            style={{
              marginBottom: '22px',
              padding: '10px 14px',
              borderRadius: '6px',
              background: colorTheme.accent,
              fontSize: fs(11.5),
              lineHeight: 1.6,
              color: colorTheme.secondary,
            }}
          >
            {personal.summary}
          </section>
        )}

        {/* Sections by order */}
        {orderedKeys.map((key) => sectionRenderers[key]?.())}
      </div>
    </div>
  );
};
