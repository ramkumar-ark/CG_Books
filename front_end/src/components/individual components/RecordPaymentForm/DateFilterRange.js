import { Button, DatePicker, Typography, Space } from "antd";
import { useState } from "react";

const { RangePicker } = DatePicker;

const DateFilterRange = ({applyFilter, onClose, onClear}) => {
    const [period, setPeriod] = useState();
    const onSubmit = () => {
        period && applyFilter(period);
        onClose();
    };
    const onClearSelection = () => {
        setPeriod(null);
        onClear();
        onClose();
    };
    return (
        <div style={{padding:10}}>
            <RangePicker 
                onChange={(dates)=>{setPeriod(dates)}} value={period} format="DD-MM-YYYY"            
            />
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:30}}>
                <Space size='middle'>
                    <Button type="primary" onClick={onSubmit}>Apply Filter</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </Space>
                <Typography.Link onClick={onClearSelection}>Clear Selection</Typography.Link>
            </div>
        </div>
    );
};

export default DateFilterRange;
