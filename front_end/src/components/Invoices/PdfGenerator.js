import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { pdf, Font } from '@react-pdf/renderer';
import Roboto from '../../resources/fonts/Roboto-Regular.ttf';
import RobotoBold from '../../resources/fonts/Roboto-Bold.ttf';
import RobotoBlack from '../../resources/fonts/Roboto-Black.ttf';
import numberToWords from '../../utilities/convertNumToWords';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: Roboto },
    { src: RobotoBold, fontWeight: 'bold' },
    { src: RobotoBlack, fontWeight: 'black' },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    fontFamily: 'Roboto',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:10,
    borderBottom:1,
  },
  logo: {
    height: 60,
  },
  documentName:{
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'black',
  },
  companyName: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  address: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  invoiceDetails: {
    borderBottom:1,
  },
  invDetailsPt1:{
    width: '50%',
    borderRight: 1,
    padding: 5,
  },
  labelAndValue:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    flexWrap:"nowrap",
  },
  label:{
    fontSize:10,
    color:'grey',
    flexBasis:"50%",
  },
  value:{
    fontSize:10,
    fontWeight:'bold',
    flexBasis:"50%",
  },

  billTo: {
    padding: 5,
    fontSize:10,
    lineHeight:1.5,
    display:'flex',
    flexDirection:'column',
    justifyContent: 'space-between'
  },
  billToHeading:{
    borderBottom:1,
    backgroundColor:'#f5f5f5',
    fontSize:10,
    fontWeight:'bold',
    paddingLeft:5,
  },
  partyName:{
    fontSize: 12,
    fontWeight:'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: 1,
    borderBottomColor: '#aaaaaa',
  },
  th: {
    width: '25%',
    fontSize:10,
    fontWeight:'bold',
    textAlign: 'right',
    borderRight:1,
    borderRightColor: '#aaaaaa',
    padding: '0 5px',
  },
  tr: {
    flexDirection: 'row',
    borderBottom: 1,
    borderBottomColor: '#aaaaaa',
  },
  td: {
    width: '25%',
    textAlign: 'right',
    fontSize: 10,
    borderRight:1,
    borderRightColor: '#aaaaaa',
    padding: '5px 5px',
  },
  footer: {
    borderTop:1,
    display: 'flex',
    flexDirection:'row'
  },
  footerPart1: {
    flexBasis:'60%',
    padding:'10px 20px 20px 5px',
    borderRight:1,
    width:'60%',
    fontSize:10,
    lineHeight:1.5,
  },
  footerPart2: {
    flexBasis: '40%',
    display: 'flex',
    flexDirection:'column',
    width:'40%',
    minHeight:'150px',
  },
  
});

