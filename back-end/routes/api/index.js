import { Router } from "express";
import signUpUser from "./signUpUser";
import signInUser from "./signInUser";
import verify from "./verify";
import createOrg from "./createOrg";
import getAssociatedOrgs from "./getAssociatedOrgs";
import protectApi from "../../utils/protectApi";

const router =Router();

router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/verify/secret", verify);
router.post("/createorg", protectApi, createOrg);
router.get("/getassociatedorgs/:userId",protectApi ,getAssociatedOrgs);

export default router;