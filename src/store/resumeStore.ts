import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ResumeData,
  ResumeSettings,
  WorkExperience,
  Education,
  Skill,
  Project,
  Certificate,
  Language,
  CustomSection,
  ColorTheme,
  TemplateId,
} from '../types/resume';
import { DEFAULT_RESUME_DATA, DEFAULT_SETTINGS } from '../data/defaults';

interface ResumeStore {
  data: ResumeData;
  settings: ResumeSettings;
  activeSection: string;
  setActiveSection: (section: string) => void;
  updatePersonal: (personal: Partial<ResumeData['personal']>) => void;
  addWorkExperience: () => void;
  updateWorkExperience: (id: string, data: Partial<WorkExperience>) => void;
  deleteWorkExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addCertificate: () => void;
  updateCertificate: (id: string, data: Partial<Certificate>) => void;
  deleteCertificate: (id: string) => void;
  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<Language>) => void;
  deleteLanguage: (id: string) => void;
  addCustomSection: () => void;
  updateCustomSection: (id: string, data: Partial<CustomSection>) => void;
  deleteCustomSection: (id: string) => void;
  setTemplate: (templateId: TemplateId) => void;
  setColorTheme: (theme: ColorTheme) => void;
  setFontSize: (size: ResumeSettings['fontSize']) => void;
  setFontFamily: (family: ResumeSettings['fontFamily']) => void;
  toggleShowAvatar: () => void;
  importData: (data: ResumeData) => void;
  resetToDefault: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: DEFAULT_RESUME_DATA,
      settings: DEFAULT_SETTINGS,
      activeSection: 'personal',

      setActiveSection: (section) => set({ activeSection: section }),

      updatePersonal: (personal) =>
        set((state) => ({
          data: { ...state.data, personal: { ...state.data.personal, ...personal } },
        })),

      addWorkExperience: () =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: [
              ...state.data.workExperience,
              {
                id: generateId(),
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
                achievements: [],
              },
            ],
          },
        })),

      updateWorkExperience: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: state.data.workExperience.map((item) =>
              item.id === id ? { ...item, ...data } : item
            ),
          },
        })),

      deleteWorkExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: state.data.workExperience.filter((item) => item.id !== id),
          },
        })),

      addEducation: () =>
        set((state) => ({
          data: {
            ...state.data,
            education: [
              ...state.data.education,
              {
                id: generateId(),
                school: '',
                degree: '',
                major: '',
                startDate: '',
                endDate: '',
                gpa: '',
                description: '',
              },
            ],
          },
        })),

      updateEducation: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((item) =>
              item.id === id ? { ...item, ...data } : item
            ),
          },
        })),

      deleteEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((item) => item.id !== id),
          },
        })),

      addSkill: () =>
        set((state) => ({
          data: {
            ...state.data,
            skills: [
              ...state.data.skills,
              { id: generateId(), category: '', items: [] },
            ],
          },
        })),

      updateSkill: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.map((item) =>
              item.id === id ? { ...item, ...data } : item
            ),
          },
        })),

      deleteSkill: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((item) => item.id !== id),
          },
        })),

      addProject: () =>
        set((state) => ({
          data: {
            ...state.data,
            projects: [
              ...state.data.projects,
              {
                id: generateId(),
                name: '',
                role: '',
                startDate: '',
                endDate: '',
                description: '',
                technologies: [],
                link: '',
              },
            ],
          },
        })),

      updateProject: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((item) =>
              item.id === id ? { ...item, ...data } : item
            ),
          },
        })),

      deleteProject: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.filter((item) => item.id !== id),
          },
        })),

      addCertificate: () =>
        set((state) => ({
          data: {
            ...state.data,
            certificates: [
              ...state.data.certificates,
              { id: generateId(), name: '', issuer: '', date: '', link: '' },
            ],
          },
        })),

      updateCertificate: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            certificates: state.data.certificates.map((item) =>
              item.id === id ? { ...item, ...data } : item
            ),
          },
        })),

      deleteCertificate: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            certificates: state.data.certificates.filter((item) => item.id !== id),
          },
        })),

      addLanguage: () =>
        set((state) => ({
          data: {
            ...state.data,
            languages: [
              ...state.data.languages,
              { id: generateId(), name: '', level: '' },
            ],
          },
        })),

      updateLanguage: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: state.data.languages.map((item) =>
              item.id === id ? { ...item, ...data } : item
            ),
          },
        })),

      deleteLanguage: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: state.data.languages.filter((item) => item.id !== id),
          },
        })),

      addCustomSection: () =>
        set((state) => ({
          data: {
            ...state.data,
            customSections: [
              ...state.data.customSections,
              { id: generateId(), title: '自定义模块', content: '' },
            ],
          },
        })),

      updateCustomSection: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            customSections: state.data.customSections.map((item) =>
              item.id === id ? { ...item, ...data } : item
            ),
          },
        })),

      deleteCustomSection: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            customSections: state.data.customSections.filter((item) => item.id !== id),
          },
        })),

      setTemplate: (templateId) =>
        set((state) => ({
          settings: { ...state.settings, templateId },
        })),

      setColorTheme: (colorTheme) =>
        set((state) => ({
          settings: { ...state.settings, colorTheme },
        })),

      setFontSize: (fontSize) =>
        set((state) => ({
          settings: { ...state.settings, fontSize },
        })),

      setFontFamily: (fontFamily) =>
        set((state) => ({
          settings: { ...state.settings, fontFamily },
        })),

      toggleShowAvatar: () =>
        set((state) => ({
          settings: { ...state.settings, showAvatar: !state.settings.showAvatar },
        })),

      importData: (data) => set({ data }),

      resetToDefault: () =>
        set({ data: DEFAULT_RESUME_DATA, settings: DEFAULT_SETTINGS }),
    }),
    {
      name: 'resume-storage',
    }
  )
);
