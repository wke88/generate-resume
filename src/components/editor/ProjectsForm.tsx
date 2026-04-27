import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useResumeStore } from '../../store/resumeStore';

export const ProjectsForm: React.FC = () => {
  const { data, addProject, updateProject, deleteProject } = useResumeStore();
  const [expanded, setExpanded] = useState<string | null>(data.projects[0]?.id || null);
  const [techInputs, setTechInputs] = useState<Record<string, string>>({});

  const handleAddTech = (id: string) => {
    const val = techInputs[id]?.trim();
    if (!val) return;
    const proj = data.projects.find((p) => p.id === id);
    if (proj) updateProject(id, { technologies: [...proj.technologies, val] });
    setTechInputs({ ...techInputs, [id]: '' });
  };

  const handleRemoveTech = (id: string, idx: number) => {
    const proj = data.projects.find((p) => p.id === id);
    if (proj) updateProject(id, { technologies: proj.technologies.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-3">
      {data.projects.map((proj) => (
        <div key={proj.id} className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50" onClick={() => setExpanded(expanded === proj.id ? null : proj.id)}>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{proj.name || '新项目'}</p>
              <p className="text-xs text-gray-500 truncate">{proj.role || '角色'}</p>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <button onClick={(e) => { e.stopPropagation(); deleteProject(proj.id); }} className="p-1 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50">
                <Trash2 size={14} />
              </button>
              {expanded === proj.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </div>
          </div>
          {expanded === proj.id && (
            <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="项目名称 *" value={proj.name} onChange={(v) => updateProject(proj.id, { name: v })} placeholder="低代码平台" />
                <Field label="担任角色" value={proj.role} onChange={(v) => updateProject(proj.id, { role: v })} placeholder="技术负责人" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="开始时间" value={proj.startDate} onChange={(v) => updateProject(proj.id, { startDate: v })} placeholder="2022-06" />
                <Field label="结束时间" value={proj.endDate} onChange={(v) => updateProject(proj.id, { endDate: v })} placeholder="2023-12" />
              </div>
              <Field label="项目链接（可选）" value={proj.link} onChange={(v) => updateProject(proj.id, { link: v })} placeholder="https://github.com/..." />
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">项目描述</label>
                <textarea
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                  placeholder="描述项目背景、你的工作和成果..."
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-700"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">技术栈</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {proj.technologies.map((tech, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium">
                      {tech}
                      <button onClick={() => handleRemoveTech(proj.id, idx)} className="hover:text-red-500"><X size={10} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInputs[proj.id] || ''}
                    onChange={(e) => setTechInputs({ ...techInputs, [proj.id]: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTech(proj.id)}
                    placeholder="输入技术后按 Enter"
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button onClick={() => handleAddTech(proj.id)} className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">添加</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <button onClick={addProject} className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
        <Plus size={16} />
        添加项目经历
      </button>
    </div>
  );
};

const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder?: string }> = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" />
  </div>
);
