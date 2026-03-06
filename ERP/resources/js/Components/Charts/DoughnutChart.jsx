import React, { useRef, useEffect } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import './ChartjsConfig';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

function DoughnutChart({ data, width, height }) {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        cutout: '80%',
        layout: { padding: 24 },
        plugins: { legend: { display: false } },
        interaction: { intersect: false, mode: 'nearest' },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });
    return () => chart.destroy();
  }, [data]);

  return <canvas ref={canvas} width={width} height={height}></canvas>;
}

export default DoughnutChart;
