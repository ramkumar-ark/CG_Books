import { Progress, Space, Tooltip, Typography } from 'antd';

const {Text} = Typography;

const ProgressBar = ({documentType, overdue, current}) => (
    <div style={{padding:'10px 20px', textAlign:'left'}}>
        <Text type='secondary'>
            Total Unpaid {documentType}s: ₹{(overdue + current).toLocaleString('en-IN', {minimumFractionDigits:2})}
        </Text>
        <Tooltip title={`Current:₹${current?.toLocaleString('en-IN', {minimumFractionDigits:2})} \n Overdue:₹${overdue?.toLocaleString('en-IN', {minimumFractionDigits:2})}`}>
            <Progress
              percent={100}
              success={{percent: current*100/(current + overdue)}}
              showInfo={false}
              size={[20, 300]}
            />
        </Tooltip>
        
    </div>
);
export default ProgressBar;
