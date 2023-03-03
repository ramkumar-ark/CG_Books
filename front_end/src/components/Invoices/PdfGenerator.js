import React from 'react';
import { PDFViewer, Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  logo: {
    height: 60,
  },
  address: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  billTo: {
    marginTop: 30,
    paddingBottom: 10,
    borderBottom: 1,
    borderBottomColor: '#aaaaaa',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: 1,
    borderBottomColor: '#aaaaaa',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 30,
  },
  th: {
    width: '25%',
    textAlign: 'left',
  },
  tr: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottom: 1,
    borderBottomColor: '#aaaaaa',
  },
  td: {
    width: '25%',
    textAlign: 'left',
  },
  footer: {
    marginTop: 30,
    textAlign: 'right',
    fontSize: 12,
  },
});

const Invoice = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src="https://i.imgur.com/dopJFnM.png" />
        <View style={styles.address}>
          <Text>ABC Corporation</Text>
          <Text>123 Main Street</Text>
          <Text>Anytown, USA 12345</Text>
          <Text>Phone: 555-555-5555</Text>
        </View>
      </View>
      <View style={styles.billTo}>
        <Text>Bill To:</Text>
        <Text>{invoice.customer.name}</Text>
        <Text>{invoice.customer.address}</Text>
        <Text>{invoice.customer.city}, {invoice.customer.state} {invoice.customer.zip}</Text>
        <Text>{invoice.customer.phone}</Text>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.th}>Item Details</Text>
        <Text style={styles.th}>Quantity</Text>
        <Text style={styles.th}>Rate</Text>
        <Text style={styles.th}>Amount</Text>
      </View>
      {invoice.items.map((item, index) => (
        <View style={styles.tr} key={index}>
          <Text style={styles.td}>{item.itemDetails}</Text>
          <Text style={styles.td}>{item.itemQuantity}</Text>
          <Text style={styles.td}>${item.itemRate.toFixed(2)}</Text>
          <Text style={styles.td}>${item.itemAmount}</Text>
        </View>
      ))}
      <View style={styles.footer}>
        <Text>Subtotal: ${invoice.subtotal.toFixed(2)}</Text>
        {invoice.discount ? (
          <>
            <Text>Discount: {invoice.discount.value}%</Text>
            <Text>Discount Amount: -${invoice.discount.amount.toFixed(2)}</Text>
          </>
        ) : null}
        <Text>Total: ${invoice.total.toFixed(2)}</Text>
      </View>
    </Page>
  </Document>
);

export const generatePdf = async (invoiceData) => {
  // Create a new PDF document
  const doc = Invoice({invoice: invoiceData});

  // Generate a blob from the PDF document
  const blob = await pdf(doc).toBlob();

  // Create a download URL for the blob
  const url = URL.createObjectURL(blob);

  // Trigger a download of the PDF file
  const link = document.createElement("a");
  link.href = url;
  link.download = "invoice.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};