export const styles = {
    page: {
      padding: '30px 90px',
      backgroundColor: '#ffffff',
      fontFamily: 'Roboto',
      fontWeight:'normal',
    },
    header: {
      padding:10,
      textAlign: 'center',
      lineHeight: 2,
      marginBottom: 60,
    },
    rowHeader: {
        borderTop: '1px solid #ddd',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: '6px 25px',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: '6px 25px',
    },
    rowLedger: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: '6px 25px 6px 35px',
    },
    rowReportTotal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-end',
        padding: '6px 25px',
        borderBottom: '1px solid #ddd',
    },
    companyName: {
        fontSize: 22,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
    documentName:{
        fontSize: 20,
        fontFamily: 'Roboto',
        fontWeight: 'normal',
    },
    statementPeriod: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: 'normal',
    },
    defaultFont: {
        fontSize: 14,
        fontFamily: 'Roboto',
        fontWeight: 'normal',
    },
    headingFont: {
        fontSize: 14,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
    headerSection1:{
      textAlign:'left',
    },
    headerSection2:{
      textAlign:'right',
      width:'25%',
    },
    documentTitleSection:{
      
    },
    logo: {
      height: 60,
    },
    
    documentNumber:{
      fontSize:14,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
    },
    balanceDue:{
      marginTop:20,
    },
    
    address: {
      fontSize: 12,
      lineHeight: 1.5,
      fontFamily:'Roboto',
      fontWeight: 'normal',
    },
    billDetails:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop:30,
    },
    billFrom:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'end',
      width:'60%',
      textAlign:'left',
    },
    billFromHeading:{
      fontSize: 14,
      fontFamily: 'Roboto',
      fontWeight: 'normal',
      textDecoration:'underline',
    },
    vendorName:{
      fontSize: 12,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      color:'#408dfb',
    },
    vendorAddress:{
      fontSize: 12,
      fontFamily: 'Roboto',
      fontWeight: 'normal',
      lineHeight:1.5,
    },
    otherDetails:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      width:'40%',
      textAlign:'right',
    },
    labelAndValue:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      flexWrap:'nowrap',
      // textAlign:'right',
    },
    label:{
      flexBasis:"50%",
      padding:"5px 10px 5px 0px",
      wordBreak:'normal',
    },
    labelText:{
      fontSize:14,
      fontFamily:'Roboto',
    },
    value:{
      flexBasis:"50%",
      wordBreak:'normal',
      padding:"5px 0px",
      // alignItems:'right',
    },
    valueText:{
      fontSize:14,
      fontFamily:'Roboto',
      fontWeight:'normal',
    },
    divider:{
      borderBottom:'1px solid #ededed',
      margin:'10px -30px'
    },
    itemsTable:{
      marginTop:20,
    },
    
    tableHeader: {
      backgroundColor:'#3c3d3a',
      display:'flex',
      flexDirection: 'row',
      borderBottom: 1,
      borderBottomColor: '#aaaaaa',
    },
    th:{
      fontFamily:'Roboto',
      fontWeight:'bold',
      fontSize:12,
      color:'white',
    },
    tdAlignCenter: {
      textAlign: 'center',
      padding:'5px 0px 5px 5px',
    },
    tdAlignLeft: {
      textAlign: 'left',
      padding:'5px 10px 5px 20px',
    },
    tdAlignRight: {
      textAlign: 'right',
      padding:'5px 10px 5px 5px',
    },
    tr: {
      display:'flex',
      flexDirection: 'row',
      borderBottom: '1px solid #adadad',
      padding:'5px 0px',
    },
    td: {
      fontFamily:'Roboto',
      fontWeight:'normal',
      fontSize:12,
    },
    totalSection:{
      margin:'15px 0px 0px 50px',
      padding:'15px 20px 0px 0px',
      borderTop:'1px solid #eee',
      width:'50%',
      textAlign:'right',
    },
    totalSectionFont:{
      fontFamily:'Roboto',
      fontWeight:'bold',
      fontSize:16,
    },
    totalSectionLabel:{
      padding:'5px 10px 5px 0px',
      flex:1,
    },
    totalSectionValue:{
      padding: '5px 10px 10px 5px',
      width:120,
    },
    authorizedSignature:{
      marginTop:30,
      display:'flex',
      flexDirection:'row',
      justifyContent:'flex-start',
      textAlign:'bottom',
    }
};