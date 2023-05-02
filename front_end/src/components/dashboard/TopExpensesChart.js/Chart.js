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
        interactions: [
          {
            type: 'element-active',
          },
        ],
    };
    return <Pie {...config} />;
};

export default Chart;
