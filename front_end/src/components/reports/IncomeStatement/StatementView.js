import { pdfDocumentPlugin, viewDocumentPlugin } from "../../../utilities/documentPlugins";
import { styles } from "./StylesForStatement";

const StatementView = ({data, isPdf=false}) => {
    const {Document, Page, View, Text} = isPdf ? pdfDocumentPlugin : viewDocumentPlugin;
    const grossProfit = (data.income?.reduce((pv, e) => pv + e.balance, 0) || 0) - (data.cogs?.reduce((pv, e) => pv + e.balance, 0) || 0);
    const OperatingProfit = grossProfit - (data.expense?.reduce((pv, e) => pv + e.balance, 0) || 0);
    const netProfit = OperatingProfit + (data.otherIncome?.reduce((pv, e) => pv + e.balance, 0) || 0)
        - (data.otherExpense?.reduce((pv, e) => pv + e.balance, 0) || 0);
    const RenderGroup = ({groupTitle, groupLedgers}) => {
        return (
            <>
            <View style={styles.row}>
                <Text style={styles.headingFont}>{groupTitle}</Text>
            </View>
            {groupLedgers?.map(e => 
                <View style={styles.rowLedger}>
                    <Text style={styles.defaultFont}>{e.name}</Text>
                    <Text style={styles.defaultFont}>{e.balance.toLocaleString('en-IN', {minimumFractionDigits: 2})}</Text>
                </View>
            )}
            <View style={{...styles.row}}>
                <Text style={styles.headingFont}>Total for {groupTitle}</Text>
                <Text style={styles.defaultFont}>{(groupLedgers?.reduce((pv, e) => pv + e.balance, 0) || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</Text>
            </View>
            <View style={{borderBottom: '1px solid #ddd'}}/>
            </>
        );
    };
    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <View>
                    <View style={styles.header}>
                        <Text style={{...styles.companyName, lineHeight:2}}>Company Name</Text>
                        <Text style={{...styles.documentName, lineHeight:2}}>Profit and Loss</Text>
                        <Text style={{...styles.statementPeriod, lineHeight:2}}>From 01/04/2023 To 13/06/2023</Text>
                    </View>
                    <View>
                        <View style={styles.rowHeader}>
                            <Text style={styles.defaultFont}>ACCOUNT</Text>
                            <Text style={styles.defaultFont}>TOTAL (Rs)</Text>
                        </View>
                        <RenderGroup groupTitle='Operating Income' groupLedgers={data.income}/>
                        <RenderGroup groupTitle='Cost Of Goods Sold' groupLedgers={data.cogs}/>
                        <View style={styles.rowReportTotal}>
                            <Text style={styles.headingFont}>Gross Profit</Text>
                            <Text style={{...styles.defaultFont, paddingLeft:'20%'}}>
                                {grossProfit.toLocaleString('en-IN', {minimumFractionDigits: 2})}
                            </Text>
                        </View>
                        <RenderGroup groupTitle='Operating Expense' groupLedgers={data.expense}/>
                        <View style={styles.rowReportTotal}>
                            <Text style={styles.headingFont}>Operating Profit</Text>
                            <Text style={{...styles.defaultFont, paddingLeft:'20%'}}>
                                {OperatingProfit.toLocaleString('en-IN', {minimumFractionDigits: 2})}
                            </Text>
                        </View>
                        <RenderGroup groupTitle='Non Operating Income' groupLedgers={data.otherIncome}/>
                        <RenderGroup groupTitle='Non Operating Expense' groupLedgers={data.otherExpense}/>
                        <View style={styles.rowReportTotal}>
                            <Text style={styles.headingFont}>Net Profit/Loss</Text>
                            <Text style={{...styles.defaultFont, paddingLeft:'20%'}}>
                                {netProfit.toLocaleString('en-IN', {minimumFractionDigits: 2})}
                            </Text>
                        </View>
                    </View>
                    

                </View>
            </Page>
        </Document>
    );
};

export default StatementView;
