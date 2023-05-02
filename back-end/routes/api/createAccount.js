import { getDbController } from "../../db/accountingDb";

const createAccount = async (req, res) => {
    try {
        const {orgId} = req.params;
        const dbController = await getDbController(orgId);
        const {name, group, description, opBalance} = req.body;
        const ledgerAccount = await dbController.ledger.create(name, group, description, opBalance);
        opBalance && await dbController.closingBalance.update(ledgerAccount, opBalance);
        res.json({ledgerId:ledgerAccount});
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export default createAccount;
