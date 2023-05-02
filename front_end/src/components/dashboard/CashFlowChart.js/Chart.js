import { Line } from '@ant-design/plots';
import { Space, Typography } from 'antd';

const {Text} = Typography;

const Chart = ({data}) => {
    const config = {
        data,
        height:260,
        xField: 'month',
        yField: 'closingBalance',
        label: {
          content:(originData) => {},
        },
        point: {
          size: 5,
          shape: 'circle',
          style: {
            fill: 'white',
            stroke: '#5B8FF9',
            lineWidth: 2,
          },
        },
        tooltip: {
          showMarkers: false,
          formatter: (record) => {
            return {
                name: 'Closing Balance',
                value: record.closingBalance,
            };
          },
            customContent: (title, items) => {
              return <TooltipContent title={title} items={items}/>;
              },
        },
        state: {
          active: {
            style: {
              shadowBlur: 4,
              stroke: '#000',
              fill: 'red',
            },
          },
        },
        interactions: [
          {
            type: 'marker-active',
          },
        ],
      };
      return <Line {...config} />;
};

function TooltipContent({items, title}) {
  const dataObj = items?.[0].data;
  return (
    <div>
      <div><Text style={{fontSize:14}}>{title}</Text></div>
      <div style={{display:'flex', justifyContent:'end'}}>
        <Space direction='vertical' style={{textAlign:'right', marginTop:10}}>
          <Text type='secondary'>Opening Balance:</Text>
          <Text style={{color:'#549d06'}}>Incoming:</Text>
          <Text style={{color:'#e54643'}}>Outgoing:</Text>
          <Text style={{color:"#5B8FF9"}}>Closing Balance:</Text>
        </Space>
        <Space direction='vertical' style={{textAlign:'left', wordBreak:'keep-all', margin:'10px 5px 0px'}}>
          {
           ['openingBalance', 'totalDebit', 'totalCredit', 'closingBalance'].map(
            (e, i) => <Text key={1+i}>₹{dataObj[e].toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>)
          }
        </Space>
      </div>
    </div>
  );
}

export default Chart;