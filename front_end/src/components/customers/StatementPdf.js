import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff',
        fontFamily: 'Roboto',
        fontSize:12,
    },
    header:{
        margin: "20px 20px 10px",
        textAlign:'center',
        fontSize:24,
        fontWeight:'bold',
    },
    orgAddress:{
        textAlign:'center',
        marginBottom:15,
    },
    statementDetails:{
        display:'flex',
        flexDirection:'row'
    },
    entityAddress:{
        flexBasis:'50%',
    },
    statementHeading:{
        flexBasis:'50%',
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'flex-end',
        textAlign:'right',
    },
    accountSummary:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        margin:'20px 0',
    },
    accountSummaryRow:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'flex-end',
    },
    accountSummaryLabel:{
        flexBasis:'50%',
        textAlign:'left',
        padding:5
    },
    accountSummaryValue:{
        flexBasis:'50%',
        textAlign:'right',
        padding:5
    },
    tableHeader:{
        display:'flex',
        flexDirection:'row',
        backgroundColor:'#333333',
        fontWeight:'bold',
        color:'white',
    },
    alternateRow1:{
        display:'flex',
        flexDirection:'row',
        backgroundColor:'#ffffff',
        color:'black',
        fontSize:11,
        padding:'10px 0',
    },
    alternateRow2:{
        display:'flex',
        flexDirection:'row',
        backgroundColor:'#f6f5f5',
        color:'black',
        fontSize:11,
        padding:'10px 0',
    },
    balanceDueRow:{
        display: 'flex',
        flexDirection:'row',
        textAlign:'right',
        justifyContent:'flex-end',
    },
    balanceDueContent:{
        flexBasis:'50%',
        display:'flex',
        flexDirection:'row',
    },
    balanceDueLabel:{
        fontWeight:'bold',
        padding:'10px 0',
        flex:1,
    },
    balanceDueValue:{
        padding:'10px 0',
        flex:1,
    }

});

