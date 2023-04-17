import { Column } from '@ant-design/plots';

const CustomerIncomeChart = ({data, type}) => {
  const chartData = (type === 'Income') ? data : data.map(e => ({month:e.month, income:e.income*-1}));
  const config = {
    data:chartData,
    xField: 'month',
    yField: 'income',
    columnWidthRatio: 0.8,
    label: {
      position: 'middle',
      autoHide:true,
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
      content:(originData) => {},
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      income: {
        alias: type,
      },
    },
  };
  return <Column {...config} height={150} width={570}/>;
};

export default CustomerIncomeChart;
