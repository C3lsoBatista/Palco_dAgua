import React, { useRef, useEffect } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, TimeScale, Tooltip, Filler } from 'chart.js';
import 'chartjs-adapter-moment';
import './ChartjsConfig';

Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale, Tooltip, Filler);

function RealtimeChart({ data, width, height }) {
  const canvas = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        layout: { padding: 20 },
        scales: {
          y: { grid: { drawBorder: false }, suggestedMin: 30, suggestedMax: 80, ticks: { maxTicksLimit: 5 } },
          x: {
            type: 'time',
            time: { displayFormats: { second: 'H:mm:ss' } },
            grid: { display: false, drawBorder: false },
            ticks: { autoSkipPadding: 48, maxRotation: 0 },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: () => false,
              label: (context) => context.parsed.y,
            },
          },
        },
        interaction: { intersect: false, mode: 'nearest' },
        animation: false,
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });
    return () => chartRef.current.destroy();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.data = data;
    chartRef.current.update('none');
  }, [data]);

  return <canvas ref={canvas} width={width} height={height}></canvas>;
}

export default RealtimeChart;
