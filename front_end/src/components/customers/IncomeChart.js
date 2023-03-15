import { Column } from '@ant-design/plots';

const CustomerIncomeChart = ({data}) => {
  const config = {
    data,
    xField: 'month',
    yField: 'income',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return <Column {...config} height={150} width={570}/>;
};

export default CustomerIncomeChart;
