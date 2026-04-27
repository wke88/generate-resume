import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { AIFieldButton } from '../ai/AIFieldButton';
import { useAIStore } from '../../store/aiStore';

export const PersonalForm: React.FC = () => {
  const { data, updatePersonal } = useResumeStore();
  const { personal } = data;
  const jd = useAIStore((s) => s.jd);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updatePersonal({ [field]: e.target.value });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('图片大小不要超过 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      updatePersonal({ avatar: String(reader.result || '') });
    };
    reader.readAsDataURL(file);
    // 清空 input 以便再次选择同一文件也能触发
    e.target.value = '';
  };

  const handleAvatarClear = () => updatePersonal({ avatar: '' });

  return (
    <div className="space-y-4">
      {/* 头像 */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">头像</label>
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
            {personal.avatar ? (
              <img src={personal.avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-gray-400">无</span>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex gap-2">
              <label className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition">
                上传图片
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              </label>
              {personal.avatar && (
                <button
                  type="button"
                  onClick={handleAvatarClear}
                  className="px-3 py-1.5 text-xs border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition"
                >
                  清除
                </button>
              )}
            </div>
            <input
              type="text"
              value={personal.avatar}
              onChange={handleChange('avatar')}
              placeholder="或粘贴图片 URL（支持 https / data:image）"
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            />
          </div>
        </div>
        <p className="mt-1 text-[11px] text-gray-400">提示：填写后需在右侧"设置 → 显示头像"中开启开关。</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="姓名 *" value={personal.name} onChange={handleChange('name')} placeholder="张伟" />
        <Field label="职位/头衔 *" value={personal.title} onChange={handleChange('title')} placeholder="高级前端工程师" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="邮箱" value={personal.email} onChange={handleChange('email')} placeholder="you@example.com" type="email" />
        <Field label="电话" value={personal.phone} onChange={handleChange('phone')} placeholder="138-0000-0000" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="所在城市" value={personal.location} onChange={handleChange('location')} placeholder="北京市朝阳区" />
        <Field label="个人网站" value={personal.website} onChange={handleChange('website')} placeholder="https://yoursite.com" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="GitHub" value={personal.github} onChange={handleChange('github')} placeholder="github.com/username" />
        <Field label="LinkedIn" value={personal.linkedin} onChange={handleChange('linkedin')} placeholder="linkedin.com/in/username" />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-medium text-gray-600">个人简介</label>
          <AIFieldButton
            value={personal.summary}
            onApply={(next) => updatePersonal({ summary: next })}
            context={{ role: personal.title, jd }}
            modes={['polish', 'quantify', 'shorten', 'expand', 'translate_en']}
            label="AI 润色"
          />
        </div>
        <textarea
          value={personal.summary}
          onChange={handleChange('summary')}
          placeholder="简要介绍您的背景、核心能力和职业目标..."
          rows={4}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700"
        />
      </div>
    </div>
  );
};

const Field: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}> = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
    />
  </div>
);