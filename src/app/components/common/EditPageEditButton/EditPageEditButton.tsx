import React from 'react'
import { RiPencilFill } from 'react-icons/ri'
import {data} from './svgDatas.js'
import style from './EditPageEditButton.module.sass'
const EditPageEditButton: React.FC<{ onClick: () => void, dataTest?: string, print?: boolean, pinkBorder?: boolean }> = ({ onClick,dataTest, print, pinkBorder}) => {
    return (
        <button data-test={dataTest} className={`${style['edit-button']} ${pinkBorder && style['pink-border']}`} onClick={() => onClick()} >
            {
                print ? 
                data.print :
                <RiPencilFill className={style['edit-icon']} />
            }
        </button>
    )
}

export default EditPageEditButton