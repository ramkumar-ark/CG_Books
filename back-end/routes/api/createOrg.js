import { addOrganization, deleteOrganization } from "../../controllers/organization";
import { getAssociatedOrgs, setDefaultOrg, setLastSelectedOrg } from "../../controllers/user";
import accountingDb from "../../db/accountingDb";

export default async (req, res) => {
    const modified = [];
    try {
        const reqBody = req.body;
        const {orgId} = await addOrganization(reqBody);
        modified.push(async() => await deleteOrganization(orgId));
        await setLastSelectedOrg(reqBody.userId, orgId);
        modified.push(async() => await setLastSelectedOrg(reqBody.userId, null));
        const dbControllers = await accountingDb(orgId, true);
        res.json({message: "success", orgId});
    } catch (error) {
        console.log(error);
        try {
            for (const fn of modified){
                await fn();
            }
            res.status(403).json({error});
        } catch (err) {
            res.status(403).json({err});
        }
        
    }
};