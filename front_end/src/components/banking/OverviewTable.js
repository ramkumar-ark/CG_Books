import { Dropdown, Space, Table } from "antd";
import Icon, { BankOutlined, DownCircleOutlined } from "@ant-design/icons"
import { ReactComponent as CashIconSvg} from '../../resources/images/CashIcon2.svg';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
    const [dataSource, setDataSource] = useState(data);
    const actionOptions = [
        {label:'Edit Account', key:1}, {label:'View Transactions', key:2},
    ];
    const columns = [
        {
            title:'ACCOUNT DETAILS',
            dataIndex:'name',
            key:'name',
            render: (text, record) => (
                <Space size='large'>
                    {record.type === 'cash' ? <CashIconMod/> : <BankIconMod />}
                    <Link style={{fontSize:16}}> {text}</Link>
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
            render: () => (
                <Dropdown trigger={['click']} menu={{items: actionOptions}}>
                    <DownCircleOutlined style={{fontSize:16}}/>
                    </Dropdown>
            ),
        }
    ];

    useEffect(() => {setDataSource(data)}, [data]);
    
    return <Table dataSource={dataSource} columns={columns} pagination={false}/>
};

export default OverviewTable;
