import { getDbController } from "../../db/accountingDb";

const getAllBalances = async (req, res) => {
    try {
        const orgId = req.params.orgId;
        const dbController = await getDbController(orgId);
        const balances = await dbController.closingBalance.getAllBalances();
        res.json(balances);
    } catch (error) {
        res.status(403).json({error});
    }
};

export default getAllBalances;
