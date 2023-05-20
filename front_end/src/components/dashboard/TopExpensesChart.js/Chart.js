import { Pie } from '@ant-design/plots';

const Chart = ({data}) => {
    const config = {
        appendPadding: 10,
        data,
        height:294.42,
        angleField: 'amount',
        colorField: 'expense',
        radius: 0.9,
        label: {
          type: 'inner',
          offset: '-30%',
          content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
          style: {
            fontSize: 14,
            textAlign: 'center',
          },
        },
        tooltip: {
          showMarkers: false,
          formatter: (record) => {
            return {
                name:record.expense,
                value:`₹ ${record.amount.toLocaleString('en-IN', {minimumFractionDigits:2})}`,
            };
          },
      },
        interactions: [
          {
            type: 'element-active',
          },
        ],
    };
    return <Pie {...config} />;
};

export default Chart;
