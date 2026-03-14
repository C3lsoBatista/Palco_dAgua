import React, { useRef, useEffect } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import './ChartjsConfig';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

function DoughnutChart({ data, width, height, isPie = false }) {
  const canvas = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        cutout: isPie ? '0%' : '80%',
        layout: { padding: 4 },
        plugins: { 
          legend: { display: false },
          tooltip: {
            enabled: true,
          }
        },
        interaction: { intersect: false, mode: 'nearest' },
        maintainAspectRatio: false,
        responsive: true,
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="flex flex-col justify-center align-center" style={{ width: width ? `${width}px` : 'auto', height: height ? `${height}px` : '100%' }}>
      <canvas ref={canvas}></canvas>
    </div>
  );
}

export default DoughnutChart;

