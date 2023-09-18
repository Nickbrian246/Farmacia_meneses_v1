import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ArraySaleTotalAndDay } from '../../../interfaces';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

interface Props {
  arrayDateTotalAndDay: ArraySaleTotalAndDay[];
}
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function VerticalGhrapic(props: Props) {
  const { arrayDateTotalAndDay } = props;
console.log(arrayDateTotalAndDay.length);

if(arrayDateTotalAndDay.length >1) {
    // Extract the data for the two days you want to display
    const firstDayData = arrayDateTotalAndDay[0];
    const secondDayData = arrayDateTotalAndDay[1];
    const firstDay = arrayDateTotalAndDay[0].day;
    const secondDay = arrayDateTotalAndDay[1].day;
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false, // Hide the legend
        },
        title: {
          display: false,
          text: 'Chart.js Bar Chart',
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          display: true, // Hide the x-axis
        },
        y: {
          beginAtZero: true,
        },
      },
    };
  
    const data = {
      labels: [`${firstDay} (${firstDayData.date})`, `${secondDay} (${secondDayData.date})`], // Labels for the two days
      datasets: [
        {
          data: [firstDayData.total, secondDayData.total], // Data for the two days
          backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)'],
          
        },
      ],
    };
  
    return <Bar options={options} data={data} />;
}else {
  let complement = [...arrayDateTotalAndDay,{day:"No data", date:"", total:"No data"}]
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${complement[0].day}`,
      },
    },
  };
  
  const data = {
    labels:complement.map((data) => data.day ),
    datasets: [
      {
        label: complement.map((data) => data.date ),
        data: complement.map((data) => data.total),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  //@ts-ignore
  return <Bar options={options} data={data} />;
}
}

export { VerticalGhrapic };
