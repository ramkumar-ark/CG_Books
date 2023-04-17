import { getDbController } from "../../db/accountingDb";

const getUnpaidVouchers = async (req, res) => {
    try {
        const {orgId, primaryVoucherType} = req.params;
        const dbController = await getDbController(orgId);
        const invoices = await dbController.voucherType.getVouchers(primaryVoucherType || 'sales', true);
        const unpaidVouchers = [];
        for (const invoice of invoices){
            if (invoice.transaction.otherDetails.status === 'unPaid') unpaidVouchers.push(invoice);
        }
        res.json({unpaidVouchers});
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default getUnpaidVouchers;