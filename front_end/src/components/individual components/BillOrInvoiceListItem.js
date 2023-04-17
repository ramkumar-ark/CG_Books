import { Space, Typography } from "antd";
import VoucherStatus from "./VoucherStatus";

const {Text, Link} = Typography;

const BillOrInvoiceListItem = ({data, isSelected, onClick}) => {
    return (
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'5px 10px', borderBottom:'1px solid lightgrey', textAlign:'left'}}
            className={isSelected ? "selectedDiv" : "selectableDiv"} 
            onClick={() => !isSelected && onClick()}   
        >
            <Space direction="vertical">
                <Text>{data.name}</Text>
                <div>
                    <Link>{data.referenceNumber}</Link> |
                    <Text type="secondary">{data.date.toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'})}</Text>
                </div>
            </Space>
            <Space direction="vertical" style={{textAlign:'right'}}>
                <Text>₹{Number(data.amount).toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                <VoucherStatus voucherData={data}/>             
            </Space>
        </div>
    );
};

export default BillOrInvoiceListItem;
