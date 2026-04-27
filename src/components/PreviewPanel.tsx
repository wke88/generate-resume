import React, { useState } from 'react';
import { useResumeStore } from '../store/resumeStore';
import { TemplateRenderer } from '../templates';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export const PreviewPanel: React.FC = () => {
  const { data, settings } = useResumeStore();
  const [zoom, setZoom] = useState(0.6);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.1, 1.2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.3));
  const handleZoomReset = () => setZoom(0.6);

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Zoom controls */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 flex-shrink-0">
        <span className="text-xs text-gray-500">预览</span>
        <div className="flex items-center gap-1">
          <button onClick={handleZoomOut} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors" title="缩小">
            <ZoomOut size={14} />
          </button>
          <button onClick={handleZoomReset} className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-lg min-w-[48px] text-center transition-colors">
            {Math.round(zoom * 100)}%
          </button>
          <button onClick={handleZoomIn} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors" title="放大">
            <ZoomIn size={14} />
          </button>
          <button onClick={handleZoomReset} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors ml-1" title="重置缩放">
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 overflow-auto flex items-start justify-center py-8 px-4">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            boxShadow: '0 4px 40px rgba(0,0,0,0.15)',
            borderRadius: '2px',
          }}
          className="resume-preview-wrapper"
        >
          <TemplateRenderer data={data} settings={settings} />
        </div>
      </div>
    </div>
  );
};
