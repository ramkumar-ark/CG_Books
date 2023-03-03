import { getDbController } from "../../db/accountingDb";

const getLegerBalance = async (req, res) => {
    try {
        const { ledgerId, orgId} = req.params;
        const dbController = await getDbController(orgId);
        const balance = await dbController.closingBalance.getBalance(ledgerId);
        res.json({balance});
    } catch (error) {
        res.status(403).json({error});
    }
};

export default getLegerBalance;
