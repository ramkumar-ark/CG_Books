import SubHeader from "../individual components/SubHeader";
import { Space, Typography, Dropdown, Button } from 'antd';
import {CaretDownOutlined, CloseOutlined} from "@ant-design/icons"
import { useHistory } from "react-router-dom";

const { Title, Link } = Typography;

const Header = ({titleLevel, topOffset, componentRef, title, ...rest}) => {
    const history = useHistory();
    const items = [
        {label:<Link onClick={() => {history.push('/app/home/bills/new')}}>Bill</Link>, key:0},
        {label:<Link onClick={() => {history.push('/app/home/paymentsmade/new')}}>Vendor Payment</Link>, key:1}, 
        {label:'Journals', key:2}
    ];
    return (
        <SubHeader topOffset={topOffset} componentref={componentRef}>
            <Title level={titleLevel || 3} ellipsis={{rows:2}} style={{margin:'20px 40px 20px 0', wordBreak:'normal'}}>
                {title}
            </Title>
            <Space>
                <Button href={`/app/home/vendors/edit/${rest.entityId}`}>Edit</Button>
                <Dropdown menu={{items}} trigger={['click']}>
                    <Button type="primary">New Transaction<CaretDownOutlined/></Button>
                </Dropdown>
                <Button onClick={rest.deleteFunction}>Delete</Button>
                <Link onClick={() => history.goBack()} style={{marginLeft:'5px'}}>
                    <CloseOutlined style={{fontSize:20, color:'grey'}}/>
                </Link>
            </Space>
        </SubHeader>
    );
};

export default Header;
