import { Form, Input, Select, Typography } from 'antd';
import { DownSquareFilled } from '@ant-design/icons';
import { CountryRegionData } from 'react-country-region-selector';
import { useState } from 'react';

const { Link } = Typography;

const countryOptions = [];
const stateOptions = [];
CountryRegionData.forEach(country => {
    countryOptions.push({label:country[0], value:country[0]});
    const stateOpt = country[2].split("|").map(state => {
        const stateName = state.split('~')[0];
        return {label:stateName, value:stateName};
    });
    stateOptions[country[0]] = stateOpt;
});

const formItemLayout = {
    labelCol: { span:8 },
    wrapperCol: { span:12 },
  };


const AddressSection = ({type, copyFunction}) =>{
    const [country, setCountry] = useState('India');
    return (
        <>
            <Form.Item label={`${type.charAt(0).toUpperCase() + type.slice(1)} Address`} {...formItemLayout}
                style={{justifyContent:"flex-end"}} className="addressSectionName">
                {copyFunction && <Link onClick={copyFunction}><DownSquareFilled/>Copy Billing Address</Link>}
            </Form.Item>
                <Form.Item label="Attention" name={[`${type}Address`,"attention"]} {...formItemLayout}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Country/Region" name={[`${type}Address`,"country"]} {...formItemLayout}>
                    <Select showSearch options={countryOptions} placeholder="Select" 
                        optionFilterProp="children" 
                        filterOption={(input, option) => 
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        onChange={value => setCountry(value)}
                    />
                </Form.Item>
                <Form.Item label="Address" {...formItemLayout}>
                    <Input.Group>
                            <Form.Item name={[`${type}Address`, "street1"]}>
                                <Input.TextArea placeholder='Street 1'/>
                            </Form.Item>
                            <Form.Item name={[`${type}Address`, "street2"]}>
                                <Input.TextArea placeholder='Street 2'/>
                            </Form.Item>
                    </Input.Group>
                </Form.Item>
                <Form.Item label="City" name={[`${type}Address`, "city"]} {...formItemLayout}>
                    <Input/>
                </Form.Item>
                <Form.Item label="State" name={[`${type}Address`, "state"]} {...formItemLayout}>
                    <Select showSearch options={stateOptions[country]} placeholder="Select" optionFilterProp="children" 
                            filterOption={(input, option) => 
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())} />
                </Form.Item>
                <Form.Item label="Zip Code" name={[`${type}Address`, "pincode"]} {...formItemLayout}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Phone" name={[`${type}Address`, "phone"]} {...formItemLayout}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Fax" name={[`${type}Address`, "fax"]} {...formItemLayout}>
                    <Input/>
                </Form.Item>
        </>
    );
};

export default AddressSection;