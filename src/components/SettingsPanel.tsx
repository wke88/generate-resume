import React from 'react';
import { Palette, Type, Monitor } from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';
import { TEMPLATE_LIST } from '../templates';
import { COLOR_THEMES } from '../data/defaults';
import { TemplateId } from '../types/resume';

export const SettingsPanel: React.FC = () => {
  const { settings, setTemplate, setColorTheme, setFontSize, setFontFamily, toggleShowAvatar } = useResumeStore();

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      {/* Template Selection */}
      <section>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
          <Monitor size={15} />
          简历模板
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATE_LIST.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => setTemplate(tpl.id as TemplateId)}
              className={`flex flex-col items-start p-3 rounded-xl border-2 text-left transition-all ${
                settings.templateId === tpl.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className={`text-sm font-semibold ${settings.templateId === tpl.id ? 'text-blue-700' : 'text-gray-700'}`}>
                {tpl.name}
              </span>
              <span className="text-xs text-gray-500 mt-0.5">{tpl.desc}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Color Theme */}
      <section>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
          <Palette size={15} />
          颜色主题
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {COLOR_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setColorTheme(theme)}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all ${
                settings.colorTheme.id === theme.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-7 h-7 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.primary }} />
              <span className="text-[11px] text-gray-600">{theme.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
          <Type size={15} />
          字体设置
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">字体风格</label>
            <div className="flex gap-2">
              {[
                { id: 'sans', label: '无衬线' },
                { id: 'serif', label: '衬线体' },
                { id: 'mono', label: '等宽体' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFontFamily(f.id as 'sans' | 'serif' | 'mono')}
                  className={`flex-1 py-2 text-xs rounded-lg border-2 font-medium transition-all ${
                    settings.fontFamily === f.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">字体大小</label>
            <div className="flex gap-2">
              {[
                { id: 'small', label: '小' },
                { id: 'medium', label: '中' },
                { id: 'large', label: '大' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setFontSize(s.id as 'small' | 'medium' | 'large')}
                  className={`flex-1 py-2 text-xs rounded-lg border-2 font-medium transition-all ${
                    settings.fontSize === s.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Settings */}
      <section>
        <h3 className="text-sm font-semibold text-gray-800 mb-3">其他设置</h3>
        <div className="space-y-2">
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <span className="text-sm text-gray-700">显示头像</span>
            <div
              onClick={toggleShowAvatar}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                settings.showAvatar ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                settings.showAvatar ? 'translate-x-4' : 'translate-x-1'
              }`} />
            </div>
          </label>
        </div>
      </section>
    </div>
  );
};
