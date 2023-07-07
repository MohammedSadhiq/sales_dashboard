import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

const BarGraph = ({ data }) => {
  const chartRef = useRef(null);

  const generateRandomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, 0.6)`;
      colors.push(color);
    }
    return colors;
  };

  const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    let chartInstance = null;

    if (data && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const labels = Object.keys(data);
      const values = Object.values(data);
      console.log("labels",labels,"values",values)
      Chart.register(...registerables); 
      const randomColors = generateRandomColors(labels.length); 
      
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Sales',
              data: values,
              backgroundColor: randomColors,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy(); 
      }
    };
  }, [data]);

  

  return <canvas ref={chartRef} style={{ width: '50vw' }}/>;
};

export default BarGraph;
