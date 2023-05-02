import React from 'react';
import { Line } from '@ant-design/plots';

const OverviewChart = ({data}) => {
  
  const config = {
    data:data || [],
    height:225,
    xField: 'period',
    yField: 'closingBalance',
    seriesField: 'name',
    yAxis: {
      label: {
        formatter: (v) => `₹${v.toLocaleString('en-IN', {minimumFractionDigits:2})}`,
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  return <Line {...config} />;
};

export default OverviewChart;
