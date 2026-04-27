import React, { useRef, useState } from 'react';
import { Palette, Type, Monitor, Bookmark, Save, Trash2, Download, Upload, Check } from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';
import { TEMPLATE_LIST } from '../templates';
import { COLOR_THEMES, FONT_FAMILIES } from '../data/defaults';
import { FontFamily, TemplateId } from '../types/resume';

export const SettingsPanel: React.FC = () => {
  const {
    settings,
    setTemplate,
    setColorTheme,
    setFontSize,
    setFontFamily,
    toggleShowAvatar,
    presets,
    savePreset,
    applyPreset,
    deletePreset,
    exportPresets,
    importPresets,
  } = useResumeStore();

  const [presetName, setPresetName] = useState('');
  const [importMsg, setImportMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSavePreset = () => {
    const name = presetName.trim() || `我的预设 ${presets.length + 1}`;
    savePreset(name);
    setPresetName('');
  };

  const handleExport = () => {
    const json = exportPresets();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-presets-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = importPresets(String(reader.result || ''));
      setImportMsg({ type: result.success ? 'success' : 'error', text: result.message });
      setTimeout(() => setImportMsg(null), 3000);
    };
    reader.readAsText(file);
    // 清空 input 以便再次选择同一文件
    e.target.value = '';
  };

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
        <div className="grid grid-cols-5 gap-2">
          {COLOR_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setColorTheme(theme)}
              title={theme.name}
              className={`flex flex-col items-center gap-1 p-1.5 rounded-lg border-2 transition-all ${
                settings.colorTheme.id === theme.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: theme.primary }}
              />
              <span className="text-[10px] text-gray-600 leading-tight truncate w-full text-center">
                {theme.name}
              </span>
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
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">字体风格</label>
            <div className="grid grid-cols-3 gap-2">
              {FONT_FAMILIES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFontFamily(f.id as FontFamily)}
                  className={`py-2 px-2 text-xs rounded-lg border-2 font-medium transition-all flex flex-col items-center gap-0.5 ${
                    settings.fontFamily === f.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                  title={f.label}
                >
                  <span className="text-[11px] leading-tight" style={{ fontFamily: f.css }}>
                    {f.sample}
                  </span>
                  <span className="text-[10px] text-gray-400 leading-tight">{f.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-gray-600">字体大小</label>
              <span className="text-xs font-mono text-blue-600">
                {settings.fontSize.toFixed(1)}px
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={18}
              step={0.5}
              value={settings.fontSize}
              onChange={(e) => setFontSize(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>小</span>
              <span>默认 12</span>
              <span>大</span>
            </div>
            <button
              onClick={() => setFontSize(12)}
              className="mt-1 text-[10px] text-gray-400 hover:text-blue-600 transition-colors"
            >
              恢复默认
            </button>
          </div>
        </div>
      </section>

      {/* Custom Presets */}
      <section>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
          <Bookmark size={15} />
          自定义预设
          <span className="text-[10px] font-normal text-gray-400 ml-auto">
            保存 · 应用 · 分享当前外观
          </span>
        </h3>

        {/* 保存当前配置 */}
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            placeholder="预设名称（可选）"
            className="flex-1 px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSavePreset();
            }}
          />
          <button
            onClick={handleSavePreset}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            title="将当前模板+颜色+字体+模块显示状态保存为预设"
          >
            <Save size={12} />
            保存
          </button>
        </div>

        {/* 预设列表 */}
        {presets.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4 border border-dashed border-gray-200 rounded-lg">
            尚未保存任何预设
          </p>
        ) : (
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {presets.map((p) => (
              <div
                key={p.id}
                className="group flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div
                  className="w-3 h-3 rounded-full border border-white shadow-sm flex-shrink-0"
                  style={{ backgroundColor: p.settings.colorTheme.primary }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-700 truncate">{p.name}</p>
                  <p className="text-[10px] text-gray-400">
                    {TEMPLATE_LIST.find((t) => t.id === p.settings.templateId)?.name || p.settings.templateId}
                    {' · '}
                    {typeof p.settings.fontSize === 'number' ? p.settings.fontSize : 12}px
                  </p>
                </div>
                <button
                  onClick={() => applyPreset(p.id)}
                  className="flex items-center gap-0.5 px-2 py-1 text-[10px] font-medium text-blue-600 hover:bg-blue-100 rounded transition-colors"
                  title="应用此预设"
                >
                  <Check size={11} />
                  应用
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`确定删除预设「${p.name}」？`)) deletePreset(p.id);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="删除"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 导入导出 */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleExport}
            disabled={presets.length === 0}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="导出为 JSON 文件"
          >
            <Download size={12} />
            导出
          </button>
          <button
            onClick={handleImportClick}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            title="从 JSON 文件导入预设"
          >
            <Upload size={12} />
            导入
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImportFile}
            className="hidden"
          />
        </div>
        {importMsg && (
          <p className={`mt-2 text-[11px] ${importMsg.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
            {importMsg.text}
          </p>
        )}
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
