import { Space, Typography } from "antd";

const {Text} = Typography;

const ReceiptListItem = ({data, isSelected, onClick}) => {
    return (
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'5px 10px', borderBottom:'1px solid lightgrey', textAlign:'left'}}
            className={isSelected ? "selectedDiv" : "selectableDiv"} 
            onClick={() => !isSelected && onClick()}   
        >
            <Space direction="vertical">
                <Text>{data.name}</Text>
                <Text type="secondary">{data.date.toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'})}</Text>
                <Text type="secondary">{data.offsetTransactions.map(e => e.voucherNumber).toString()}</Text>                
            </Space>
            <Space direction="vertical" style={{textAlign:'right'}}>
                <Text>₹{Number(data.amount).toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                <Text>{data.receiptMode}</Text>
                <Text type="secondary">Invoice Payment</Text>             
            </Space>
        </div>
    );
};

export default ReceiptListItem;
