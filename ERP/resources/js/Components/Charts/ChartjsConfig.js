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
    light: getCssVariable('--color-slate-400'),
    dark: getCssVariable('--color-slate-500'),
  },
  gridColor: {
    light: getCssVariable('--color-slate-100'),
    dark: adjustColorOpacity(getCssVariable('--color-slate-700'), 0.6),
  },
  backdropColor: {
    light: getCssVariable('--color-white'),
    dark: getCssVariable('--color-slate-800'),
  },
  tooltipTitleColor: {
    light: getCssVariable('--color-slate-800'),
    dark: getCssVariable('--color-slate-100'),
  },
  tooltipBodyColor : {
    light: getCssVariable('--color-slate-500'),
    dark: getCssVariable('--color-slate-400')
  },
  tooltipBgColor: {
    light: getCssVariable('--color-white'),
    dark: getCssVariable('--color-slate-700'),
  },
  tooltipBorderColor: {
    light: getCssVariable('--color-slate-200'),
    dark: getCssVariable('--color-slate-600'),
  },
};
