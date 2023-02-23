import { Form, Input, InputNumber, Select } from "antd";

const selectAfter = (
    <Form.Item name={["creditPeriod", "unit"]} style={{marginBottom:0}}>
        <Select
        style={{
            width: 90,
        }}
        options={[
            {label:"Days", value:"days"},
            {label:"Months", value:"months"},
            {label:"Years", value:"years"},
        ]}
        />
    </Form.Item>
  );

const OtherDetailsTab = () => {
    return (
        <>
        <Form.Item label="PAN" name="pan">
            <Input/>
        </Form.Item>
        <Form.Item label="Opening Balance" name="openingBalance">
            <InputNumber addonBefore={"₹"} style={{width:"100%"}}/>
        </Form.Item>
        <Form.Item label="Credit Period" name={["creditPeriod", "value"]}>
            <InputNumber addonAfter={selectAfter} style={{width:"100%"}}/>
        </Form.Item>
        </>
    );
};

export default OtherDetailsTab;
