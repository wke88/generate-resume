import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../store/resumeStore';

export const CertificatesForm: React.FC = () => {
  const { data, addCertificate, updateCertificate, deleteCertificate } = useResumeStore();
  return (
    <div className="space-y-3">
      {data.certificates.map((cert) => (
        <div key={cert.id} className="border border-gray-200 rounded-xl p-4">
          <div className="flex justify-between items-start gap-2 mb-3">
            <input type="text" value={cert.name} onChange={(e) => updateCertificate(cert.id, { name: e.target.value })} placeholder="AWS Certified Solutions Architect"
              className="flex-1 px-3 py-2 text-sm font-medium border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" />
            <button onClick={() => deleteCertificate(cert.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">颁发机构</label>
              <input type="text" value={cert.issuer} onChange={(e) => updateCertificate(cert.id, { issuer: e.target.value })} placeholder="Amazon Web Services"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">获得时间</label>
              <input type="text" value={cert.date} onChange={(e) => updateCertificate(cert.id, { date: e.target.value })} placeholder="2022-08"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" /></div>
          </div>
        </div>
      ))}
      <button onClick={addCertificate} className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
        <Plus size={16} />添加证书/荣誉
      </button>
    </div>
  );
};

export const LanguagesForm: React.FC = () => {
  const { data, addLanguage, updateLanguage, deleteLanguage } = useResumeStore();
  return (
    <div className="space-y-3">
      {data.languages.map((lang) => (
        <div key={lang.id} className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
          <input type="text" value={lang.name} onChange={(e) => updateLanguage(lang.id, { name: e.target.value })} placeholder="中文"
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" />
          <select value={lang.level} onChange={(e) => updateLanguage(lang.id, { level: e.target.value })}
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white">
            {['母语', '流利', 'CET-6', 'CET-4', '日常交流', '基础'].map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <button onClick={() => deleteLanguage(lang.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
        </div>
      ))}
      <button onClick={addLanguage} className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
        <Plus size={16} />添加语言
      </button>
    </div>
  );
};

export const CustomSectionsForm: React.FC = () => {
  const { data, addCustomSection, updateCustomSection, deleteCustomSection } = useResumeStore();
  return (
    <div className="space-y-3">
      {data.customSections.map((section) => (
        <div key={section.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <input type="text" value={section.title} onChange={(e) => updateCustomSection(section.id, { title: e.target.value })} placeholder="模块标题"
              className="flex-1 px-3 py-2 text-sm font-medium border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" />
            <button onClick={() => deleteCustomSection(section.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
          </div>
          <textarea value={section.content} onChange={(e) => updateCustomSection(section.id, { content: e.target.value })} placeholder="模块内容..."
            rows={4} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-700" />
        </div>
      ))}
      <button onClick={addCustomSection} className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
        <Plus size={16} />添加自定义模块
      </button>
    </div>
  );
};
