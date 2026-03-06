import React, { useRef, useEffect } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, TimeScale, Tooltip, Filler } from 'chart.js';
import 'chartjs-adapter-moment';
import './ChartjsConfig';

Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale, Tooltip, Filler);

function LineChart01({ data, width, height }) {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;
    const chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        layout: { padding: 20 },
        scales: {
          y: { display: false, beginAtZero: true },
          x: { type: 'time', time: { parser: 'MM-DD-YYYY', unit: 'month' }, display: false },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: () => false,
              label: (context) => context.parsed.y,
            },
          },
          legend: { display: false },
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

export default LineChart01;
