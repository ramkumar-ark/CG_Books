import { Drawer, Typography, Avatar, Space, Tabs } from 'antd';
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import AddressDisplayTab from './AddressDisplayTab';
import ContactPersonsDisplayTab from './ContactPersonsDisplayTab';
import useGetLedgerBalances from '../../hooks/useGetLedgerBalances';

const { Title, Text } = Typography;

const EntityDetailsDrawer = ({isOpen, onClose, data, entityTypeDisplay}) => {
    const {data:closingBalances} = useGetLedgerBalances();
    const closingBalance = closingBalances?.[data.ledger['_id']] || 0;
    const [open, setOpen] = useState(isOpen);

    const items = [
        {
          key: '1',
          label: <Typography.Link>ADDRESS</Typography.Link>,
          children: <AddressDisplayTab data={data.addresses}/>,
        },
        {
          key: '2',
          label: <Typography.Link>CONTACT PERSONS</Typography.Link>,
          children: <ContactPersonsDisplayTab data={data}/>,
        },
        // {
        //   key: '3',
        //   label: <Typography.Link>ACTIVITY</Typography.Link>,
        //   children: <ActivityComponent/>,
        // },
    ];

    useEffect(
        () => {setOpen(isOpen)},
        [isOpen]
    );

    return (
        <Drawer
            title={`${entityTypeDisplay} Details`}
            placement='right'
            width={400}
            onClose={onClose}
            closable={false}
            open={open}
            mask={true}
            maskClosable={true}
            rootStyle={{top:"64px"}}
            bodyStyle={{padding: "0 0 50px"}}
            extra={
                <Typography.Link onClick={onClose}><CloseOutlined /></Typography.Link>
            }
        >
            <div style={{backgroundColor:"#f3f8fe", margin: 0, padding: 20}}>
                <Space >
                    <Avatar
                        size={64}
                        style={{
                            backgroundColor: 'white',
                        }}
                        icon={<UserOutlined style={{color: 'blue'}}/>}
                    />
                    <Space direction='vertical'>
                        <Title level={4} style={{margin: 0}}>{data.name}</Title>
                        <Text type='secondary'>{data.companyName}</Text>
                    </Space>
                </Space>
            </div>
            <div style={{margin: 0, padding: 20}}>
                <Space direction='vertical'>
                    <Text type='secondary' strong>Outstanding {entityTypeDisplay==='Customer' ? `Receivables` : `Payables`}</Text>
                    <Text style={{fontSize:"24px"}}>
                        ₹ {Number(closingBalance*(entityTypeDisplay==='Customer' ? 1 : -1))
                            .toLocaleString('en-IN', {minimumFractionDigits:2})}
                    </Text>
                    <Space direction='vertical' style={{margin: "20px 0 0"}}>
                        <Text type='secondary' strong>Credit Terms:</Text>
                        <Text>{`${data.creditPeriod?.value || 0} ${data.creditPeriod?.unit} from Invoice`}</Text>
                    </Space>
                </Space>
            </div>
            <div style={{margin: 0, padding: "0 0 0 20px", borderTop:"ridge"}}>
                <Tabs defaultActiveKey="1" items={items} />
            </div>               
        </Drawer>
    );
};
export default EntityDetailsDrawer;
