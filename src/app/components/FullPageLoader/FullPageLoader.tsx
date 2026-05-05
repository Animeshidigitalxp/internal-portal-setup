'use client'
import React from 'react'
import './fullPageLoader.sass'
import { useAppSelector } from '@/src/lib/hooks'  
import { getFullPageLoaderState } from './reducer/fullPageLoaderSlice'
import Loader from './Loader/Loader'
function FullPageLoader() {
  const fullPageLoaderState = useAppSelector(getFullPageLoaderState)
  console.log('fullPageLoaderState:', fullPageLoaderState)
  return (

    <div className='full-page-view'>
      {fullPageLoaderState && (
         <div className='overlay'>
            <Loader type='large' color='grey' />
        </div>
      )}
       
        
    </div>
  )
}

export default FullPageLoader