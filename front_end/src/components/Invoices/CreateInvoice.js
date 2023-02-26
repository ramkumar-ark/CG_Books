import { Spin, Divider, Typography, Form, Select, Input, Space } from "antd";
import { FileTextOutlined, PlusCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetCustomersQuery } from "../../service/mastersApi";
import useAuthentication from "../../useAuthentication";
import { useContext } from "react";
import { useGetSelectedOrgQuery } from "../../service/appApi";

const { Title, Text } = Typography;

const CreateInvoice = () => {
    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);
    let selectedOrg;
    const {data} = useGetSelectedOrgQuery(user.id);
    if (data) selectedOrg = data.selectedOrg;
    const orgId = selectedOrg && selectedOrg['_id'];
    const [form] = Form.useForm();
    const onSave = (values) => {console.log(values)};
    let customerList = [];
    // get customer data
    const { data: data1 } = useGetCustomersQuery(orgId, {skip: !orgId});
    if (data1){
        customerList = data1.customers.map(e => ({label:e.name, value:e['_id']}));
        console.log(customerList);
    }
    // const customerData = [{label:"Ram", value:"34582"}, {label:"Vinoth", value:23654}];
    return (
        <Spin size="large" spinning={false}>
            <div style={{textAlign:"left", marginLeft:"20px"}}>
                <Title level={3}><FileTextOutlined /> New Invoice</Title>
            </div>
            <Divider/>
            {/* {error && console.log(error)}
            {isError && <div><Text type="danger">Error Creating Customer</Text></div>}
            {isSuccess && <Redirect to="/app/home/customers" />} */}
            <Form
                form={form}
                name="createInvoiceForm"
                onFinish={onSave}
                labelAlign="left"
                labelCol={{span: 4}}
                wrapperCol={{span: 7}}
                colon={false}
                labelWrap={true}
                layout="horizontal"
                scrollToFirstError
                style={{
                    display: "block",
                    marginLeft: "20px",
                    textAlign: "left"
                }}
            >
                <Form.Item label="Customer Name" name="customerName" wrapperCol={{span:9}} required={true}
                    rules={[{required: true, message: "Please Select a Customer"}]}
                >
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
                    />
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default CreateInvoice;
