'use client'
import OtpInput from 'react18-input-otp';
import Styles from './OTPInput.module.sass'

type OTPInputProps = {
	code: string;
	setCode: (code: string) => void;
	otpVerifiedState?: boolean;
	setShowError? : (showError: boolean) => void;
	setShowResetError? : (setShowResetError: string) => void;
	showError? : boolean;
}

function OTPInput(props: OTPInputProps) {

	const {code , setCode, otpVerifiedState,setShowError, setShowResetError, showError} = props;
	const handleChange = (code: string) => {
		if(setShowError) {
			setShowError(false)
			setShowResetError?.('')
		}
		setCode(code);
	};
    return (
		<div>
			
			<OtpInput
				autoComplete="off"
				value={code}
				onChange={handleChange}
				numInputs={6}
				separator={<span className={Styles['seperator-otp']}></span>}
				isInputNum={true}
				shouldAutoFocus={true}
				inputStyle={`${Styles['otp6inputbox']} ${showError ? Styles['otp6inputboxError'] : ''}`}
				focusStyle={{
					border: `1px solid ${showError ? '#D71A23' : 'black'}`,
				}}
				
				isDisabled={otpVerifiedState}
			/>
				
		</div>
	);
}
export default OTPInput