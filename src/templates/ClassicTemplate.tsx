import React from 'react';
import { ResumeData, ResumeSettings } from '../types/resume';
import { FONT_FAMILY_CSS } from '../data/defaults';
import { makeFsScaler, getSectionTitle, getVisibleOrderedKeys } from './_utils';

interface TemplateProps {
  data: ResumeData;
  settings: ResumeSettings;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personal, workExperience, education, skills, projects, certificates, languages, customSections } = data;
  const { colorTheme, fontSize, fontFamily } = settings;

  const fs = makeFsScaler(fontSize);
  const fontFamilyMap = FONT_FAMILY_CSS;

  const sectionRenderers: Record<string, () => React.ReactNode> = {
    workExperience: () =>
      workExperience.length > 0 && (
        <ClassicSection key="workExperience" title={getSectionTitle(settings, 'workExperience', '工作经历')} color={colorTheme.primary} fs={fs}>
          {workExperience.map((exp, idx) => (
            <div key={exp.id} style={{ marginBottom: idx < workExperience.length - 1 ? '16px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: '0', fontSize: fs(13), fontWeight: '700' }}>{exp.position}</h3>
                <span style={{ fontSize: fs(11), color: '#94a3b8' }}>{exp.startDate} — {exp.current ? '至今' : exp.endDate}</span>
              </div>
              <p style={{ margin: '2px 0 6px 0', fontSize: fs(12), color: colorTheme.primary, fontWeight: '600' }}>{exp.company}</p>
              {exp.description && <p style={{ margin: '0 0 6px 0', fontSize: fs(11.5), lineHeight: '1.5', color: '#475569' }}>{exp.description}</p>}
              {exp.achievements.length > 0 && (
                <ul style={{ margin: '0', paddingLeft: '16px' }}>
                  {exp.achievements.map((a, i) => (
                    <li key={i} style={{ fontSize: fs(11.5), lineHeight: '1.6', color: '#475569' }}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ClassicSection>
      ),

    education: () =>
      education.length > 0 && (
        <ClassicSection key="education" title={getSectionTitle(settings, 'education', '教育经历')} color={colorTheme.primary} fs={fs}>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: '0', fontSize: fs(13), fontWeight: '700' }}>{edu.school}</h3>
                <span style={{ fontSize: fs(11), color: '#94a3b8' }}>{edu.startDate} — {edu.endDate}</span>
              </div>
              <p style={{ margin: '2px 0', fontSize: fs(12), color: colorTheme.primary, fontWeight: '600' }}>{edu.degree} · {edu.major}</p>
              {edu.gpa && <p style={{ margin: '2px 0', fontSize: fs(11), color: '#64748b' }}>GPA: {edu.gpa}</p>}
              {edu.description && <p style={{ margin: '4px 0 0', fontSize: fs(11.5), color: '#475569' }}>{edu.description}</p>}
            </div>
          ))}
        </ClassicSection>
      ),

    skills: () =>
      skills.length > 0 && (
        <ClassicSection key="skills" title={getSectionTitle(settings, 'skills', '专业技能')} color={colorTheme.primary} fs={fs}>
          {skills.map((skill) => (
            <div key={skill.id} style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'flex-start' }}>
              {skill.category && (
                <span style={{ fontSize: fs(12), fontWeight: '700', minWidth: '80px', color: colorTheme.primary }}>{skill.category}：</span>
              )}
              <span style={{ fontSize: fs(12), color: '#475569' }}>{skill.items.join(' · ')}</span>
            </div>
          ))}
        </ClassicSection>
      ),

    projects: () =>
      projects.length > 0 && (
        <ClassicSection key="projects" title={getSectionTitle(settings, 'projects', '项目经历')} color={colorTheme.primary} fs={fs}>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: '0', fontSize: fs(13), fontWeight: '700' }}>{proj.name}{proj.role && <span style={{ fontWeight: '400', color: '#64748b' }}> · {proj.role}</span>}</h3>
                {(proj.startDate || proj.endDate) && (
                  <span style={{ fontSize: fs(11), color: '#94a3b8' }}>{proj.startDate}{proj.endDate ? ` — ${proj.endDate}` : ''}</span>
                )}
              </div>
              {proj.description && <p style={{ margin: '4px 0', fontSize: fs(11.5), lineHeight: '1.5', color: '#475569' }}>{proj.description}</p>}
              {proj.technologies.length > 0 && (
                <p style={{ margin: '0', fontSize: fs(11.5), color: colorTheme.primary }}>
                  技术栈：{proj.technologies.join(' · ')}
                </p>
              )}
            </div>
          ))}
        </ClassicSection>
      ),

    certificates: () =>
      certificates.length > 0 && (
        <ClassicSection key="certificates" title={getSectionTitle(settings, 'certificates', '证书荣誉')} color={colorTheme.primary} fs={fs}>
          {certificates.map((cert) => (
            <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: fs(12) }}>{cert.name}{cert.issuer && <span style={{ color: '#64748b' }}> · {cert.issuer}</span>}</span>
              {cert.date && <span style={{ fontSize: fs(11), color: '#94a3b8' }}>{cert.date}</span>}
            </div>
          ))}
        </ClassicSection>
      ),

    languages: () =>
      languages.length > 0 && (
        <ClassicSection key="languages" title={getSectionTitle(settings, 'languages', '语言能力')} color={colorTheme.primary} fs={fs}>
          <div style={{ display: 'flex', gap: '24px' }}>
            {languages.map((lang) => (
              <span key={lang.id} style={{ fontSize: fs(12) }}>
                <strong>{lang.name}</strong>{lang.level && ` (${lang.level})`}
              </span>
            ))}
          </div>
        </ClassicSection>
      ),

    customSections: () =>
      customSections.length > 0 && (
        <React.Fragment key="customSections">
          {customSections.map((section) => (
            <ClassicSection key={section.id} title={section.title} color={colorTheme.primary} fs={fs}>
              <p style={{ fontSize: fs(11.5), color: '#475569', lineHeight: '1.6', margin: 0 }}>{section.content}</p>
            </ClassicSection>
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
        padding: '40px 48px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header - Classic centered style */}
      <div style={{ textAlign: 'center', borderBottom: `3px solid ${colorTheme.primary}`, paddingBottom: '20px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: fs(26), fontWeight: '700', margin: '0 0 6px 0', color: colorTheme.primary }}>
          {personal.name || '您的姓名'}
        </h1>
        <p style={{ fontSize: fs(14), margin: '0 0 12px 0', color: '#475569', fontStyle: 'italic' }}>
          {personal.title}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', fontSize: fs(11.5), color: '#64748b' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span>{personal.website}</span>}
          {personal.github && <span>{personal.github}</span>}
        </div>
        {personal.summary && (
          <p style={{ margin: '16px 0 0 0', fontSize: fs(12), lineHeight: '1.7', color: '#475569', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
            {personal.summary}
          </p>
        )}
      </div>

      {/* Sections - 按 sectionOrder 顺序渲染 */}
      {orderedKeys.map((key) => sectionRenderers[key]?.())}
    </div>
  );
};

const ClassicSection: React.FC<{ title: string; color: string; fs: (n: number) => string; children: React.ReactNode }> = ({ title, color, fs, children }) => (
  <div style={{ marginBottom: '20px' }}>
    <h2 style={{
      fontSize: fs(14),
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