export const Invoice = ({ invoice }) => {
  const textGenerator = (data) => {
    if (data) return <Text>{data}</Text>
  };
    const organizationAddress = invoice.org.address.principlePlace.find(e => e.type === 'Head Office');
    return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{border:1}}>
        <View style={styles.header}>
          <View style={styles.address}>
            <Text style={styles.companyName}>{invoice.org.name}</Text>
            {organizationAddress.addressLine1 && <Text>{organizationAddress.addressLine1}</Text>}
            {organizationAddress.addressLine2 && <Text>{organizationAddress.addressLine2}</Text>}
            {organizationAddress.city && <Text>{organizationAddress.city}, {organizationAddress.pinCode || ""}</Text>}
            {organizationAddress.state && <Text>{organizationAddress.state}</Text>}
            <Text>{organizationAddress.country}</Text>
          </View>
          <View style={styles.documentName}>
            <Text>TAX INVOICE</Text>
          </View>
        </View>
        <View style={styles.invoiceDetails}>
          <View style={styles.invDetailsPt1}>
            <View style={styles.labelAndValue}>
              <Text style={styles.label}>Invoice Number</Text>
              <Text style={styles.value}>: {invoice.voucherNumber}</Text>
            </View>
            <View style={styles.labelAndValue}>
              <Text style={styles.label}>Invoice Date</Text>
              <Text style={styles.value}>: {new Date(invoice.transaction.transactionDate).toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'})}</Text>
            </View>
            {invoice.otherDetails.creditTerms?.value && 
            <View style={styles.labelAndValue}>
              <Text style={styles.label}>Terms</Text>
              <Text style={styles.value}>: {invoice.otherDetails.creditTerms.value} {invoice.otherDetails.creditTerms.unit || 'days'} from Invoice</Text>
            </View>}
            {invoice.otherDetails.dueDate && 
            <View style={styles.labelAndValue}>
              <Text style={styles.label}>Due Date</Text>
              <Text style={styles.value}>: {new Date(invoice.otherDetails.dueDate).toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'})}</Text>
            </View>}
            {invoice.otherDetails.orderNumber && 
            <View style={styles.labelAndValue}>
              <Text style={styles.label}>Order No</Text>
              <Text style={styles.value}>: {invoice.otherDetails.orderNumber}</Text>
            </View>}
          </View>
        </View>
        <View style={{display:'flex', flexDirection:'row', borderBottom: 1,}}>
          <View style={{flex:1}}>
            <View style={styles.billToHeading}><Text>Bill To</Text></View>
            <View style={styles.billTo}>
              <Text style={styles.partyName}>{invoice.otherDetails.partyName}</Text>
              {invoice.otherDetails.billingAddress && 
              <>
              {textGenerator(invoice.otherDetails.billingAddress.attention)}
              {textGenerator(invoice.otherDetails.billingAddress.street1)}
              {textGenerator(invoice.otherDetails.billingAddress.street2)}
              {textGenerator(invoice.otherDetails.billingAddress.city)}
              {textGenerator(`${invoice.otherDetails.billingAddress.state} ${invoice.otherDetails.billingAddress.pincode}`)}
              {textGenerator(invoice.otherDetails.billingAddress.phone ? `Phone: ${invoice.otherDetails.billingAddress.phone}`: undefined)}
              {textGenerator(invoice.otherDetails.billingAddress.fax ? `Fax: ${invoice.otherDetails.billingAddress.fax}`: undefined)}
              </>}
            </View>
          </View>
          {invoice.otherDetails.shippingAddress && 
          <View style={{flex:1, borderLeft:1}}>
            <View style={styles.billToHeading}><Text>Ship To</Text></View>
            <View style={styles.billTo}>
              {textGenerator(invoice.otherDetails.shippingAddress.attention)}
              {textGenerator(invoice.otherDetails.shippingAddress.street1)}
              {textGenerator(invoice.otherDetails.shippingAddress.street2)}
              {textGenerator(invoice.otherDetails.shippingAddress.city)}
              {textGenerator(`${invoice.otherDetails.shippingAddress.state || ''} ${invoice.otherDetails.shippingAddress.pincode || ''}`)}
              {textGenerator(invoice.otherDetails.shippingAddress.phone ? `Phone: ${invoice.otherDetails.shippingAddress.phone}`: undefined)}
              {textGenerator(invoice.otherDetails.shippingAddress.fax ? `Fax: ${invoice.otherDetails.shippingAddress.fax}`: undefined)}
            </View>
          </View>
          }
        </View>
        
        <View style={styles.tableHeader}>
          <Text style={{...styles.th, width:30, textAlign:'center'}}>#</Text>
          <Text style={{...styles.th, flex:1, textAlign:'left'}}>Item & Description</Text>
          <Text style={{...styles.th, width:70}}>Qty</Text>
          <Text style={{...styles.th, width:70}}>Rate</Text>
          <Text style={{...styles.th, width:90}}>Amount</Text>
        </View>
        {invoice.otherDetails.itemDetails.map((item, index) => (
          <View style={styles.tr} key={index}>
            <Text style={{...styles.td, width:30, textAlign:'center'}}>{index + 1}</Text>
            <Text style={{...styles.td, flex:1, textAlign:'left'}}>{item.details}</Text>
            <Text style={{...styles.td, width:70}}>{item.quantity.toFixed(2)}</Text>
            <Text style={{...styles.td, width:70}}>{item.rate.toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
            <Text style={{...styles.td, width:90}}>{item.amount.toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
          </View>
        ))}
        <View style={styles.footer}>
          <View style={styles.footerPart1}>
            <View style={{paddingBottom:20}}>
              <Text>Total In Words</Text>
              <Text style={{fontWeight:'bold'}}>{numberToWords(invoice.otherDetails.totalAmount)}</Text>
            </View>
            <View style={{marginBottom:20}}><Text>{invoice.otherDetails.notes || ""}</Text></View>
            {invoice.otherDetails.termsAndConditions && 
            <>
            <View style={{color:'grey'}}><Text>Terms & Conditions</Text></View>
            <View style={{marginBottom:20}}><Text>{invoice.otherDetails.termsAndConditions}</Text></View>
            </>
            }
          </View>
          <View style={styles.footerPart2}>
            <View style={{padding:5, width:'100%', lineHeight:1.5, borderBottom:1, flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <View style={{...styles.labelAndValue}}>
                  <Text style={{flexBasis: '50%', fontSize:10, textAlign:'right'}}>Sub Total</Text>
                  <Text style={{flexBasis:'90px', fontSize:10, textAlign:'right'}}>{Number(invoice.subTotal).toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                </View>
                {invoice.discount && 
                <View style={styles.labelAndValue}>
                  <Text style={{flexBasis: '50%', fontSize:10, textAlign:'right'}}>Discount</Text>
                  <Text style={{flexBasis:'90px', fontSize:10, textAlign:'right'}}>{Number(invoice.discount).toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                </View>}
                <View style={styles.labelAndValue}>
                  <Text style={{flexBasis: '50%', fontSize:10, textAlign:'right'}}>Rounding</Text>
                  <Text style={{flexBasis:'90px', fontSize:10, textAlign:'right'}}>{invoice.rounding?.toLocaleString('en-IN', {minimumFractionDigits:2}) || '0.00'}</Text>
                </View>
                <View style={styles.labelAndValue}>
                  <Text style={{flexBasis: '50%', fontSize:12, textAlign:'right', fontWeight:'bold'}}>Total</Text>
                  <Text style={{flexBasis:'90px', fontSize:12, textAlign:'right', fontWeight:'bold'}}>₹{invoice.otherDetails.totalAmount.toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                </View>
            </View>
            <View style={{display:'flex', flexDirection:'column', justifyContent:'flex-end', fontSize:8, textAlign:'center', flex:1}}>
                <Text>Authorized Signature</Text> 
            </View>   
          </View>
        </View>
        </View>
      </Page>
    </Document>
    );
  };

export const generatePdf = async (invoiceData) => {
  // Create a new PDF document
  const doc = Invoice({ invoice: invoiceData });

  // Generate a blob from the PDF document
  const blob = await pdf(doc).toBlob();

  // Create a URL for the blob
  const url = URL.createObjectURL(blob);

  // Open a new window or tab to display the PDF
  const previewWindow = window.open(url, '_blank');
  
  // Remove the URL object when the window is closed
  previewWindow.addEventListener('beforeunload', () => URL.revokeObjectURL(url));
};
