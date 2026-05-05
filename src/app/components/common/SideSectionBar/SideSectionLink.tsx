"use client"
import Link from 'next/link'
import style from './SideSectionBar.module.sass'
import { setFullPageLoader } from '../../FullPageLoader/reducer/fullPageLoaderSlice'
import { useAppDispatch } from '@/src/lib/hooks'
type SideSectionLinkProps = {
    item: any
}

const SideSectionLink = (props: SideSectionLinkProps) => {
    const { item } = props
    const dispatchRedux = useAppDispatch()
    return (
        <Link
            onClick={() => dispatchRedux(setFullPageLoader(true))}
            href={`/${item.path}`}
            className={`${style['menuItem']} ${item.icon ? '' : style['menuItemWithNoIcon']} ${item.active ? style['active'] : 'inter_regular_dimgray_14px'}`}
        >   {
                item.icon &&
                <div className={`${style['icon-container']} ${item.active ? style['active'] : ''}`}>
                    {item.icon}
                </div>
            }

            <span className=''>{item.label}</span>
        </Link>
    )
}

export default SideSectionLink