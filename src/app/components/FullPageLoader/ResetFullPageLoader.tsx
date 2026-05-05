'use client'

import './fullPageLoader.sass'
import { useAppDispatch, useAppSelector } from '@/src/lib/hooks'  
import { getFullPageLoaderState, setFullPageLoader } from './reducer/fullPageLoaderSlice'
import Loader from './Loader/Loader'
import { useEffect } from 'react'
function ResetFullPageLoader() {
    const fullPageLoaderState = useAppSelector(getFullPageLoaderState)
    const dispatchRedux = useAppDispatch()
    console.log('fullPageLoaderState:', fullPageLoaderState)
    useEffect(() => { 
        if (fullPageLoaderState) { 
            console.log('Resetting full page loader state is true')
        }
        if(fullPageLoaderState){
            console.log('Resetting full page loader state to false')
            setTimeout(() => {
                dispatchRedux(setFullPageLoader(false))
            }, 500);
            
        }
    }, [fullPageLoaderState])
  return (

   <></>
  )
}

export default ResetFullPageLoader