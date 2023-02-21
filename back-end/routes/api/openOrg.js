import initiateAccountingDb from "../../db/accountingDb";


export default async function openOrg(req, res) {
    try {
        const orgId = req.params.orgId;
        await initiateAccountingDb(orgId, false)
        res.json({message:"Success"})
    } catch (error) {
        res.status(403).json({error});
    }
}