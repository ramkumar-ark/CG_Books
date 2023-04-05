import { getDbController } from '../../db/accountingDb';

const addBankAccount = async (req, res) => {
    let orgId;
    let ledger;
    try {
        orgId = req.params.orgId;
        const {name, beneficiaryName, accountNumber: accountNo, bankName, ifsc, description} = req.body;
        const defaultDescription = `Ledger used to track transactions in the bank account - ${name}`;
        const dbController = await getDbController(orgId);
        const group = await dbController.primaryGroup.getByName('Bank');
        ledger = await dbController.ledger.create(name, group['_id'], description || defaultDescription);
        const bankDetailsId = await dbController.bankDetails.create({
            beneficiaryName, accountNo, bankName, ifsc, ledger,
        });
        res.json({bankDetailsId});
    } catch (error) {
        console.log(error);
        if (ledger){
            try {
                const dbController = await getDbController(orgId);
                dbController.ledger.delete(ledger);
                if (error.code === 11000)
                    res.status(403).json({error: 'A bank account exists with same name!'});
                else res.status(403).json({error});
            } catch (err) {
                res.status(403).json({err});
            }
        } else {
            if (error.code === 11000)
                res.status(403).json({error: 'A bank account exists with same name!'});
            else res.status(403).json({error});
        }
    }
};

export default addBankAccount;
