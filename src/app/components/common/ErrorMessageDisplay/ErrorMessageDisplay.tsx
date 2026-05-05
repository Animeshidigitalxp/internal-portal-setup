import ErrorMessageDisplayStyle from './ErrorMessageDisplay.module.sass'
import { HiOutlineExclamationCircle } from "react-icons/hi";
type ErrorMessageDisplayProps = {
   readonly className: string;
   readonly message: string;
   readonly customsize?: boolean;
}
function ErrorMessageDisplay(props:ErrorMessageDisplayProps) {

    const { className, message, customsize } = props;
    return (
		<span className={`${ErrorMessageDisplayStyle['group-36568-emdc-']} mt-2 ${ErrorMessageDisplayStyle[className] || ''}`}>
			<HiOutlineExclamationCircle className={`${ErrorMessageDisplayStyle['group-36567-emdc-']} ${customsize && ErrorMessageDisplayStyle['icon-size-custom']}`}/>
			<span>
				{' '}
				<span 
					data-test={'error-message-text'}
					className={`${ErrorMessageDisplayStyle['text-1-emdc-']}  inter_regular_red_14px ${customsize && ErrorMessageDisplayStyle['font-size-custom']}`}>
					{message}
				</span>
			</span>
		</span>
	);
}
export default ErrorMessageDisplay