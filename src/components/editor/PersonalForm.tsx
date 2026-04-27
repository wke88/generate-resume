import React from 'react';
import { useResumeStore } from '../../store/resumeStore';

export const PersonalForm: React.FC = () => {
  const { data, updatePersonal } = useResumeStore();
  const { personal } = data;

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updatePersonal({ [field]: e.target.value });
  };

  return (
    <div className="space-y-4">
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
        <label className="block text-xs font-medium text-gray-600 mb-1">个人简介</label>
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
