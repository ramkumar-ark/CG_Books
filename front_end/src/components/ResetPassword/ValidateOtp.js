import { Alert, Button, Input, Space, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useResendOtpMutation, useVerifyOtpMutation } from "../../service/appApi";

const {Text, Link} = Typography;

const ValidateOtp = ({email, resetToken, onSuccess, onUserChange}) => {
    const [canResend, setCanResend] = useState(false);
    const [counter, setCounter] = useState(60);
    const [attempt, setAttempt] = useState(1);
    const [requestToken, setRequestToken] = useState(resetToken);
    const otpInputRef = useRef(null);
    let intervalId;
    const [resendOtp, {data, isSuccess, isError, isLoading, error}] = useResendOtpMutation();
    const [verifyOtp, {data:verificationData, isSuccess:isComplete, isError:isVerifyError, 
        isLoading:isVerifying, error:verifyError}] = useVerifyOtpMutation();
    const onResendOtp = () => {
        resendOtp(email);
        setCanResend(false);
        setCounter(60);
        intervalId = setInterval(() => {
            setCounter((prev) => prev - 1);
        }, 1000);
        setTimeout(() => {
            setCanResend(true);
            clearInterval(intervalId);
        }, 60000);
        setAttempt(1);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {setCounter((prev) => prev - 1)}, 1000);
        setTimeout(() => {
            setCanResend(true);
            clearInterval(intervalId);
        }, 60000);
        return () => {clearInterval(intervalId)};
    },[]);

    useEffect(() => {
        isSuccess && setRequestToken(data.resetToken);
        isError && console.log(error);
    }, [isSuccess, data?.resetToken, isError, error]);

    useEffect(() => {
        if (isComplete) {
            switch (verificationData.result) {
                case 'verified':
                    onSuccess(verificationData.newResetToken);
                    break;
                case 'expired':
                    setAttempt(4);
                    break;
                case 'incorrect':
                    setAttempt((prev) => prev + 1);
                    break;
                default:
                    break;
            }
        }
        else if (isVerifyError) setAttempt(4);
    }, [isComplete, verificationData?.result, verificationData?.newResetToken, isVerifyError, verifyError, 
        onSuccess]);

    return (
        <>
            <Space style={{border:'1px solid #eeeeee', marginBottom:20, borderRadius:7, padding:10}}>
                <Text>{email}</Text>
                <Link onClick={onUserChange}>Change</Link>
            </Space>
            <br/>
            <Text>Enter the one-time password sent to your email address.</Text>
            {isError && 
                <Alert message='Error occured in sending OTP!' type="error"/>}
            {isVerifyError && 
                <Alert message='Error occured in verification of OTP!' type="error"/>}
            {(attempt > 1 && attempt <=3) && 
                <Alert message={`Incorrect OTP! ${4-attempt} more attempt remaining.`} type="error"/>}
            {(attempt > 3 || isError) ?
            <Button type="primary" size="large" style={{width:'100%', fontWeight:'bold', marginTop:10}}
                 onClick={onResendOtp} loading={isLoading}>Resend OTP</Button> :
            <>
            <Input.Password name="otp"  ref={otpInputRef}
                maxLength={6}
                placeholder="Enter OTP" 
                size="large" 
                style={{margin:'20px 0'}}/>
            <Link onClick={onResendOtp} disabled={!canResend}>Resend OTP {!canResend && `in ${counter} seconds`}</Link>
            <Button type="primary" size="large" style={{width:'100%', fontWeight:'bold', marginTop:10}}
                onClick={() => {verifyOtp({email, otp:otpInputRef.current.input.value, resetToken:requestToken})}} 
                loading={isVerifying}>
                Verify
            </Button>
            </>}
        </>
    );
};

export default ValidateOtp;
