// Import Chart.js
import { Chart, Tooltip } from 'chart.js';
// Import utilities
import { adjustColorOpacity, getCssVariable } from '@/utils/Utils';

Chart.register(Tooltip);

// Define Chart.js default settings
Chart.defaults.font.family = '"Inter", sans-serif';
Chart.defaults.font.weight = 500;
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.displayColors = false;
Chart.defaults.plugins.tooltip.mode = 'nearest';
Chart.defaults.plugins.tooltip.intersect = false;
Chart.defaults.plugins.tooltip.position = 'nearest';
Chart.defaults.plugins.tooltip.caretSize = 0;
Chart.defaults.plugins.tooltip.caretPadding = 20;
Chart.defaults.plugins.tooltip.cornerRadius = 8;
Chart.defaults.plugins.tooltip.padding = 8;

// Function that generates a gradient for line charts
export const chartAreaGradient = (ctx, chartArea, colorStops) => {
  if (!ctx || !chartArea || !colorStops || colorStops.length === 0) {
    return 'transparent';
  }
  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  colorStops.forEach(({ stop, color }) => {
    gradient.addColorStop(stop, color);
  });
  return gradient;
};

export const chartColors = {
  textColor: {
    light: getCssVariable('--color-slate-400') || '#94a3b8',
    dark: getCssVariable('--color-slate-500') || '#64748b',
  },
  gridColor: {
    light: getCssVariable('--color-slate-100') || '#f1f5f9',
    dark: adjustColorOpacity(getCssVariable('--color-slate-700') || '#334155', 0.6),
  },
  backdropColor: {
    light: getCssVariable('--color-white') || '#ffffff',
    dark: getCssVariable('--color-slate-800') || '#1e293b',
  },
  tooltipTitleColor: {
    light: getCssVariable('--color-slate-800') || '#1e293b',
    dark: getCssVariable('--color-slate-100') || '#f1f5f9',
  },
  tooltipBodyColor : {
    light: getCssVariable('--color-slate-500') || '#64748b',
    dark: getCssVariable('--color-slate-400') || '#94a3b8'
  },
  tooltipBgColor: {
    light: getCssVariable('--color-white') || '#ffffff',
    dark: getCssVariable('--color-slate-700') || '#334155',
  },
  tooltipBorderColor: {
    light: getCssVariable('--color-slate-200') || '#e2e8f0',
    dark: getCssVariable('--color-slate-600') || '#475569',
  },
};
