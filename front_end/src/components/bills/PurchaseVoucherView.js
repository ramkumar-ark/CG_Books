import { styles as docStyles } from "./stylesForVoucherView";
import {pdfDocumentPlugin, viewDocumentPlugin} from "../../utilities/documentPlugins";
import '../../resources/fonts/fonts.css';

export default function PurchaseVoucherView({data, isPdf=false}){
    const {Document, Page, View, Text} = isPdf ? pdfDocumentPlugin : viewDocumentPlugin;
    const styles = isPdf ? pdfDocumentPlugin.StyleSheet.create(docStyles) : docStyles;
    const textGenerator = (text) => {
        if (text) return <Text style={styles.address}>{text}</Text>
    };
    const organizationAddress = data.org.address.principlePlace.find(e => e.type === 'Head Office');
    return (
        <Document >
        <Page size='A4' style={styles.page}>
            <View>
                <View style={styles.header}>
                    <View style={styles.headerSection1}>
                        <View style={styles.address}>
                            <Text style={styles.companyName}>{data.org.name}</Text>
                            {textGenerator(organizationAddress.addressLine1)}
                            {textGenerator(organizationAddress.addressLine2)}
                            {organizationAddress.city && <Text style={styles.address}>{organizationAddress.city}, {organizationAddress.pinCode || ""}</Text>}
                            {organizationAddress.state && <Text style={styles.address}>{organizationAddress.state}</Text>}
                            <Text style={styles.address}>{organizationAddress.country}</Text>
                        </View>
                    </View>
                    <View style={styles.headerSection2}>
                        <View style={styles.documentTitleSection}>
                            <Text style={styles.documentName}>BILL</Text>
                            <Text style={styles.documentNumber}>Bill# {data.transaction.referenceNumber}</Text>
                        </View>
                        <View style={styles.balanceDue}>
                            <Text style={{fontSize:11, fontWeight:'bold', fontFamily:'Roboto'}}>
                                Balance Due
                            </Text>
                            <Text style={{fontSize:16, fontWeight:'bold', fontFamily:'Roboto'}}>
                                ₹{(data?.otherDetails.pendingAmount || 0).toLocaleString('en-IN', {minimumFractionDigits:2})}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.billDetails}>
                    <View style={styles.billFrom}>
                        <View>
                            <Text style={styles.billFromHeading}>Bill From</Text>
                            <Text style={styles.vendorName}>{data.otherDetails.partyName}</Text>
                            <View style={styles.vendorAddress}>
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
                    </View>
                    <View style={styles.otherDetails}>
                        {[
                            {label:'Order Number', value:data.otherDetails.orderNumber || ''},
                            {label:'Bill Date', value:new Date(data.transaction.transactionDate).toLocaleDateString('en-IN', {year:'numeric', day:'2-digit', month:'2-digit'})},
                            {label:'Due Date', value:new Date(data.otherDetails.dueDate).toLocaleDateString('en-IN', {year:'numeric', day:'2-digit', month:'2-digit'}) || ''},
                            {label:'Terms', value:`${data.otherDetails.creditTerms?.value || 0} ${data.otherDetails.creditTerms?.unit} from Bill`}
                        ].map(e => (
                        <View style={styles.labelAndValue}>
                            <View style={styles.label}>
                                <Text style={styles.labelText}>{e.label}</Text>
                            </View>
                            <View style={styles.value}>
                                <Text style={styles.valueText}>{e.value}</Text>
                            </View>
                        </View>))}
                    </View>
                   
                </View>
                <View style={styles.itemsTable}>
                    <View style={styles.tableHeader}>
                        <View style={{...styles.tdAlignCenter, width:'5%'}}>
                            <Text style={styles.th}>#</Text>
                        </View>
                        <View style={{...styles.tdAlignLeft, flex:1}}>
                            <Text style={styles.th}>Item & Description</Text>
                        </View>
                        <View style={{...styles.tdAlignRight, minWidth:'11%'}}>
                            <Text style={styles.th}>Qty</Text>
                        </View>
                        <View style={{...styles.tdAlignRight, minWidth:'11%'}}>
                            <Text style={styles.th}>RATE</Text>
                        </View>
                        <View style={{...styles.tdAlignRight, minWidth:'15%'}}>
                            <Text style={styles.th}>AMOUNT</Text>
                        </View>
                    </View>
                    {data.otherDetails.itemDetails.map((item,index) => (
                    <View style={styles.tr}>
                        <View style={{...styles.tdAlignCenter, width:'5%'}}>
                            <Text style={styles.td}>{index+1}</Text>
                        </View>
                        <View style={{...styles.tdAlignLeft, flex:1}}>
                            <Text style={styles.td}>{item.details}</Text>
                        </View>
                        <View style={{...styles.tdAlignRight, minWidth:'11%'}}>
                            <Text style={styles.td}>
                                {item.quantity.toLocaleString('en-IN', {minimumFractionDigits:2})}
                            </Text>
                        </View>
                        <View style={{...styles.tdAlignRight, minWidth:'11%'}}>
                            <Text style={styles.td}>
                                {item.rate.toLocaleString('en-IN', {minimumFractionDigits:2})}
                            </Text>
                        </View>
                        <View style={{...styles.tdAlignRight, minWidth:'15%'}}>
                            <Text style={styles.td}>
                                {item.amount.toLocaleString('en-IN', {minimumFractionDigits:2})}
                            </Text>
                        </View>
                    </View>
                    ))}
                </View>
                <View style={{marginTop:5, display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                    <View style={styles.totalSection}>
                        {(data.discount !== 0 && data.rounding !== 0) &&
                        <View style={{display:'flex', flexDirection:'row'}}>
                            <View style={styles.totalSectionLabel}>
                                <Text style={styles.totalSectionFont}>Sub Total</Text>
                            </View>
                            <View style={styles.totalSectionValue}>
                                <Text style={styles.totalSectionFont}>{data.otherDetails.itemDetails.reduce((pv,cv) => pv + cv.amount, 0).toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                            </View>
                        </View>}
                        {data.discount !== 0 &&
                        <View style={{display:'flex', flexDirection:'row'}}>
                            <View style={styles.totalSectionLabel}>
                                <Text style={styles.totalSectionFont}>Discount</Text>
                            </View>
                            <View style={styles.totalSectionValue}>
                                <Text style={styles.totalSectionFont}>{(data.discount * -1).toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                            </View>
                        </View>}
                        {data.rounding !== 0 &&
                        <View style={{display:'flex', flexDirection:'row'}}>
                            <View style={styles.totalSectionLabel}>
                                <Text style={styles.totalSectionFont}>Rounding Off</Text>
                            </View>
                            <View style={styles.totalSectionValue}>
                                <Text style={styles.totalSectionFont}>{(data.rounding*-1).toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                            </View>
                        </View>}
                        <View style={{display:'flex', flexDirection:'row'}}>
                            <View style={styles.totalSectionLabel}>
                                <Text style={styles.totalSectionFont}>Total</Text>
                            </View>
                            <View style={styles.totalSectionValue}>
                                <Text style={styles.totalSectionFont}>₹{(data.otherDetails.totalAmount).toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.authorizedSignature}>
                        <Text>Authorized Signature</Text>
                        <View style={{borderBottom:'1px solid #000', width:200}}/>
                </View>
                
            </View>
        </Page>
        </Document>
    );
}