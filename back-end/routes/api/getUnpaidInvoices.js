import { getDbController } from "../../db/accountingDb";

const getUnpaidInvoices = async (req, res) => {
    try {
        const {orgId} = req.params;
        const dbController = await getDbController(orgId);
        const invoices = await dbController.voucherType.getVouchers('sales', true);
        const unpaidInvoices = [];
        for (const invoice of invoices){
            if (invoice.transaction.otherDetails.status === 'unPaid') unpaidInvoices.push(invoice);
        }
        res.json({unpaidInvoices})
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default getUnpaidInvoices;
