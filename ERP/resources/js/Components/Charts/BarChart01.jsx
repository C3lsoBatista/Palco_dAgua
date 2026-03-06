import React, { useRef, useEffect } from 'react';
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import './ChartjsConfig';

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);

function BarChart01({ data, width, height }) {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;
    const chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        layout: { padding: { top: 12, bottom: 16, left: 20, right: 20 } },
        scales: {
          y: { grid: { drawBorder: false }, ticks: { maxTicksLimit: 5 } },
          x: { grid: { display: false, drawBorder: false } },
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
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });
    return () => chart.destroy();
  }, [data]);

  return <canvas ref={canvas} width={width} height={height}></canvas>;
}

export default BarChart01;
