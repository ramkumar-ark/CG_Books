import { verifyEmail, storeOtp, verifyOtp as checkOtp, updatePassword } from "../../controllers/user";
import { emailManager } from "../../utils/EmailManager/EmailManager";

export const validateUser = async (req, res, next) => {
    try {
        const {email} = req.body;
        const userName = await verifyEmail(email);
        if (userName) {
            req.userName = userName;
            next();
        }
        else res.json({result:'failed'});
    } catch (error) {
        res.status(500).json(error);
    }
};

export const sendOtp = async (req, res) => {
    try {
        const {email} = req.body;
        const otp = generateOtp();
        await emailManager.sendOtpMessage(req.userName, email, otp);
        const resetToken = generateResetToken();
        await storeOtp(email, otp, resetToken);
        res.json({resetToken, result:'success', email});
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const {email, otp, resetToken} = req.body;
        const newResetToken = generateResetToken();
        const result = await checkOtp(email, otp, resetToken, newResetToken);
        switch (result) {
            case 'OTP Verified':
                res.json({result:'verified', newResetToken});
                break;
            case 'OTP Expired':
                res.json({result: 'expired'});
            case 'Incorrect OTP':
                res.json({result: 'incorrect'});
                break;
            default:
                break;
        };
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

export const resetPassword = async (req, res) => {
    try {
        const {email, password, requestToken} = req.body;
        const userName = await updatePassword(email, password, requestToken);
        await emailManager.sendPasswordChangeNotification(userName, email);
        res.json({message:'success'});
    } catch (error) {
        res.staus(403).json({error});
    }
};

function generateOtp() {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}

function generateResetToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let resetToken = '';
    for (let i = 0; i < 16; i++) {
      resetToken += characters[Math.floor(Math.random() * characters.length)];
    }
    return resetToken;
}
