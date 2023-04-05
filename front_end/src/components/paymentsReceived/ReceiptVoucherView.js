import { styles as docStyles } from "./stylesForVoucherView";
import {pdfDocumentPlugin, viewDocumentPlugin} from "../../utilities/documentPlugins";
import '../../resources/fonts/fonts.css';
import numberToWords from "../../utilities/convertNumToWords";
import { Link } from "react-router-dom";

function ReceiptVoucherView({data, isPdf=false}){
    const {Document, Page, View, Text} = isPdf ? pdfDocumentPlugin : viewDocumentPlugin;
    const styles = isPdf ? pdfDocumentPlugin.StyleSheet.create(docStyles) : docStyles;
    const textGenerator = (text) => {
        if (text) return <Text>{text}</Text>
      };
    const organizationAddress = data.org.address.principlePlace.find(e => e.type === 'Head Office');
    return (
        <Document >
        <Page size='A4' style={styles.page}>
            <View style={{border:1}}>
                <View style={styles.header}>
                    <View style={styles.address}>
                        <Text style={styles.companyName}>{data.org.name}</Text>
                        {textGenerator(organizationAddress.addressLine1)}
                        {textGenerator(organizationAddress.addressLine2)}
                        {organizationAddress.city && <Text>{organizationAddress.city}, {organizationAddress.pinCode || ""}</Text>}
                        {organizationAddress.state && <Text>{organizationAddress.state}</Text>}
                        <Text>{organizationAddress.country}</Text>
                    </View>
                </View>
                <View style={styles.documentNameContainer}>
                    <Text style={styles.documentName}>PAYMENT RECEIPT</Text>
                </View>
                <View style={styles.receiptTransactionDetails}>
                    <View style={styles.receiptDetailsColLeft}>
                        <View style={styles.labelAndValue}>
                            <Text style={styles.label}>Payment Date</Text>
                            <Text style={styles.value}>{new Date(data.transaction.transactionDate).toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'})}</Text>
                        </View>
                        <View style={styles.labelAndValue}>
                            <Text style={styles.label}>Reference Number</Text>
                            <Text style={styles.value}>{data.transaction.referenceNumber}</Text>
                        </View>
                        <View style={styles.labelAndValue}>
                            <Text style={styles.label}>Payment Mode</Text>
                            <Text style={styles.value}>{data.otherDetails.receiptMode}</Text>
                        </View>
                        <View style={styles.labelAndValue}>
                            <Text style={styles.label}>Amount Received In Words</Text>
                            <Text style={styles.value}>{numberToWords(data.otherDetails.totalAmount)}</Text>
                        </View>
                    </View>
                    <View style={styles.receiptDetailsColRight}>
                        <View style={styles.amountReceivedContainer}>
                            <Text style={styles.amountReceivedFormat}>Amount {isPdf && "\n"} Received</Text>
                            {isPdf && <Text>{"\n"}</Text>}
                            <Text style={styles.amountReceivedFormat}>₹{Number(data.otherDetails.totalAmount).toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.billTo}>
                        <View>
                            <Text style={styles.billToHeading}>Bill To</Text>
                            <Text style={styles.partyName}>{data.otherDetails?.partyName}</Text>
                            <View style={{textAlign:'left', fontFamily:'Roboto', fontSize:'10px'}}>
                            {data.otherDetails?.billingAddress && 
                            <>
                            {textGenerator(data.otherDetails?.billingAddress.attention)}
                            {textGenerator(data.otherDetails?.billingAddress.street1)}
                            {textGenerator(data.otherDetails?.billingAddress.street2)}
                            {textGenerator(data.otherDetails?.billingAddress.city)}
                            {textGenerator(`${data.otherDetails?.billingAddress.state} ${data.otherDetails.billingAddress.pincode}`)}
                            {textGenerator(data.otherDetails?.billingAddress.phone ? `Phone: ${data.otherDetails.billingAddress.phone}`: undefined)}
                            {textGenerator(data.otherDetails?.billingAddress.fax ? `Fax: ${data.otherDetails.billingAddress.fax}`: undefined)}
                            </>}
                            </View>
                        </View>
                        <View style={{textAlign:'right', marginLeft:30}}>
                            <Text style={{...styles.billToHeading, textAlign:'right'}}>Authorized Signature</Text>
                            <View style={{width:200, marginTop:50, borderBottom:'1px solid #ededed'}}/>
                        </View>
                </View>
                {!isPdf && <View style={styles.divider}/>}
                {data.otherDetails.pendingAmount > 0 &&
                <View style={styles.overPayment}>
                    <Text style={{fontFamily:'Roboto',fontWeight:'bold', fontSize:12, color:'#777777'}}>Over payment</Text>
                    <Text>₹{Number(data.otherDetails.pendingAmount).toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                </View>
                }
                <View style={styles.receiptBreakup}>
                    <Text style={{fontFamily:'Roboto', fontWeight:'black', fontSize:16}}>Payment for</Text>
                    <View style={styles.tableHeader}>
                      <Text style={styles.th}>Invoice Number</Text>
                      <Text style={styles.th}>Invoice Date</Text>
                      <Text style={styles.th}>Invoice Amount</Text>
                      <Text style={styles.th}>Payment Amount</Text>
                    </View>
                    {data.otherDetails.offSetTransactions.map( elem =>(
                        <View style={styles.tr}>
                            {(isPdf || elem.voucherNumber == 'Opening Balance') 
                                ? <Text style={styles.td}>{elem.voucherNumber}</Text>
                                :<Link to={`/app/home/invoices/view/${elem.transaction}`} style={styles.td}>
                                    {elem.voucherNumber}</Link>}
                            <Text style={styles.td}>{new Date(elem.voucherDate || data.org.createdOn).toLocaleDateString('en-IN', {month:'2-digit', day:'2-digit', year:'numeric'})}</Text>
                            <Text style={styles.td}>{Number(elem.voucherAmount).toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                            <Text style={styles.td}>{Number(elem.amount).toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                        </View>
                    )
                    )}
                </View>

            </View>
        </Page>
        </Document>
    );
}

export default ReceiptVoucherView;
