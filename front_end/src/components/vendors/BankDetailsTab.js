import { useState } from "react";
import { Typography, Form } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons"
import BankDetailsSection from "./BankDetailsSection";

const {Text, Link} = Typography;

const BankDetailsTab = ({data}) => {
    const [bankDetailsList, setBankDetailsList] = useState(data || []);
    const deleteBankDetail = (index) => {
        const oldList = [...bankDetailsList];
        oldList.splice(index-1,1);
        setBankDetailsList(oldList);
    };
    const addBankDetail = () => {setBankDetailsList([...bankDetailsList, {}])};

    if (bankDetailsList.length > 0)
        return (
            <div style={{textAlign:'left', marginBottom:20}}>
            {bankDetailsList.map((e, i) => (
                <>
                    {bankDetailsList.length > 1 && 
                        <Form.Item label={`BANK ${i+1}`} labelCol={{span:4}} wrapperCol={{span:16, lg:8}}>
                            {i>0 && <div style={{textAlign:'right', width:'100%'}}>
                            <Link><Text type="secondary" onClick={()=>{deleteBankDetail(i)}}>
                                    <DeleteOutlined/> Delete
                            </Text></Link>
                            </div>}
                        </Form.Item>
                    }
                    <BankDetailsSection key={i + 1} index={i}/>
                </>
            ))}
            <Link onClick={() => {addBankDetail()}}>
                <PlusOutlined/> Add New Bank
            </Link>
            </div>
        );
    
    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center',
            padding:'30px 20px 50px', flexDirection:'column'}}>
            <Text>Add your vendor's bank details and make payments.</Text><br/>
            <Link onClick={() => setBankDetailsList([{}])}><PlusOutlined/> Add Bank Account</Link>
        </div>
    );
};

export default BankDetailsTab;
