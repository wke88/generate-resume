import React, { useRef, useState } from 'react';
import { Download, Upload, RotateCcw, FileJson, Printer, ChevronDown } from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';
import { exportToPDF, exportToJSON, importFromJSON } from '../utils/export';

export const TopBar: React.FC = () => {
  const { data, settings, importData, resetToDefault } = useResumeStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showMenu, setShowMenu] = useState(false);

  const handlePDFExport = () => {
    const name = data.personal.name ? `${data.personal.name}的简历` : '我的简历';
    exportToPDF(name);
    setShowMenu(false);
  };

  const handleJSONExport = () => {
    const name = data.personal.name ? `${data.personal.name}简历数据` : '简历数据';
    exportToJSON(data, name);
    setShowMenu(false);
  };

  const handleJSONImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const imported = await importFromJSON(file);
      importData(imported as typeof data);
      alert('✅ 数据导入成功！');
    } catch {
      alert('❌ 导入失败，请确认文件格式正确');
    }
    e.target.value = '';
  };

  const handlePrint = () => {
    window.print();
    setShowMenu(false);
  };

  const handleReset = () => {
    if (confirm('确认重置为示例数据？当前所有修改将丢失。')) {
      resetToDefault();
    }
  };

  return (
    <header className="h-14 flex-shrink-0 bg-white border-b border-gray-200 flex items-center px-5 justify-between z-10">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">R</span>
        </div>
        <div>
          <span className="text-sm font-semibold text-gray-900">简历生成器</span>
          <span className="ml-2 text-xs text-gray-400 hidden sm:inline">Resume Builder</span>
        </div>
      </div>

      {/* Template indicator */}
      <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.colorTheme.primary }} />
        <span className="text-xs text-blue-700 font-medium">
          {settings.templateId === 'modern' ? '现代' : settings.templateId === 'classic' ? '经典' : settings.templateId === 'minimal' ? '极简' : '技术'} 模板
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Import JSON */}
        <input ref={fileInputRef} type="file" accept=".json" onChange={handleJSONImport} className="hidden" />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          title="从 JSON 文件导入数据"
        >
          <Upload size={14} />
          <span className="hidden sm:inline">导入</span>
        </button>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          title="重置为示例数据"
        >
          <RotateCcw size={14} />
          <span className="hidden sm:inline">重置</span>
        </button>

        {/* Export Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-colors font-medium"
          >
            <Download size={14} />
            导出
            <ChevronDown size={12} />
          </button>
          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
                <button onClick={handlePDFExport} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Download size={14} className="text-blue-600" />
                  下载 PDF
                </button>
                <button onClick={handleJSONExport} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <FileJson size={14} className="text-green-600" />
                  导出 JSON
                </button>
                <div className="h-px bg-gray-100 my-1" />
                <button onClick={handlePrint} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Printer size={14} className="text-gray-500" />
                  打印
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
