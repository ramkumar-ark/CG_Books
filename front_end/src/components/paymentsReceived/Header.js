import SubHeader from "./SubHeader";
import { Button, Space, Typography } from 'antd';
import { PlusOutlined, InteractionFilled } from '@ant-design/icons';
import { useHistory, useLocation, useParams } from "react-router-dom";
import SortButton from "./SortButton";

const { Title } = Typography;

const NewButton = () => {
    const {pathname} = useLocation();
    const history = useHistory();
    const {transactionid} = useParams();
    const onClick = () => {history.push(`${pathname.replace(`/${transactionid}`, '')}/new`)};
    return (
        <Button type="primary" onClick={onClick} style={{padding:'4px 5px'}}><PlusOutlined/> New </Button>
    );
};

const RefreshButton = ({onClick}) => (
    <Button onClick={onClick} style={{padding:0, backgroundColor:'blue'}}>
        <InteractionFilled style={{fontSize:30, color:'white', margin:0}} twoToneColor={'blue'}/>
    </Button>
);

const Header = ({onRefresh, sortOptions, titleLevel, topOffset}) => {
    return (
        <SubHeader topOffset={topOffset}>
            <Title level={titleLevel || 3} style={{margin:'20px 40px 20px 0'}}>All Received Payments</Title>
            <Space>
                <NewButton/>
                <RefreshButton onClick={onRefresh}/>
                <SortButton sortOptions={sortOptions}/>
            </Space>
        </SubHeader>
    );
};

export default Header;
