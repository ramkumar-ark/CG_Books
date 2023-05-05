import nodemailer from 'nodemailer';
import getOtpMessage from './emailTemplates/sendOtp';
import getPasswordChangeMessage from './emailTemplates/passwordChangeNotification';

export class EmailManager  {
    constructor(serviceProvider, email, password) {
        this.emailId = email;
        this.password = password;
        this.service = serviceProvider;
        this.transport = this.createTransport();
        this.message = '';
        this.subject = '';
    }

    createTransport() {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:this.emailId,
                pass:this.password,
            },
        });
        return transport;
    }

    sendMail(receipientEmail) {
        const message = {
            from: this.emailId,
            to: receipientEmail,
            subject: this.subject,
            html: this.message,
        };
        this.transport.sendMail(message, (error, info) => {
            if (error) {
                console.log(error);
                return Promise.reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                return Promise.resolve(info.response);
            }
        });
    }

    sendOtpMessage(userName, userMail, otp) {
        this.subject = 'OTP for Reseting Password'
        this.message = getOtpMessage(userName, otp);
        return this.sendMail(userMail)
    }

    sendPasswordChangeNotification(userName, userMail) {
        this.subject = 'Password Change Notification';
        this.message = getPasswordChangeMessage(userName);
        return new Promise((resolve, reject) => {
            this.sendMail(userMail).then(result => {return resolve(result)}).catch(reason => {return reject(reason)});
        });
    }

}


const EMAILID = process.env.emailId;
const PASSWORD = process.env.emailPassword;
const SERVICE_PROVIDER = process.env.emailServiceProvider;
export const emailManager = new EmailManager(SERVICE_PROVIDER, EMAILID, PASSWORD);
