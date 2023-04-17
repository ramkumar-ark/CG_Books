import { Button } from 'antd';
import { InteractionFilled } from '@ant-design/icons';

const RefreshButton = ({onClick}) => (
    <Button onClick={onClick} style={{padding:0, backgroundColor:'blue'}}>
        <InteractionFilled style={{fontSize:30, color:'white', margin:0}} twoToneColor={'blue'}/>
    </Button>
);

export default RefreshButton;
