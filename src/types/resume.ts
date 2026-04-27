export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  avatar: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface Skill {
  id: string;
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  languages: Language[];
  customSections: CustomSection[];
}

export type TemplateId = 'modern' | 'classic' | 'minimal' | 'creative' | 'tech';

export type ColorTheme = {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
};

export interface ResumeSettings {
  templateId: TemplateId;
  colorTheme: ColorTheme;
  fontSize: 'small' | 'medium' | 'large';
  fontFamily: 'sans' | 'serif' | 'mono';
  showAvatar: boolean;
  pageFormat: 'A4' | 'Letter';
  sectionOrder: string[];
}

export type SectionKey =
  | 'personal'
  | 'workExperience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certificates'
  | 'languages'
  | 'customSections';
