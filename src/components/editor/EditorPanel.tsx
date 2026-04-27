import React from 'react';
import { User, Briefcase, GraduationCap, Code2, FolderGit2, Award, Languages, LayoutDashboard } from 'lucide-react';
import { useResumeStore } from '../../store/resumeStore';
import { PersonalForm } from './PersonalForm';
import { WorkExperienceForm } from './WorkExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { ProjectsForm } from './ProjectsForm';
import { CertificatesForm, LanguagesForm, CustomSectionsForm } from './OtherForms';

const SECTIONS = [
  { key: 'personal', label: '基本信息', icon: User },
  { key: 'workExperience', label: '工作经历', icon: Briefcase },
  { key: 'education', label: '教育经历', icon: GraduationCap },
  { key: 'skills', label: '专业技能', icon: Code2 },
  { key: 'projects', label: '项目经历', icon: FolderGit2 },
  { key: 'certificates', label: '证书荣誉', icon: Award },
  { key: 'languages', label: '语言能力', icon: Languages },
  { key: 'customSections', label: '自定义模块', icon: LayoutDashboard },
];

const FORM_MAP: Record<string, React.FC> = {
  personal: PersonalForm,
  workExperience: WorkExperienceForm,
  education: EducationForm,
  skills: SkillsForm,
  projects: ProjectsForm,
  certificates: CertificatesForm,
  languages: LanguagesForm,
  customSections: CustomSectionsForm,
};

export const EditorPanel: React.FC = () => {
  const { activeSection, setActiveSection } = useResumeStore();
  const ActiveForm = FORM_MAP[activeSection] || PersonalForm;

  return (
    <div className="flex h-full overflow-hidden">
      {/* Section Nav */}
      <div className="w-[160px] flex-shrink-0 border-r border-gray-100 bg-gray-50 overflow-y-auto py-2">
        {SECTIONS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`w-full flex flex-col items-center gap-1.5 py-3 px-2 text-center transition-colors ${
              activeSection === key
                ? 'bg-white text-blue-600 border-r-2 border-blue-600'
                : 'text-gray-500 hover:bg-white hover:text-gray-700'
            }`}
          >
            <Icon size={18} strokeWidth={activeSection === key ? 2.5 : 1.5} />
            <span className="text-[11px] font-medium leading-tight">{label}</span>
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">
          {SECTIONS.find((s) => s.key === activeSection)?.label}
        </h3>
        <ActiveForm />
      </div>
    </div>
  );
};
