import React from 'react';
import { TemplateId } from '../types/resume';
import { ResumeData, ResumeSettings } from '../types/resume';
import { ModernTemplate } from './ModernTemplate';
import { ClassicTemplate } from './ClassicTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { TechTemplate } from './TechTemplate';
import { ElegantTemplate } from './ElegantTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { CompactTemplate } from './CompactTemplate';

export const TEMPLATE_LIST: { id: TemplateId; name: string; desc: string }[] = [
  { id: 'modern', name: '现代', desc: '彩色页眉，层次清晰' },
  { id: 'classic', name: '经典', desc: '居中对齐，正式传统' },
  { id: 'minimal', name: '极简', desc: '留白充足，简洁优雅' },
  { id: 'tech', name: '技术', desc: '双栏布局，信息密集' },
  { id: 'elegant', name: '优雅', desc: '细线分隔，衬线大气' },
  { id: 'creative', name: '创意', desc: '左侧色条，标签技能' },
  { id: 'compact', name: '紧凑', desc: '单栏密集，空间高效' },
];

interface TemplateRendererProps {
  data: ResumeData;
  settings: ResumeSettings;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ data, settings }) => {
  const templateMap: Record<TemplateId, React.FC<TemplateRendererProps>> = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
    tech: TechTemplate,
    elegant: ElegantTemplate,
    creative: CreativeTemplate,
    compact: CompactTemplate,
  };

  const Template = templateMap[settings.templateId] || ModernTemplate;
  return <Template data={data} settings={settings} />;
};
