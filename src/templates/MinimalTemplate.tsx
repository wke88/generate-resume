import React from 'react';
import { ResumeData, ResumeSettings } from '../types/resume';
import { FONT_FAMILY_CSS } from '../data/defaults';
import { makeFsScaler, getSectionTitle, getVisibleOrderedKeys } from './_utils';

interface TemplateProps {
  data: ResumeData;
  settings: ResumeSettings;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personal, workExperience, education, skills, projects, certificates, languages, customSections } = data;
  const { colorTheme, fontSize, fontFamily } = settings;

  const fs = makeFsScaler(fontSize);
  const fontFamilyMap = FONT_FAMILY_CSS;

  const sectionRenderers: Record<string, () => React.ReactNode> = {
    workExperience: () =>
      workExperience.length > 0 && (
        <MinSection key="workExperience" title={getSectionTitle(settings, 'workExperience', '经历')} color={colorTheme.primary} fs={fs}>
          {workExperience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <span style={{ fontSize: fs(13), fontWeight: '600' }}>{exp.position} <span style={{ color: '#94a3b8', fontWeight: '400' }}>@ {exp.company}</span></span>
                <span style={{ fontSize: fs(11), color: '#94a3b8' }}>{exp.startDate} — {exp.current ? '至今' : exp.endDate}</span>
              </div>
              {exp.description && <p style={{ margin: '0 0 4px', fontSize: fs(11.5), color: '#64748b', lineHeight: '1.6' }}>{exp.description}</p>}
              {exp.achievements.length > 0 && (
                <ul style={{ margin: '0', paddingLeft: '14px' }}>
                  {exp.achievements.map((a, i) => (
                    <li key={i} style={{ fontSize: fs(11.5), color: '#64748b', lineHeight: '1.6', listStyleType: '—' }}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </MinSection>
      ),

    education: () =>
      education.length > 0 && (
        <MinSection key="education" title={getSectionTitle(settings, 'education', '教育')} color={colorTheme.primary} fs={fs}>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: fs(13), fontWeight: '600' }}>{edu.school}</span>
                <p style={{ margin: '2px 0 0', fontSize: fs(12), color: '#64748b' }}>{edu.degree} · {edu.major}{edu.gpa && ` · GPA ${edu.gpa}`}</p>
              </div>
              <span style={{ fontSize: fs(11), color: '#94a3b8', whiteSpace: 'nowrap' }}>{edu.startDate} — {edu.endDate}</span>
            </div>
          ))}
        </MinSection>
      ),

    skills: () =>
      skills.length > 0 && (
        <MinSection key="skills" title={getSectionTitle(settings, 'skills', '技能')} color={colorTheme.primary} fs={fs}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {skills.map((skill) => (
              <div key={skill.id} style={{ display: 'flex', gap: '12px' }}>
                {skill.category && <span style={{ fontSize: fs(11.5), fontWeight: '600', minWidth: '72px', color: colorTheme.primary }}>{skill.category}</span>}
                <span style={{ fontSize: fs(11.5), color: '#64748b' }}>{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </MinSection>
      ),

    projects: () =>
      projects.length > 0 && (
        <MinSection key="projects" title={getSectionTitle(settings, 'projects', '项目')} color={colorTheme.primary} fs={fs}>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: fs(13), fontWeight: '600' }}>{proj.name}{proj.link && <span style={{ fontSize: fs(10), color: '#94a3b8', marginLeft: '6px' }}>{proj.link}</span>}</span>
                {(proj.startDate || proj.endDate) && <span style={{ fontSize: fs(11), color: '#94a3b8' }}>{proj.startDate}{proj.endDate && ` — ${proj.endDate}`}</span>}
              </div>
              {proj.description && <p style={{ margin: '4px 0', fontSize: fs(11.5), color: '#64748b', lineHeight: '1.6' }}>{proj.description}</p>}
              {proj.technologies.length > 0 && <p style={{ margin: '0', fontSize: fs(11), color: '#94a3b8' }}>{proj.technologies.join(' · ')}</p>}
            </div>
          ))}
        </MinSection>
      ),

    certificates: () =>
      certificates.length > 0 && (
        <MinSection key="certificates" title={getSectionTitle(settings, 'certificates', '证书')} color={colorTheme.primary} fs={fs}>
          {certificates.map((cert) => (
            <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: fs(12) }}>{cert.name}{cert.issuer && <span style={{ color: '#94a3b8' }}> — {cert.issuer}</span>}</span>
              {cert.date && <span style={{ fontSize: fs(11), color: '#94a3b8' }}>{cert.date}</span>}
            </div>
          ))}
        </MinSection>
      ),

    languages: () =>
      languages.length > 0 && (
        <MinSection key="languages" title={getSectionTitle(settings, 'languages', '语言')} color={colorTheme.primary} fs={fs}>
          <div style={{ display: 'flex', gap: '20px' }}>
            {languages.map((lang) => (
              <span key={lang.id} style={{ fontSize: fs(12) }}>{lang.name}{lang.level && <span style={{ color: '#94a3b8' }}> · {lang.level}</span>}</span>
            ))}
          </div>
        </MinSection>
      ),

    customSections: () =>
      customSections.length > 0 && (
        <React.Fragment key="customSections">
          {customSections.map((section) => (
            <MinSection key={section.id} title={section.title} color={colorTheme.primary} fs={fs}>
              <p style={{ fontSize: fs(11.5), color: '#64748b', lineHeight: '1.6', margin: 0 }}>{section.content}</p>
            </MinSection>
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
        fontFamily: fontFamilyMap[fontFamily as keyof typeof fontFamilyMap],
        fontSize: fs(12),
        color: colorTheme.text,
        backgroundColor: colorTheme.background,
        padding: '48px 56px',
        boxSizing: 'border-box',
      }}
    >
      {/* Ultra-minimal header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: fs(32), fontWeight: '300', margin: '0 0 4px 0', letterSpacing: '-1px', color: colorTheme.primary }}>
          {personal.name || '您的姓名'}
        </h1>
        <p style={{ fontSize: fs(14), margin: '0 0 16px 0', color: '#94a3b8', fontWeight: '400' }}>
          {personal.title}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px', fontSize: fs(11), color: '#64748b' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.github && <span>{personal.github}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
        {personal.summary && (
          <p style={{ margin: '16px 0 0 0', fontSize: fs(12), lineHeight: '1.7', color: '#64748b', maxWidth: '520px' }}>
            {personal.summary}
          </p>
        )}
      </div>

      {/* Sections - 按 sectionOrder 顺序渲染 */}
      {orderedKeys.map((key) => sectionRenderers[key]?.())}
    </div>
  );
};

const MinSection: React.FC<{ title: string; color: string; fs: (n: number) => string; children: React.ReactNode }> = ({ title, color, fs, children }) => (
  <div style={{ marginBottom: '24px' }}>
    <h2 style={{
      fontSize: fs(10),
      fontWeight: '700',
      color: color,
      textTransform: 'uppercase',
      letterSpacing: '2px',
      margin: '0 0 12px 0',
    }}>
      {title}
    </h2>
    {children}
  </div>
);
