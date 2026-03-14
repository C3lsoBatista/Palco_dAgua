import React, { useRef, useEffect } from 'react';
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import './ChartjsConfig';

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);

function BarChart01({ data, width, height }) {
  const canvas = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;
    
    if (chartRef.current) {
        chartRef.current.destroy();
    }

    const currencyFormatter = new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    // Helper para formatar moeda com espaço nos milhar e espaço antes do €
    // Ex: 9800 -> 9 800 €
    const formatCurrency = (value) => {
        if (value === null || value === undefined) return '';
        const rounded = Math.round(value);
        const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return `${formatted} €`;
    };

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        layout: { padding: { top: 12, bottom: 16, left: 20, right: 20 } },
        scales: {
          y: { 
            grid: { drawBorder: false }, 
            ticks: { 
                maxTicksLimit: 5,
                callback: (value) => formatCurrency(value)
            } 
          },
          x: { grid: { display: false, drawBorder: false } },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: () => false,
              label: (context) => formatCurrency(Math.round(context.parsed.y)),
            },
          },
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
    <div className="flex flex-col justify-center align-center" style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%' }}>
      <canvas ref={canvas}></canvas>
    </div>
  );
}

export default BarChart01;

