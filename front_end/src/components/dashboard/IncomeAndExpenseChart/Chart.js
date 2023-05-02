import { Column } from '@ant-design/plots';

const Chart = ({data}) => {
    const config = {
        data,
        height:200,
        isGroup: true,
        xField: 'month',
        yField: 'amount',
        seriesField: 'type',
        // color: ['#1ca9e6', '#f88c24'],
        marginRatio: 0.1,
        label: {
            position: 'middle',
            content:(originData) => {},
            // layout: [
            //     {type: 'interval-adjust-position',},
            //     {type: 'interval-hide-overlap',},
            //     {type: 'adjust-color',},
            // ],
        },
    };
    return <Column {...config} style={{margin:15}}/>;
};

export default Chart;
