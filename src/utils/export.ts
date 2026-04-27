export const exportToPDF = async (fileName: string = '我的简历') => {
  const element = document.getElementById('resume-preview');
  if (!element) {
    alert('未找到简历预览区域');
    return;
  }

  try {
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).default;

    // Show loading
    const loadingEl = document.createElement('div');
    loadingEl.id = 'pdf-loading';
    loadingEl.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999;';
    loadingEl.innerHTML = '<div style="background:white;padding:24px 32px;border-radius:12px;text-align:center;"><p style="font-size:14px;color:#374151;margin:0 0 4px">正在生成 PDF...</p><p style="font-size:12px;color:#9ca3af;margin:0">请稍候</p></div>';
    document.body.appendChild(loadingEl);

    await new Promise((r) => setTimeout(r, 100)); // allow DOM update

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = 210;
    const pdfHeight = 297;
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / pdfWidth;
    const totalPdfHeight = imgHeight / ratio;

    if (totalPdfHeight <= pdfHeight) {
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, totalPdfHeight);
    } else {
      // Multi-page
      let yOffset = 0;
      while (yOffset < totalPdfHeight) {
        if (yOffset > 0) pdf.addPage();
        const sourceY = (yOffset / totalPdfHeight) * imgHeight;
        const sourceHeight = Math.min((pdfHeight / totalPdfHeight) * imgHeight, imgHeight - sourceY);

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = imgWidth;
        pageCanvas.height = sourceHeight;
        const ctx = pageCanvas.getContext('2d')!;
        ctx.drawImage(canvas, 0, sourceY, imgWidth, sourceHeight, 0, 0, imgWidth, sourceHeight);
        const pageData = pageCanvas.toDataURL('image/png');
        const pageImgHeight = (sourceHeight / ratio);
        pdf.addImage(pageData, 'PNG', 0, 0, pdfWidth, pageImgHeight);
        yOffset += pdfHeight;
      }
    }

    pdf.save(`${fileName}.pdf`);
  } catch (err) {
    console.error('PDF export error:', err);
    alert('PDF 生成失败，请重试');
  } finally {
    document.getElementById('pdf-loading')?.remove();
  }
};

export const exportToJSON = (data: unknown, fileName: string = '简历数据') => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importFromJSON = (file: File): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve(data);
      } catch {
        reject(new Error('文件格式错误'));
      }
    };
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsText(file);
  });
};
