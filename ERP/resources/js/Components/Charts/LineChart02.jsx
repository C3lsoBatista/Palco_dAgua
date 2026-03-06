import React, { useRef, useEffect } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, TimeScale, Tooltip, Filler } from 'chart.js';
import 'chartjs-adapter-moment';
import './ChartjsConfig';

Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale, Tooltip, Filler);

function LineChart02({ data, width, height }) {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;
    const chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        layout: { padding: 20 },
        scales: {
          y: { ticks: { maxTicksLimit: 5 }, grid: { drawBorder: false } },
          x: {
            type: 'time',
            time: { parser: 'MM-DD-YYYY', unit: 'month', displayFormats: { month: 'MMM yy' } },
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
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });
    return () => chart.destroy();
  }, [data]);

  return <canvas ref={canvas} width={width} height={height}></canvas>;
}

export default LineChart02;
