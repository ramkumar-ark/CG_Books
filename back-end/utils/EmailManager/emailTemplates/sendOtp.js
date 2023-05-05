const otpMessage = `
    <body>
        <h1>Reset Your Password</h1>
        <p>Hello [User],</p>
        <p>We have received a request to reset your password. To complete the password reset process, please use the following OTP code:</p>
        <p><strong>[OTP code]</strong></p>
        <p>Please note that this OTP code will expire in 10 minutes. If you did not request this password reset, please ignore this email and your account will remain secure.</p>
        <p>Thank you,</p>
        <p>CG Books</p>
    </body>`;

export default function getOtpMessage(userName, otpCode) {
    return otpMessage.replace('[User]', userName).replace('[OTP code]', otpCode);
}
