import Table from '@/src/app/components/common/Table/Table'
import { setFullPageLoader } from '@/src/app/components/FullPageLoader/reducer/fullPageLoaderSlice'
import { useAppDispatch } from '@/src/lib/hooks'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import style from '@/src/app/components/common/Table/Table.module.sass'
import NoRecordFound from '@/src/app/components/common/NoRecordFound/NoRecordFound'

function RolesTable(props: any) {
  const { conversData } = props
  const [entitiesData, setEntitiesData] = useState<any>(conversData?.length > 0 ? conversData : [null])
  const [showLoad, setShowLoad] = useState(false)
  const [scrollCalledFunc, setScrollCalledFunc] = useState(false);

  const dispatchRedux = useAppDispatch()
  const router = useRouter()

  const handleRedirect = () => {
    //   router.push(`/conversations/details/1`)
    //   dispatchRedux(setFullPageLoader(true))
  }
  return (
    <div>
      <Table columnHeading={['Role', 'No. of users', 'Description']}>
        {showLoad ?
          <tbody>
            <tr>
              <td colSpan={8} className='border-bottom-0'>
                <p className={`d-flex align-items-center justify-content-center mt-5 p-5`}><ClipLoader size={35} color='#000' /> </p>
              </td>
            </tr>
          </tbody>
          :
          entitiesData?.length > 0 &&
          entitiesData?.[0] !== null &&
          <tbody className={`${style['table_body']} inter_regular_gray2_14px`}>
            {entitiesData?.map((item: any, index: number) => {
              return (
                <tr data-test={'Supplier-table'} key={`${item?.Type ?? 'Type'}-${index}`} onClick={() => handleRedirect()}>
                  <td>{item?.role ?? '-'}</td>
                  <td>{item?.noOfUsers ?? '-'}</td>
                  <td>{item?.Description ?? '-'}</td>

                </tr>
              )
            })}

          </tbody>


        }

        {entitiesData?.[0] === null &&
          <NoRecordFound />
        }

        {
          entitiesData.length > 0 &&
          scrollCalledFunc &&
          <tbody>
            <tr>
              <td colSpan={8} className='border-bottom-0'>
                <p className={`d-flex align-items-center justify-content-center mt-5 p-5`}><ClipLoader size={35} color='#000' /> </p>
              </td>
            </tr>
          </tbody>
        }
      </Table>
    </div>
  )
}

export default RolesTable