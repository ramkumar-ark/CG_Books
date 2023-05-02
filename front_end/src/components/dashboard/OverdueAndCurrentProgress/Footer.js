import { Typography } from "antd";

const {Text} = Typography;

const Footer = ({current, overdue}) => {
    return (
        <div style={{display:'flex', textAlign:'left', borderTop:'1px solid #ebeaf2'}}>
            <div style={{padding:20, display:'flex', flexDirection:'column', width:'50%', 
                borderRight:'1px solid #ebeaf2'}}>
                <Text style={{fontSize:10, color:'#408DFB'}}>CURRENT</Text>
                <Text style={{fontSize:20}}>₹{current?.toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
            </div>
            <div style={{padding:20, display:'flex', flexDirection:'column', width:'50%'}}>
                <Text style={{fontSize:10, color:'#F76831'}}>OVERDUE</Text>
                <Text style={{fontSize:20}}>₹{overdue?.toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
            </div>
        </div>
    );
};


export default Footer;
