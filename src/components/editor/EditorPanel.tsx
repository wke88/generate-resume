import React, { useEffect, useMemo, useState } from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
  Award,
  Languages,
  LayoutDashboard,
  GripVertical,
  Eye,
  EyeOff,
  Pencil,
  Check,
  X,
} from 'lucide-react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProps,
} from 'react-beautiful-dnd';
import { useResumeStore } from '../../store/resumeStore';
import { PersonalForm } from './PersonalForm';
import { WorkExperienceForm } from './WorkExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { ProjectsForm } from './ProjectsForm';
import { CertificatesForm, LanguagesForm, CustomSectionsForm } from './OtherForms';

/**
 * 兼容 React 18 StrictMode 的 Droppable 包装组件。
 */
const StrictModeDroppable: React.FC<DroppableProps> = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) return null;
  return <Droppable {...props}>{children}</Droppable>;
};

interface SectionMeta {
  key: string;
  label: string;
  icon: React.ComponentType<any>;
  form: React.FC;
}

// personal 单独配置，始终固定在顶部（不参与拖拽排序）
const PERSONAL_SECTION: SectionMeta = {
  key: 'personal',
  label: '基本信息',
  icon: User,
  form: PersonalForm,
};

// 可排序模块
const SORTABLE_SECTIONS: SectionMeta[] = [
  { key: 'workExperience', label: '工作经历', icon: Briefcase, form: WorkExperienceForm },
  { key: 'education', label: '教育经历', icon: GraduationCap, form: EducationForm },
  { key: 'skills', label: '专业技能', icon: Code2, form: SkillsForm },
  { key: 'projects', label: '项目经历', icon: FolderGit2, form: ProjectsForm },
  { key: 'certificates', label: '证书荣誉', icon: Award, form: CertificatesForm },
  { key: 'languages', label: '语言能力', icon: Languages, form: LanguagesForm },
  { key: 'customSections', label: '自定义模块', icon: LayoutDashboard, form: CustomSectionsForm },
];

const SECTION_MAP: Record<string, SectionMeta> = [
  PERSONAL_SECTION,
  ...SORTABLE_SECTIONS,
].reduce<Record<string, SectionMeta>>((acc, section) => {
  acc[section.key] = section;
  return acc;
}, {});

