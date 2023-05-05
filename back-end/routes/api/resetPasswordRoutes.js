import { Router } from "express";
import { resetPassword, sendOtp, validateUser, verifyOtp } from "./resetPassword";

const router = Router();

router.post("/validateuser", validateUser, sendOtp);
router.post("/resendotp", validateUser, sendOtp);
router.post("/verifyotp", verifyOtp);
router.post("/changepassword", resetPassword);

export default router;
