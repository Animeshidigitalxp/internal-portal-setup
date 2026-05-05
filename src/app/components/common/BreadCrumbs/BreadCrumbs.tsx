"use client"
import React from 'react'
import styles from './BreadCrumb.module.sass'
import Link from 'next/link'
import { useAppDispatch } from '@/src/lib/hooks'
import { setFullPageLoader } from '../../FullPageLoader/reducer/fullPageLoaderSlice'

interface BreadCrumbsProps {
  breadCrumbData?: any
  setEditFalse?: (data: boolean) => void
  handleCloseEdit?: ()=>void
  dataTest?: string
}
const BreadCrumbs = (props: BreadCrumbsProps) => {
  const {dataTest, breadCrumbData, setEditFalse,handleCloseEdit } = props
  
  const dispatchRedux = useAppDispatch()
  const handleClick = () => {
    if(handleCloseEdit){
      handleCloseEdit()
    }
    if(setEditFalse){
      setEditFalse(false)
    }
   
  }

  const showLoader = () => {
    dispatchRedux(setFullPageLoader(true))
  }

  const renderByType = (data: any) => {
    if (data.isLink) {
      return (
        <Link
        onClick={()=>showLoader()}
        data-test={`${dataTest}-${data?.label}`}
          href={data?.path}
          className={` ${data.isActive ? 'inter_regular_gray_14px ' : 'inter_regular_shark_14px cursor-pointer'} ${styles['breadcrumb-name']}`}>
          {data?.label}
        </Link>
      )


    }
    else if (!data.Active) {
      
        return (
          <button
          data-test={`${dataTest}-${data?.label}`}
            onClick={() => handleClick()}
            className={`btn p-0 ${data.isActive ? 'inter_regular_gray_14px ' : 'inter_regular_shark_14px cursor-pointer'} ${styles['breadcrumb-name']}`}>
            {data.label}
          </button>
        )
      
    }
    else{
      return (
        <p 
        data-test={`${dataTest}-${data?.label}`}
        className={` ${data.isActive ? 'inter_regular_gray_14px ' : 'inter_regular_shark_14px cursor-pointer'} ${styles['breadcrumb-name']}`}>
          {data.label}
        </p>
      )
    }
  }
  return (
    <div className={styles['breadcrumbs-container']}>

      {
        breadCrumbData?.map((data: any, index: number) => (
          <React.Fragment key={`${data.label}${index}`}>
            {

              renderByType(data)

            }

            {
              breadCrumbData?.length - 1 !== index &&
              <p className='inter_regular_gray_14px'>{' < '}</p>
            }
          </React.Fragment>
        ))
      }
    </div>
  )
}

export default BreadCrumbs