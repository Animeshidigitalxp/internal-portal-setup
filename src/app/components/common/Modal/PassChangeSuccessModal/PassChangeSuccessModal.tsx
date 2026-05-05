
"use client"
import Styles from '../Modal.module.sass'
import { RxCross2 } from "react-icons/rx";
import PinkButton from '../../PinkButton/PinkButton';
import greenTick from '@/src/app/CommonImages/green_Check_Icon.png'
import erroMail from '@/src/app/CommonImages/errorMail.svg'

type CreateProfileErrorPopProps = {
  readonly trigger: () => void;
  readonly fromforgot?: boolean;
  readonly tooManyError?: boolean;
  readonly showLoad?: boolean;
}

function PassChangeSuccessModal(props: CreateProfileErrorPopProps) {

  return (
    <div className='w-100'>
      <div className={`d-flex justify-content-between align-items-center ${Styles['remove-border-cmp']} modal-header`}>
        <h2>{""}</h2>
        <h2 className='inter_500_shark_18px align-self-end'>{""}</h2>
        {!props?.fromforgot ? <button type='button' className={Styles['group-532-aipuc']}
          onClick={() => props.trigger()}
        >
          <RxCross2
            className={Styles['icon-ionic-ios-close-aipuc']}

          />
        </button>
        :
        <div  className={Styles['height-25']}
          
        >
          
        </div>}
      </div>

      

      <div>
        <div className={`row ${Styles['create-profile-prof-container']} m-0`}>
          <div className='col-lg-12 '>
            <div className={`${Styles['card']} ${Styles['top-card-cyp']} `}>


              <div className={`${Styles['content-description-cmp']} h-75`}>
                <div className='d-flex flex-column justify-content-center'>

                    <h2  className={`inter_regular_shark_18px text-center `}>{props?.tooManyError ? 'Code Sent Too Many Times' : 'Your password has been updated successfully.'} </h2>

                    {props?.tooManyError ?
                      <img
                          alt='errormail'
                          src={erroMail.src}
                          className={`${Styles['crossTick-forget-password1']} ml-auto mr-auto mt-4`}>
                      </img>
                      :
                      <img
                          alt='green-tick'
                          src={greenTick.src}
                          className={`${Styles['crossTick-forget-password1']} ml-auto mr-auto mt-4`}>
                      </img>
                    }
                    
                    {props?.tooManyError ?
                      <>
                        <p className='inter_regular_gray_14px text-center mt-4'>You've requested the verification code multiple times.</p>
                        <p className='inter_regular_gray_14px text-center mt-2'>Please wait a few minutes before trying again.</p>
                      </>
                      :
                      <>
                        <p className='inter_regular_gray_14px text-center mt-4'>You're all set.</p>
                        <p className='inter_regular_gray_14px text-center mt-2'>You can now use your new password to log in.</p>
                      </>
                   }
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

      
        <hr className='mt-0' />

        <div className={`${Styles['buttons-div']}`}>
            <PinkButton label={props?.fromforgot ? 'Log in' : 'Ok'} onClick={() => props.trigger()} showLoad={props?.showLoad} />
        </div>
        
    </div>
  );
}

export default PassChangeSuccessModal