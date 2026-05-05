import React from 'react'
import Styles from '../Modal.module.sass'
import PinkButton from '../../PinkButton/PinkButton';

type DiscardModalProps = {
    readonly qerrorMessage: string;
    readonly trigger: () => void;
    readonly trigger2: () => void;
    readonly pathname: string;
    readonly heading: string;
    readonly pinkBtnTitle: string;
    readonly showLoad?: boolean;
    readonly disabled?: boolean;
}

const DiscardModal = (props: DiscardModalProps) => {
    const { qerrorMessage, pathname,heading, pinkBtnTitle, showLoad, disabled } = props;
    console.log(pathname)
    return (
      <div className='w-100'>
        <div className={`d-flex justify-content-center align-items-center ${Styles['remove-border-cmp']} modal-header ${Styles['heading-padding']}`}>
          
          <h2 className='inter_500_shark_18px align-self-end'>{heading}</h2>
        </div>
  
        <hr className='mb-0'/>
  
        <div className='pt-5 pb-5'>
          <div className={`row ${Styles['create-profile-prof-container']} m-0`}>
            <div className='col-lg-12 '>
              <div className={`card ${Styles['top-card-cyp']} h-auto`}>
  
  
                <div className={Styles['content-description-cmp']}>
                  <h1
                    className={`inter_regular_shark_16px text-center `}>
                    {qerrorMessage}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          
          
        </div>

        <hr className='mt-0'/>

        <div className={`${Styles['buttons-div']}`}>
            <PinkButton label={'Stay on Page'} whiteButton={true} onClick={() => props.trigger()} />
            <PinkButton label={pinkBtnTitle} 
            //widthAuto={pinkBtnTitle === 'Discard Changes'}
             onClick={() => props.trigger2()}  showLoad={showLoad} disabled={disabled}/>
        </div>
      </div>
    );
}

export default DiscardModal