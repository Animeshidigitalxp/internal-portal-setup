"use client"
import React,{useRef } from 'react';
import { BottomSheet as SwipeableBottomSheet , type BottomSheetRef,} from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css'

interface BottomSheetProps {
  readonly isOpen: boolean;
  readonly onChange: () => void;
  readonly children: React.ReactNode;
}

export default function BottomSheet({ isOpen, onChange, children}: BottomSheetProps){

	const sheetRef = useRef<BottomSheetRef>(null)



	return (

    
    <SwipeableBottomSheet
        open={isOpen}
        onDismiss={onChange}
        ref={sheetRef as any}
        {...({} as any)}
        scrollLocking={false}
        //initialFocusRef={sheetRef as React.RefObject<HTMLElement>}
        // snapPoints={({ minHeight }) => minHeight}
    >
        {children}
    </SwipeableBottomSheet>
	)
};


