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
import getLegerBalance from "./getLedgerBalance";
import getAllBalances from "./getAllBalances";
import createVoucher from "./createVoucher";
import getVouchers from "./getVouchers";
import getVoucherData from "./getVoucherData";
import deleteVoucherData from "./deleteVoucherEntry";
import updateVoucher from "./updateVoucher";
import getCustomerMonthlyIncome from "./getCustomerMonthlyIncome";
import getCustomerTransactions from "./getCustomerTransactions";

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
router.get("/getcustomermonthlyincome/:orgId/:customerLedgerId", protectApi, getCustomerMonthlyIncome);
router.get("/getcustomertransactions/:orgId/:customerLedgerId", protectApi, getCustomerTransactions);
router.post("/createvoucher", protectApi, createVoucher);
router.get("/getvouchers/:orgId/:voucherName", protectApi, getVouchers);
router.get("/getvoucherdata/:orgId/:voucherName/:transactionId", protectApi, getVoucherData);
router.patch("/updatevoucherdata/:orgId/:transactionId/:otherDetailsId", protectApi, updateVoucher);
router.delete("/deletevoucherentry/:orgId", protectApi, deleteVoucherData);
router.get("/getledgerbalance/:orgId/:ledgerId", protectApi, getLegerBalance);
router.get("/getallbalances/:orgId", protectApi, getAllBalances);
router.get("/testApi", testApi);

export default router;
