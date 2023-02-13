import { Router } from "express";
import signUpUser from "./signUpUser";
import signInUser from "./signInUser";
import verify from "./verify";
import createOrg from "./createOrg";

const router =Router();

router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/verify/secret", verify);
router.post("/createorg", createOrg)

export default router;