import { addOrganization } from "../../controllers/organization";
import { getAssociatedOrgs, setDefaultOrg } from "../../controllers/user";
import accountingDb from "../../db/accountingDb";

export default async (req, res) => {
    try {
        const reqBody = req.body;
        const {orgId} = await addOrganization(reqBody);
        const {defaultOrganization} = await getAssociatedOrgs(reqBody.userId);
        defaultOrganization && await setDefaultOrg(reqBody.userId, orgId);
        const db = accountingDb(orgId);
        res.json({orgId})
    } catch (error) {
        console.log(error);
        res.status(403).json(error);
    }
};