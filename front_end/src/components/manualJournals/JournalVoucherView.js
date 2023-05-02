import { styles as docStyles } from "./stylesJournalVoucherView";
import {pdfDocumentPlugin, viewDocumentPlugin} from "../../utilities/documentPlugins";
import '../../resources/fonts/fonts.css';

function JournalVoucherView({data, isPdf=false}){
    const {Document, Page, View, Text} = isPdf ? pdfDocumentPlugin : viewDocumentPlugin;
    const styles = isPdf ? pdfDocumentPlugin.StyleSheet.create(docStyles) : docStyles;
    const entriesList = [];
    data.transaction.debits.forEach(e => {entriesList.push({ledger:e.ledger.name, debit:e.amount})});
    data.transaction.credits.forEach(e => {entriesList.push({ledger:e.ledger.name, credit:e.amount})});
    const creditTotal = data.transaction.credits.reduce((pv, e) => pv + e.amount, 0);
    const debitTotal = data.transaction.debits.reduce((pv, e) => pv + e.amount, 0);
    return (
        <Document >
        <Page size='A4' style={styles.page}>
            <View style={{display:'flex', justifyContent:'flex-end', flexDirection:'row'}}>
                <View style={styles.titleContainer}>
                    <Text style={styles.documentTitle}>{data.voucherName}</Text>
                    <Text style={styles.normalText}>#{data.voucherNumber}</Text>
                </View>
            </View>
            <View style={styles.journalDetails}>
                <View style={styles.notes}>
                    <Text style={styles.normalText}>Notes:</Text>
                    <Text style={styles.normalText}>{data.otherDetails.customerNotes}</Text>
                </View>
                <View style={styles.otherDetails}>
                    <View style={styles.labelAndValue}>
                        <View style={styles.label}>
                            <Text style={styles.normalText}>Date:</Text>
                        </View>
                        <View style={styles.value}>
                            <Text style={styles.normalText}>{new Date(data.transaction.transactionDate).toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'})}</Text>
                        </View>
                    </View>
                    <View style={styles.labelAndValue}>
                        <View style={styles.label}>
                            <Text style={styles.normalText}>Amount:</Text>
                        </View>
                        <View style={styles.value}>
                            <Text style={styles.normalText}>₹{data.otherDetails.totalAmount.toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                        </View>
                    </View>
                    <View style={styles.labelAndValue}>
                        <View style={styles.label}>
                            <Text style={styles.normalText}>Reference Number:</Text>
                        </View>
                        <View style={styles.value}>
                            <Text style={styles.normalText}>{data.transaction.referenceNumber}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.entriesTable}>
                <View style={styles.tableHeader}>
                    <View style={{...styles.tdAlignLeft, flex:1}}>
                        <Text style={styles.th}>Account</Text>
                    </View>
                    <View style={{...styles.tdAlignRight, width:'30%'}}>
                        <Text style={styles.th}>Debits</Text>
                    </View>
                    <View style={{...styles.tdAlignRight, width:'30%'}}>
                        <Text style={styles.th}>Credits</Text>
                    </View>
                </View>
                {entriesList.map((item,index) => (
                    <View style={styles.tr}>
                        <View style={{...styles.tdAlignLeft, flex:1}}>
                            <Text style={styles.td}>{item.ledger}</Text>
                        </View>
                        <View style={{...styles.tdAlignRight, width:'30%'}}>
                            <Text style={styles.td}>
                                {(item.debit || "").toLocaleString('en-IN', {minimumFractionDigits:2})}
                            </Text>
                        </View>
                        <View style={{...styles.tdAlignRight, width:'30%'}}>
                            <Text style={styles.td}>
                                {(item.credit || "").toLocaleString('en-IN', {minimumFractionDigits:2})}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
            <View style={{margin:'10px 0px 30px', display:'flex', flexDirection:'column', justifyContent:'flex-end'}}>
                <View style={{padding:'5px 0px', width:'100%', display:'flex', flexDirection:'row'}}>
                    <View style={{padding:'5px 0px', flex:1, textAlign:'right'}}>
                        <Text style={styles.td}>Sub Total</Text>
                    </View>
                    <View style={{padding:'5px 10px',textAlign:'right', width:'30%'}}>
                        <Text style={styles.td}>{debitTotal.toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                    </View>
                    <View style={{padding:'5px 10px',textAlign:'right', width:'30%'}}>
                        <Text style={styles.td}>{creditTotal.toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                    </View>
                </View>
                <View style={{padding:'5px 0px', width:'100%', display:'flex', flexDirection:'row', backgroundColor:'#f5f4f3'}}>
                    <View style={{padding:'5px 0px', flex:1, textAlign:'right'}}>
                        <Text style={styles.total}>Total</Text>
                    </View>
                    <View style={{padding:'5px 10px',textAlign:'right', width:'30%'}}>
                        <Text style={styles.total}>{debitTotal.toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                    </View>
                    <View style={{padding:'5px 10px',textAlign:'right', width:'30%'}}>
                        <Text style={styles.total}>{creditTotal.toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                    </View>
                </View>
            </View>
        </Page>
        </Document>
    );
}

export default JournalVoucherView;
