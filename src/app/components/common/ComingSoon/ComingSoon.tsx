import React from 'react'
import style from './page.module.sass'
const ComingSoon = () => {
  return (
    <div className={`comming-soon-container ${style['page-container']}`}>
      <h1 className={`${style["inter_semibold_gray_50px"]}`}>🚧  Coming Soon</h1>
      <p className={`${style["inter_regular_grey_22px"]}`}>We're working on building this feature to serve you better.</p>
      <p className={`${style["inter_regular_grey_22px"]} ${style["margin-top"]}`}>Stay tuned - exciting updates are on the way!</p>
    </div>
  )
}

export default ComingSoon