
"use client"
import Styles from '../Modal.module.sass'
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import PinkButton from '../../PinkButton/PinkButton';


type CreateProfileErrorPopProps = {
  readonly qerrorMessage: string;
  readonly trigger: () => void;
  readonly pathname: string;
  readonly heading: string;
  readonly showButton?: boolean;
}

function MessageModal(props: CreateProfileErrorPopProps) {

  const { qerrorMessage, pathname, heading,showButton } = props;
  return (
    <div className='w-100'>
      <div className={`d-flex justify-content-between align-items-center ${Styles['remove-border-cmp']} modal-header`}>
        <h2>{""}</h2>
        <h2 className='inter_500_shark_18px align-self-end'>{heading}</h2>
        <button type='button' className={Styles['group-532-aipuc']}
          onClick={() => props.trigger()}
        >
          <RxCross2
            className={Styles['icon-ionic-ios-close-aipuc']}

          />
        </button>
      </div>

      <hr />

      <div>
        <div className={`row ${Styles['create-profile-prof-container']} m-0`}>
          <div className='col-lg-12 '>
            <div className={`${Styles['card']} ${Styles['top-card-cyp']} `}>


              <div className={Styles['content-description-cmp']}>
                <h1
                  className={`inter_regular_shark_16px text-center ${''
                    // window.location.pathname !== path.hoc_ProfilePage
                    // 	? 'prof-padding'
                    // 	: ''
                    }`}>
                  {qerrorMessage}

                </h1>
              </div>
            </div>
          </div>
        </div>


      </div>

      {
        showButton &&
        <>
          <hr className='mt-0' />

          <div className={`${Styles['buttons-div']}`}>
            <Link href={pathname}>
            <PinkButton label={`${pathname.includes("product") ? "Add Product" : "Add Supplier"}`} onClick={() => props.trigger()} />
            </Link>
          </div>
        </>
      }
    </div>
  );
}
export default MessageModal