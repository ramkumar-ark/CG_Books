import { Typography } from "antd";

const {Text} = Typography;

const VoucherStatus = ({voucherData}) => {
    if (voucherData.status === 'unPaid'){
        const today = Date.now();
        const dueDate = new Date(voucherData.dueDate);
        const diffInDays = Math.floor((today-dueDate)/(1000*60*60*24));
        if (today > dueDate) 
            return <Text style={{color:'#f76831'}}>OVERDUE BY {diffInDays} DAYS</Text>
        else return <Text style={{color:'#408dfb'}}>DUE IN {diffInDays*-1} DAYS</Text>
    }else return <Text style={{color:'green'}}>PAID</Text>
};

export default VoucherStatus;
