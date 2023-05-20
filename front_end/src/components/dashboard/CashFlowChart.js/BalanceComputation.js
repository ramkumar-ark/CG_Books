import { Typography } from "antd";

const { Text } = Typography;

const DisplayAmountItem = ({label, amount, computationSymbol, labelColor}) => (
    <div style={{display:'flex', flexDirection:'row', marginBottom:20}}>
        <div style={{display:'flex', flexDirection:'column', textAlign:'right', width:'100%'}}>
            <Text style={{fontSize:14, color:labelColor}} type='secondary'>{label}</Text>
            <Text style={{fontSize:20}}>₹{(amount || 0).toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
        </div>
        <div style={{width:20, paddingBottom:4, display:'flex', flexDirection:'column-reverse',
            alignItems:'flex-end'}}>
            {computationSymbol}
        </div>
    </div>
);

const BalanceComputation = ({startDate, endDate, openingBalance, closingBalance, totalDebit, totalCredit}) => {
    return [
            {label:`Cash as on ${startDate?.toLocaleDateString('en-IN', {month:'2-digit', day:'2-digit', year:'numeric'})}`, amount:openingBalance},
            {label:`Incoming`, amount:totalDebit, action:'+', labelColor:'#549d06'},
            {label:`Outgoing`, amount:totalCredit, action:'-', labelColor:'#e54643'},
            {label:`Cash as on ${endDate?.toLocaleDateString('en-IN', {month:'2-digit', day:'2-digit', year:'numeric'})}`, amount:closingBalance, action:'='},
        ].map((e, i) => <DisplayAmountItem label={e.label} amount={e.amount} computationSymbol={e.action} labelColor={e.labelColor} key={i+1}/>);
};

export default BalanceComputation;
