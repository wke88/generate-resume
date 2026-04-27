import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useResumeStore } from '../../store/resumeStore';

export const EducationForm: React.FC = () => {
  const { data, addEducation, updateEducation, deleteEducation } = useResumeStore();
  const [expanded, setExpanded] = useState<string | null>(data.education[0]?.id || null);

  return (
    <div className="space-y-3">
      {data.education.map((edu) => (
        <div key={edu.id} className="border border-gray-200 rounded-xl overflow-hidden">
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50"
            onClick={() => setExpanded(expanded === edu.id ? null : edu.id)}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{edu.school || '新教育经历'}</p>
              <p className="text-xs text-gray-500 truncate">{edu.major || '专业'}{edu.degree && ` · ${edu.degree}`}</p>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <button onClick={(e) => { e.stopPropagation(); deleteEducation(edu.id); }} className="p-1 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50">
                <Trash2 size={14} />
              </button>
              {expanded === edu.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </div>
          </div>
          {expanded === edu.id && (
            <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="学校名称 *" value={edu.school} onChange={(v) => updateEducation(edu.id, { school: v })} placeholder="北京大学" />
                <Field label="专业" value={edu.major} onChange={(v) => updateEducation(edu.id, { major: v })} placeholder="计算机科学" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">学历</label>
                  <select
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
                  >
                    {['博士', '硕士', '本科', '专科', '其他'].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <Field label="GPA（可选）" value={edu.gpa} onChange={(v) => updateEducation(edu.id, { gpa: v })} placeholder="3.8/4.0" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="入学时间" value={edu.startDate} onChange={(v) => updateEducation(edu.id, { startDate: v })} placeholder="2014-09" />
                <Field label="毕业时间" value={edu.endDate} onChange={(v) => updateEducation(edu.id, { endDate: v })} placeholder="2018-06" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">附加描述（可选）</label>
                <textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                  placeholder="荣誉、奖学金、相关课程..."
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-700"
                />
              </div>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={addEducation}
        className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
      >
        <Plus size={16} />
        添加教育经历
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
