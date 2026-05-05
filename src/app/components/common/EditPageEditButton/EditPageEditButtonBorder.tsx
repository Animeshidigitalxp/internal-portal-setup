import React from 'react'
import style from './EditPageEditButton.module.sass'
const EditPageEditButtonBorder: React.FC<{ onClick: () => void, dataTest?: string, Icon:any }> = ({ onClick,dataTest, Icon}) => {
    return (
        <button data-test={dataTest} className={`${style['edit-button']} ${style['pink-border']}`} onClick={() => onClick()} >
            {
                <Icon className={style['edit-icon2']} width={18} height={18} />
            }
        </button>
    )
}

export default EditPageEditButtonBorder