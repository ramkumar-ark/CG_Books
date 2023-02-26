import { Router } from "express";
import signUpUser from "./signUpUser";
import signInUser from "./signInUser";
import verify from "./verify";
import createOrg from "./createOrg";
import getAssociatedOrgs from "./getAssociatedOrgs";
import getOrgData from "./getOrgData";
import protectApi from "../../utils/protectApi";
import testApi from "./testApi";
import getMasters from "./getMasters";
import openOrg from "./openOrg";
import createEntity from "./createEntity";
import getCustomers from "./getCustomers";
import getSelectedOrg from "./getSelectedOrg";
import setSelectedOrg from "./setSelectedOrg";

const router =Router();

router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/verify/secret", verify);
router.post("/createorg", protectApi, createOrg);
router.get("/getselectedorg/:userId", protectApi, getSelectedOrg);
router.patch("/setselectedorg/:userId", protectApi, setSelectedOrg);
router.get("/openorg/:orgId", protectApi, openOrg);
router.get("/getassociatedorgs/:userId",protectApi ,getAssociatedOrgs);
router.get("/getmasters/:orgId", protectApi, getMasters);
router.get("/getorgdata/:orgId", protectApi, getOrgData);
router.post("/createentity", protectApi, createEntity);
router.get("/getcustomers/:orgId", protectApi, getCustomers);
router.get("/testApi", testApi);

export default router;