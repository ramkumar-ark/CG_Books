const message = `<body>
<p>Dear [Username],</p>
<p>This is to inform you that the password for your account has been changed successfully. If you did not request this change, please contact us immediately.</p>
<p>If you made this change, please ignore this message. Your new password is now active and you can log in to your account using your updated credentials.</p>
<p>Thank you for using our service.</p>
<p>Sincerely,</p>
<p>The CG Books Team</p>
</body>`;

export default function getPasswordChangeMessage(userName) {
    return message.replace('[User]', userName);
}
