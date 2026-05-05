'use client'


import  { useState } from 'react'
import style from './style.module.sass'

import { IoEye, IoEyeOff } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import Styles from '@/src/app/components/common/Modal/Modal.module.sass'
import config from '../../../../../config.json'
import LabelAndValue from '@/src/app/components/common/LabelAndValue/LabelAndValue';
import PinkButton from '@/src/app/components/common/PinkButton/PinkButton';

interface RetrieveDataProps {
    
    email: string
    password: string
    setPassword: any
    from?: any
    fromRequest?: any
}

const RetrievePassword = (props: RetrieveDataProps) => {

    const { email, password,setPassword, from, fromRequest } = props;
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const [showLoad, setShowLoad] = useState(false)
    const [copyLabel, setCopyLabel] = useState('');
    const [copyLabel2, setCopyLabel2] = useState('');
    const copybtn = (text: string) => {

		//a const copyText = document.getElementById('pwd_spn');
		// if (copyText && copyText instanceof HTMLInputElement) {
		// 	copyText.select();
		// }
		// document.execCommand('Copy');


        if (text && text !== null) {
            navigator.clipboard.writeText(text)
                .then(() => console.log('Copied:', text))
                .catch((err) => console.error('Copy failed:', err));
        }

		text.includes('https') ? setCopyLabel('Copied') : setCopyLabel2('Copied');
		setTimeout(() => {
			setCopyLabel('');
			setCopyLabel2('');
		}, 1500);
	};

    const signInURL = config?.domain;
    const username = email;
    const passwordData = password;

    const downloadCSV = () => {
        if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
            
            const csvContent = [
                ['Sign-in URL', 'Username', 'Password'],
                [signInURL, username, passwordData]
            ]
            .map(e => e.map(val => `"${val}"`).join(','))
            .join('\n');
            
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = window.URL.createObjectURL(blob);
            const link = window.document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', 'user_credentials.csv');
            window.document.body.appendChild(link);
            link.click();
            window.document.body.removeChild(link);
        } else {
            console.warn('CSV download attempted in a non-browser environment.');
        }
    };

    const handleReturn =() => {
        setPassword('')
        setShowLoad(true)
        
            router.push(`/user-and-role`)
        
    }

  return (

    <div className='w-100'>
      <div className={`d-flex justify-content-between align-items-center ${Styles['remove-border-cmp']} modal-header pt-4 pb-0 pl-4`}>
        <h2 className='inter_500_shark_18px align-self-end'>Retrieve Password</h2>
        
      </div>

      <hr className='mb-0'/>

      <div className={style['shipping-container-maxheight']}>
        <div className={`invite-section-container p-4 `}>
          <div className=' mb-4'>
            <h2 className='inter_normal_shark_15px mb-4'>Sign-in Details</h2>
            <h4 className='inter_regular_gray_14px mt-4'>*Note: You can view and download the {from ? `${from}’s` : 'user’s'} password below. This is the only time  you can view and download this password.</h4>
            <div>
                <div className='mt-5'>
                    <div className='d-flex'>
                        <LabelAndValue dataTest='signin-url' label={'Sign-in URL'} value={signInURL}  />
                        <span className='cursor-pointer ml-3 mt-1 d-flex'>
                            <FaRegCopy onClick={()=> copybtn(signInURL)}size={16} color='#D0D0D0' />
                                <p className='ml-2 mt-1 inter_regular_hotPink_11px'>{copyLabel}</p>
                        </span>
                    </div>
                    <div className='d-flex'>
                        <LabelAndValue dataTest='username' label={'Username'} value={email}/>
                        <span className='cursor-pointer ml-3 mt-1 d-flex'>
                            <FaRegCopy onClick={()=> copybtn(email)}size={16} color='#D0D0D0' />
                            <p className='ml-2 mt-1 inter_regular_hotPink_11px'>{copyLabel2}</p>
                        </span>
                    </div>
                    <div className='d-flex'>
                        <LabelAndValue dataTest='password' label={'Password'} value={showPassword ? password : '*'.repeat(password.length)} />
                        <button
                            type="button"
                            className={`${style.togglePassword2} bg-transparent border-0 ml-3`}
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                            {showPassword ? <IoEyeOff color='#5F5F5F' size={16} /> : <IoEye color='#5F5F5F' size={16} />}
                        </button>
                    </div>
                </div>
            </div>
          </div>

        </div>

      </div>


      <hr className='mt-0' />

        <div className={`mt-4 mb-4 d-flex justify-content-center align-items-center button-container`}>
            <PinkButton label={'Download .csv file'} whiteButton={true} widthFixed
                onClick={downloadCSV}
            />
            <PinkButton label={`Return to ${from === 'member' ? (fromRequest ? 'request' : 'member') : 'user'} list`}
                onClick={handleReturn}
                showLoad={showLoad}
                widthFixed
            />
        </div>

    </div>

    
  )
}

export default RetrievePassword