export const Statement = ({entity, organization, period}) => {
    const organizationAddress = organization.address.principlePlace.find(e => e.type === 'Head Office');
    const entityAddress = entity.addresses.find(e => e.type === "billing");
    let invoicedAmount = 0;
    let receivedAmount = 0;
    let openingBalance = entity.ledger.opBalance;
    if (entity.type === 'vendor') openingBalance *= -1; 
    let startIndex = 0;
    let endIndex = 0;
    let isStartIndexFound = false;
    for (const transac of entity.customerTransactions){
        if (!isStartIndexFound && 
                (new Date(transac.date).setHours(0, 0, 0, 0) > new Date(period.startDate).setHours(0, 0, 0, 0))){
            isStartIndexFound = true;
        }
        !isStartIndexFound && startIndex++;
        if (new Date(transac.date).setHours(0, 0, 0, 0) > new Date(period.endDate).setHours(0, 0, 0, 0)){
            break;
        }
        endIndex++;
    }
    if (startIndex > 0) openingBalance = entity.customerTransactions[startIndex-1].runningBalance;
    const changingFactor = (voucherType) => {
        switch (voucherType) {
            case 'receipt':
            case 'payment':
                if (entity.type === 'customer') return -1;
                if (entity.type === 'vendor') return 1;
                break;
            case 'sales':
                return 1;
                break;
            case 'purchase':
                return -1;
                break;
            case 'journal':
                if (entity.type === 'customer') return 1;
                if (entity.type === 'vendor') return -1;
                break;
            default:
                break;
        }
    };
    entity.customerTransactions.slice(startIndex,endIndex).forEach(e => {
        ['receipt', 'payment'].includes(e.voucherType) 
            ? receivedAmount += e.amount * changingFactor(e.voucherType)
            : invoicedAmount += e.amount * changingFactor(e.voucherType);
    });
    
    const textGenerator = (data) => {
        if (data) return <Text>{data}</Text>
      };
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text>{organization.name}</Text>
                </View>
                <View style={styles.orgAddress}>
                    {organizationAddress.addressLine1 && <Text>{organizationAddress.addressLine1}</Text>}
                    {organizationAddress.addressLine2 && <Text>{organizationAddress.addressLine2}</Text>}
                    {organizationAddress.city && <Text>{organizationAddress.city}, {organizationAddress.pinCode || ""}</Text>}
                    {organizationAddress.state && <Text>{organizationAddress.state}</Text>}
                    <Text>{organizationAddress.country}</Text>
                </View>
                <View style={styles.statementDetails}>
                    <View style={styles.entityAddress}>
                        <Text style={{fontWeight:'bold'}}>To</Text>
                        <Text style={{color:'blue', fontWeight:'bold'}}>{entity.name}</Text>
                        {textGenerator(entityAddress?.street1)}
                        {textGenerator(entityAddress?.street2)}
                        {textGenerator(entityAddress?.city)}
                        {entityAddress && textGenerator(`${entityAddress?.state} ${entityAddress?.pincode}`)}
                        {textGenerator(entityAddress?.phone ? `Phone: ${entityAddress?.phone}`: undefined)}
                        {textGenerator(entityAddress?.fax ? `Fax: ${entityAddress.fax}`: undefined)}
            
                    </View>
                    <View style={styles.statementHeading}>
                        <Text style={{fontWeight:'bold', fontSize:18}}>Statement of Accounts</Text>
                        <View style={{borderBottom:'1px solid black', borderTop:'1px solid black', padding:'5px 0', width:'75%'}}>
                            <Text>{period.startDate.toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'})} to {period.endDate.toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'})}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.accountSummary}>
                    <View style={{width:'45%'}}>
                        <View style={{...styles.accountSummaryRow, backgroundColor:'rgb(232, 232, 232)'}}>
                            <Text style={styles.accountSummaryLabel}>Account Summary</Text>
                            <Text style={styles.accountSummaryValue}></Text>
                        </View>
                        <View style={styles.accountSummaryRow}>
                            <Text style={styles.accountSummaryLabel}>Opening Balance</Text>
                            <Text style={styles.accountSummaryValue}>
                                ₹ {openingBalance.toLocaleString('en-IN', {minimumFractionDigits:2})}
                            </Text>
                        </View>
                        <View style={styles.accountSummaryRow}>
                            <Text style={styles.accountSummaryLabel}>Invoiced Amount</Text>
                            <Text style={styles.accountSummaryValue}>
                                ₹ {invoicedAmount.toLocaleString('en-IN', {minimumFractionDigits:2})}
                            </Text>
                        </View>
                        <View style={{...styles.accountSummaryRow, borderBottom:'1px solid black'}}>
                            <Text style={styles.accountSummaryLabel}>Amount Received</Text>
                            <Text style={styles.accountSummaryValue}>
                                ₹ {receivedAmount.toLocaleString('en-IN', {minimumFractionDigits:2})}
                            </Text>
                        </View>
                        <View style={styles.accountSummaryRow}>
                            <Text style={styles.accountSummaryLabel}>Balance Due</Text>
                            <Text style={styles.accountSummaryValue}>
                                ₹ {(openingBalance + invoicedAmount - receivedAmount)
                                    .toLocaleString('en-IN', {minimumFractionDigits:2})}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.tableHeader}>
                    <Text style={{flex:1, padding:5}}>Date</Text>
                    <Text style={{flex:1.2, padding:5}}>Transaction</Text>
                    <Text style={{flex:2, padding:5, textAlign:'center'}}>Details</Text>
                    <Text style={{flex:1, padding:5, textAlign:'right'}}>Amount</Text>
                    <Text style={{flex:1, padding:5, textAlign:'right'}}>Payments</Text>
                    <Text style={{flex:1.3, padding:5, textAlign:'right'}}>Balance</Text>
                </View>
                <View style={styles.alternateRow1}>
                    <Text style={{flex:1, padding:5}}>{period.startDate.toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'})}</Text>
                    <Text style={{flex:1.2, padding:5}}>Opening Balance</Text>
                    <Text style={{flex:2, padding:5, textAlign:'center'}}></Text>
                    <Text style={{flex:1, padding:5, textAlign:'right'}}>{openingBalance.toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                    <Text style={{flex:1, padding:5, textAlign:'right'}}></Text>
                    <Text style={{flex:1.3, padding:5, textAlign:'right'}}>{openingBalance.toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                </View>
                {entity.customerTransactions.slice(startIndex,endIndex).map((e,i)=> (
                    <View style={(i%2)!==0 ? styles.alternateRow1: styles.alternateRow2}>
                        <Text style={{flex:1, padding:5}}>{new Date(e.date).toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'})}</Text>
                        <Text style={{flex:1.2, padding:5}}>{e.voucherType}</Text>
                        <Text style={{flex:2, padding:5, textAlign:'left'}}>
                            {['sales', 'purchase'].includes(e.voucherType)
                            ? `${e.voucherType === 'sales' ? e.voucherNumber : e.referenceNumber} - due on ${new Date(e.dueDate).toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'})}`
                            : `${e.voucherNumber}
                            ${e.offsetAmounts.map(elem => `₹${Number(elem.amount).toLocaleString('en-IN', {minimumFractionDigits:2})} for payment of ${entity.type === 'vendor' ? elem.referenceNumber : elem.voucherNumber}`+'\n')}${e.pendingAmount > 0 ? `₹${Number(e.pendingAmount).toLocaleString('en-IN', {minimumFractionDigits:2})} in excess payment` : ''}`}
                        </Text>
                        <Text style={{flex:1, padding:5, textAlign:'right'}}>
                            {['receipt', 'payment'].includes(e.voucherType) 
                                ? "" 
                                : (e.amount*changingFactor(e.voucherType)).toLocaleString('en-IN', {minimumFractionDigits:2})}
                        </Text>
                        <Text style={{flex:1, padding:5, textAlign:'right'}}>
                            {['receipt', 'payment'].includes(e.voucherType) 
                                ? (e.amount*changingFactor(e.voucherType)).toLocaleString('en-IN', {minimumFractionDigits:2}) 
                                : ""}
                        </Text>
                        <Text style={{flex:1.3, padding:5, textAlign:'right'}}>
                            {(e.runningBalance*(entity.type==='vendor' ? -1 : 1))
                                .toLocaleString('en-IN', {minimumFractionDigits:2})}
                        </Text>
                    </View>
                ))}
                <View style={styles.balanceDueRow}>
                    <View style={styles.balanceDueContent}>
                        <View style={styles.balanceDueLabel}><Text>Balance Due</Text></View>
                        <View style={styles.balanceDueValue}>
                            <Text>
                                ₹{(openingBalance + invoicedAmount - receivedAmount)
                                    .toLocaleString('en-IN', {minimumFractionDigits:2})}
                            </Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};