export const EditorPanel: React.FC = () => {
  const {
    activeSection,
    setActiveSection,
    settings,
    reorderSections,
    toggleSectionVisible,
    renameSectionTitle,
  } = useResumeStore();

  // 正在编辑名称的 section key（null 表示无）
  const [renamingKey, setRenamingKey] = useState<string | null>(null);
  const [renameDraft, setRenameDraft] = useState('');

  const orderedSortableSections = useMemo<SectionMeta[]>(() => {
    const keyToSection = SORTABLE_SECTIONS.reduce<Record<string, SectionMeta>>(
      (acc, s) => ({ ...acc, [s.key]: s }),
      {},
    );
    const seen = new Set<string>();
    const result: SectionMeta[] = [];
    (settings.sectionOrder || []).forEach((key) => {
      if (keyToSection[key] && !seen.has(key)) {
        result.push(keyToSection[key]);
        seen.add(key);
      }
    });
    SORTABLE_SECTIONS.forEach((s) => {
      if (!seen.has(s.key)) result.push(s);
    });
    return result;
  }, [settings.sectionOrder]);

  const ActiveSection = SECTION_MAP[activeSection] ?? PERSONAL_SECTION;
  const ActiveForm = ActiveSection.form;

  // 获取某个模块的显示名（自定义 > 默认）
  const getDisplayLabel = (section: SectionMeta): string => {
    const custom = settings.sectionTitles?.[section.key];
    return custom && custom.trim() ? custom : section.label;
  };

  const isHidden = (key: string) => (settings.hiddenSections || []).includes(key);

  const startRename = (key: string, currentLabel: string) => {
    setRenamingKey(key);
    setRenameDraft(currentLabel);
  };

  const commitRename = () => {
    if (renamingKey) {
      const draft = renameDraft.trim();
      const origLabel = SORTABLE_SECTIONS.find((s) => s.key === renamingKey)?.label || '';
      // 如果等于默认值则清空自定义（相当于复位）
      renameSectionTitle(renamingKey, draft === origLabel ? '' : draft);
    }
    setRenamingKey(null);
    setRenameDraft('');
  };

  const cancelRename = () => {
    setRenamingKey(null);
    setRenameDraft('');
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.index === destination.index) return;

    const newOrder = orderedSortableSections.map((s) => s.key);
    const [moved] = newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, moved);
    reorderSections(newOrder);
  };

  const renderPersonalNav = () => {
    const Icon = PERSONAL_SECTION.icon;
    const isActive = activeSection === PERSONAL_SECTION.key;
    return (
      <div
        onClick={() => setActiveSection(PERSONAL_SECTION.key)}
        className={`w-full flex flex-col items-center gap-1.5 py-3 px-2 text-center cursor-pointer transition-colors ${
          isActive
            ? 'bg-white text-blue-600 border-r-2 border-blue-600'
            : 'text-gray-500 hover:bg-white hover:text-gray-700'
        }`}
      >
        <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
        <span className="text-[11px] font-medium leading-tight">{PERSONAL_SECTION.label}</span>
      </div>
    );
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Section Nav */}
      <div className="w-[180px] flex-shrink-0 border-r border-gray-100 bg-gray-50 overflow-y-auto py-2">
        {/* 固定顶部：基本信息 */}
        {renderPersonalNav()}

        {/* 分隔线 */}
        <div className="mx-3 my-1 border-t border-gray-200" />

        {/* 可拖拽排序区域 */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <StrictModeDroppable droppableId="editor-sections">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {orderedSortableSections.map((section, index) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.key;
                  const hidden = isHidden(section.key);
                  const displayLabel = getDisplayLabel(section);
                  const isRenaming = renamingKey === section.key;

                  return (
                    <Draggable key={section.key} draggableId={section.key} index={index}>
                      {(dragProvided, snapshot) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          style={{
                            ...dragProvided.draggableProps.style,
                            width: snapshot.isDragging
                              ? (dragProvided.draggableProps.style as any)?.width ?? 180
                              : undefined,
                          }}
                          className={`group relative flex items-stretch ${
                            snapshot.isDragging ? 'shadow-lg bg-white z-10' : ''
                          } ${hidden ? 'opacity-50' : ''}`}
                        >
                          {/* 左侧拖拽手柄 */}
                          <span
                            {...dragProvided.dragHandleProps}
                            className="flex-shrink-0 flex items-center justify-center w-5 py-3 text-gray-300 group-hover:text-gray-500 cursor-grab active:cursor-grabbing"
                            title="拖动排序"
                          >
                            <GripVertical size={14} />
                          </span>

                          {isRenaming ? (
                            /* 重命名模式 */
                            <div
                              className={`flex-1 flex items-center gap-1 px-1 py-2 bg-white border-r-2 border-blue-600`}
                            >
                              <input
                                autoFocus
                                type="text"
                                value={renameDraft}
                                onChange={(e) => setRenameDraft(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') commitRename();
                                  if (e.key === 'Escape') cancelRename();
                                }}
                                onBlur={commitRename}
                                placeholder={section.label}
                                className="flex-1 min-w-0 px-1.5 py-1 text-[11px] border border-gray-200 rounded focus:outline-none focus:border-blue-400"
                              />
                              <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={commitRename}
                                className="flex-shrink-0 p-0.5 text-green-600 hover:bg-green-50 rounded"
                                title="保存"
                              >
                                <Check size={12} />
                              </button>
                              <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={cancelRename}
                                className="flex-shrink-0 p-0.5 text-gray-400 hover:bg-gray-100 rounded"
                                title="取消"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ) : (
                            <>
                              {/* 切换模块的点击区 */}
                              <div
                                onClick={() => setActiveSection(section.key)}
                                className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 text-center cursor-pointer transition-colors min-w-0 ${
                                  isActive
                                    ? 'bg-white text-blue-600 border-r-2 border-blue-600'
                                    : 'text-gray-500 hover:bg-white hover:text-gray-700'
                                }`}
                                title={displayLabel}
                              >
                                <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                                <span className="text-[11px] font-medium leading-tight truncate w-full px-0.5">
                                  {displayLabel}
                                </span>
                              </div>

                              {/* 右侧：重命名 + 眼睛 操作区 */}
                              <div className="flex-shrink-0 flex flex-col justify-center gap-0.5 pr-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startRename(section.key, displayLabel);
                                  }}
                                  className="p-0.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                                  title="重命名栏目"
                                >
                                  <Pencil size={11} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSectionVisible(section.key);
                                  }}
                                  className={`p-0.5 rounded ${
                                    hidden
                                      ? 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                                      : 'text-gray-400 hover:text-orange-500 hover:bg-orange-50'
                                  }`}
                                  title={hidden ? '在简历中显示此模块' : '在简历中隐藏此模块'}
                                >
                                  {hidden ? <EyeOff size={11} /> : <Eye size={11} />}
                                </button>
                              </div>

                              {/* 隐藏状态：持续显示眼睛斜杠图标 */}
                              {hidden && (
                                <div className="absolute top-1 right-1 pointer-events-none">
                                  <EyeOff size={10} className="text-orange-400" />
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>

        <div className="mt-2 px-3 space-y-0.5">
          <p className="text-[10px] leading-tight text-gray-400 text-center">
            拖 <GripVertical size={10} className="inline align-text-bottom" /> 排序
          </p>
          <p className="text-[10px] leading-tight text-gray-400 text-center">
            <Pencil size={9} className="inline align-text-bottom" /> 改名 ·
            <Eye size={10} className="inline align-text-bottom mx-0.5" /> 显隐
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">
          {getDisplayLabel(ActiveSection)}
        </h3>
        <ActiveForm />
      </div>
    </div>
  );
};