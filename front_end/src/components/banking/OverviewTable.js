import { Dropdown, Space, Table, Typography } from "antd";
import Icon, { BankOutlined, DownCircleOutlined } from "@ant-design/icons"
import { ReactComponent as CashIconSvg} from '../../resources/images/CashIcon2.svg';
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const {Link} = Typography; 

const CashIcon = (props) => <Icon component={CashIconSvg} {...props} />;
const CashIconMod = () => (
    <div style={{borderRadius:'100%', border:'0.5px solid grey', padding:5}}>
        <CashIcon style={{fontSize:30}}/>
    </div>
);
const BankIconMod = () => (
    <div style={{borderRadius:'100%', border:'0.5px solid grey', padding:5}}>
        <BankOutlined style={{fontSize:28}}/>
    </div>
);

const OverviewTable = ({data}) => {
    const history = useHistory();
    const {pathname} = useLocation();
    const [dataSource, setDataSource] = useState(data);
    const actionOptions = (record) =>{
        console.log(record);
        if (record.type==='cash') return[
            {label:<Link onClick={() => history.push(`${pathname}/edit/cashaccount/${record.ledgerId}`)}>
                Edit Account
                </Link>, key:1}, 
            {label:<Link onClick={() => {history.push(`${pathname}/${record.ledgerId}`)}}>View Transactions</Link>, key:2},
        ];
        else return [
            {label:<Link onClick={() => history.push(`${pathname}/edit/${record.bankDetailsId}`)}>Edit Account</Link>, key:1}, 
            {label:<Link onClick={() => {history.push(`${pathname}/${record.ledgerId}`)}}>View Transactions</Link>, key:2},
        ];
    };
    const columns = [
        {
            title:'ACCOUNT DETAILS',
            dataIndex:'name',
            key:'name',
            render: (text, record) => (
                <Space size='large'>
                    {record.type === 'cash' ? <CashIconMod/> : <BankIconMod />}
                    <Link style={{fontSize:16}} onClick={() => {history.push(`${pathname}/${record.ledgerId}`)}}> 
                        {text}
                    </Link>
                </Space>
            ),
        },
        {
            title: 'AMOUNT',
            dataIndex: 'balance',
            key:'balance',
            align: 'right',
            render: (text) => `₹${Number(text).toLocaleString('en-IN', {minimumFractionDigits:2})}`,
        },
        {
            key:'action',
            align: 'center',
            render: (text, record, index) => (
                <Dropdown trigger={['click']} menu={{items: actionOptions(record)}}>
                    <DownCircleOutlined style={{fontSize:16}}/>
                </Dropdown>
            ),
        }
    ];

    useEffect(() => {setDataSource(data)}, [data]);
    
    return <Table dataSource={dataSource} columns={columns} pagination={false}/>;
     
};

export default OverviewTable;
