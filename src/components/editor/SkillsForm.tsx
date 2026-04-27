import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { useResumeStore } from '../../store/resumeStore';

export const SkillsForm: React.FC = () => {
  const { data, addSkill, updateSkill, deleteSkill } = useResumeStore();
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const handleAddItem = (id: string) => {
    const val = inputValues[id]?.trim();
    if (!val) return;
    const skill = data.skills.find((s) => s.id === id);
    if (skill) {
      updateSkill(id, { items: [...skill.items, val] });
    }
    setInputValues({ ...inputValues, [id]: '' });
  };

  const handleRemoveItem = (id: string, idx: number) => {
    const skill = data.skills.find((s) => s.id === id);
    if (skill) {
      updateSkill(id, { items: skill.items.filter((_, i) => i !== idx) });
    }
  };

  return (
    <div className="space-y-3">
      {data.skills.map((skill) => (
        <div key={skill.id} className="border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              value={skill.category}
              onChange={(e) => updateSkill(skill.id, { category: e.target.value })}
              placeholder="技能分类（如：前端技术）"
              className="flex-1 px-3 py-1.5 text-sm font-medium border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
            <button onClick={() => deleteSkill(skill.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {skill.items.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
                {item}
                <button onClick={() => handleRemoveItem(skill.id, idx)} className="hover:text-red-500 transition-colors">
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValues[skill.id] || ''}
              onChange={(e) => setInputValues({ ...inputValues, [skill.id]: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem(skill.id)}
              placeholder="输入技能后按 Enter 添加"
              className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
            <button
              onClick={() => handleAddItem(skill.id)}
              className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
            >
              添加
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={addSkill}
        className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
      >
        <Plus size={16} />
        添加技能分类
      </button>
    </div>
  );
};
