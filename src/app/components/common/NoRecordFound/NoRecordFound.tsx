import React from 'react'
import style from './NoRecordFound.module.sass'
const NoRecordFound = (props: {colspan?: number}) => {
  const { colspan = 8} = props
  return (
    <tbody>
                  <tr>
                    <td colSpan={colspan} className='border-bottom-0'>
                      <div className={`d-flex flex-column align-items-center ${style['no-record-mt']}`}>

                        <div className='d-flex align-items-center'>
                          <hr className={style['line-hr']} /><p className='inter_500_gray_24px ml-4 mr-4'>No records found yet! </p>
                          <hr className={style['line-hr']} />
                        </div>
                        <span className='inter_regular_gray_16px mt-5'>Add your first one to get started.</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
  )
}

export default NoRecordFound