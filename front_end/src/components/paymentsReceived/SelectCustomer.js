import { Select, Divider, Space, Typography } from "antd";
import { PlusCircleFilled } from '@ant-design/icons'
import { Link } from "react-router-dom";

const { Text } = Typography;

const SelectCustomer = ({customerList, onCustomerSelect, ...rest }) => {
    return (
        <Select 
            showSearch 
            dropdownRender={(menu) => (
                <>
                {menu}
                <Divider style={{margin: '8px 0',}}/>
                <Link to="/app/home/customers/new" style={{display:"block"}}>
                    <Space><PlusCircleFilled/><Text>New Customer</Text></Space>
                </Link>
                </>
            )}
            options={customerList}
            placeholder="Select Customer"
            optionFilterProp="children" 
            filterOption={(input, option) => 
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            onSelect={onCustomerSelect}
            {...rest}
        />
    );
};

export default SelectCustomer;
