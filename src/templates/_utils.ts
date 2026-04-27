import { ResumeSettings } from '../types/resume';
import { DEFAULT_SECTION_TITLES, FONT_FAMILY_CSS as _FONT_FAMILY_CSS } from '../data/defaults';

/** 从 defaults 重导出，给受 IDE 语言服务缓存问题影响的模板绕路使用 */
export const FONT_FAMILY_CSS = _FONT_FAMILY_CSS;

/**
 * 基准字号 = 12px。所有模板内硬编码的 px 值以 12 为基准进行等比缩放。
 * scale = settings.fontSize / 12
 *
 * 用法：
 *   const fs = makeFsScaler(settings.fontSize);
 *   <div style={{ fontSize: fs(13) }}>   // 会在用户调大字号时自动放大
 */
export const makeFsScaler = (base: number) => {
  const safe = Number.isFinite(base) && base > 0 ? base : 12;
  const scale = safe / 12;
  return (px: number): string => `${+(px * scale).toFixed(2)}px`;
};

/** 模块是否被用户隐藏 */
export const isSectionHidden = (settings: ResumeSettings, key: string): boolean => {
  return (settings.hiddenSections || []).includes(key);
};

/**
 * 获取某个模块应显示的标题：
 * 1. 用户自定义优先
 * 2. 否则用模板传入的 defaultTitle
 * 3. 最后回退到全局默认值
 */
export const getSectionTitle = (
  settings: ResumeSettings,
  key: string,
  defaultTitle?: string,
): string => {
  const custom = settings.sectionTitles?.[key];
  if (custom && custom.trim()) return custom;
  if (defaultTitle) return defaultTitle;
  return DEFAULT_SECTION_TITLES[key] || key;
};

/**
 * 按 sectionOrder 过滤掉隐藏模块后的顺序键列表。
 * 如果 key 不在 sectionOrder 中但存在 renderers，补充到末尾（兼容旧数据）。
 */
export const getVisibleOrderedKeys = (
  settings: ResumeSettings,
  availableKeys: string[],
): string[] => {
  const order = settings.sectionOrder || [];
  const hidden = new Set(settings.hiddenSections || []);
  const seen = new Set<string>();
  const result: string[] = [];
  order.forEach((k) => {
    if (availableKeys.includes(k) && !hidden.has(k) && !seen.has(k)) {
      result.push(k);
      seen.add(k);
    }
  });
  availableKeys.forEach((k) => {
    if (!seen.has(k) && !hidden.has(k)) result.push(k);
  });
  return result;
};
