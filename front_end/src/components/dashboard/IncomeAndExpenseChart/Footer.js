import { Typography } from "antd";

const {Text} = Typography;

const Footer = ({totalIncome, totalExpense}) => {
    return (
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 15px',
            borderTop:'1px solid #ebeaf2'}} >
            <div style={{padding:'5px 15px', display:'flex', flexDirection:'column', textAlign:'left'}}>
                <Text style={{fontSize:14, color:'#549d06'}}>Total Income</Text>
                <Text style={{fontSize:20}}>
                    ₹{(totalIncome || 0).toLocaleString('en-IN', {minimumFractionDigits:2})}
                </Text>
            </div>
            <div style={{padding:'5px 15px', display:'flex', flexDirection:'column', textAlign:'left'}}>
                <Text style={{fontSize:14, color:'#e54643'}}>Total Expense</Text>
                <Text style={{fontSize:20}}>
                    ₹{(totalExpense || 0).toLocaleString('en-IN', {minimumFractionDigits:2})}
                </Text>
            </div>
        </div>
    );
};

export default Footer;
