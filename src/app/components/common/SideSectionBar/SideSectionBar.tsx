
import style from './SideSectionBar.module.sass'
import SideSectionLink from './SideSectionLink'
import React from 'react'

interface SideSectionBarProps {
    title: string
    menuItems: {
        path: string
        label: string
        active?: boolean
        icon: React.ReactNode
    }[]
}
const SideSectionBar = (props: SideSectionBarProps) => {
    const { title, menuItems } = props;
    
  return (
    <div className={`${style['sideSection']} sideSectionBar`}>
      <div className={style['title-text']}>
        <h2 className='inter_500_shark_20px'>{title}</h2>
      </div>
      <nav className={style['menuList']}>
        {menuItems.map((item) => (
          <React.Fragment key={item.path}>
            <SideSectionLink
            item={item}
            
          />
          </React.Fragment>
        ))}
      </nav>
    </div>
  )
}

export default SideSectionBar