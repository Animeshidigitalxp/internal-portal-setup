import React from 'react'
import styles from './Loader.module.sass'

type LoaderProps = {
  readonly type?: 'small' | 'medium' | 'large',
  readonly color?: 'grey' | 'white'
}

export default function Loader({ type = 'medium', color= "grey" }: LoaderProps) {
  return <div className={styles.loader+ ' ' +styles[`loader--${color}--${type}`]}></div>
}
