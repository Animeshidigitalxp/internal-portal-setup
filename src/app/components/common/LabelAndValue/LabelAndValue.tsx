import style from './LabelAndValue.module.sass'

interface LabelAndValueProps {
    label: string
    value: string
    maxWidth?: boolean
    dataTest?: string
    format? :boolean
}
const LabelAndValue = (props: LabelAndValueProps) => {
    const {dataTest, label, value, maxWidth, format } = props
    
  return (
    <div className={`d-flex ${style['margin-bottom-12']}`}>
        <div className={`${format ? 'd-flex flex-column' : ''}`}>
          <span className={`${style['label-text']} inter_regular_gray_14px`}>{`${label}:`}</span>
          
          <span  data-test={dataTest}
            style={{ whiteSpace: 'pre-line' }} className={`${style['label-value']} ${maxWidth ? 'mw-100': ''} ${label?.toLowerCase()?.includes('url') ? style['bluetext'] : ''} ${typeof value === 'string' ?  style[value?.toLowerCase()] : ''} ${typeof value === 'string' && value === 'Waiting for approval' ?  style['waitingforapproval'] : ''} ${typeof value === 'string' && value === 'Partial Payment' ?  style['PartialPayment'] : ''} ${typeof value === 'string' && label === 'Status' ?  style[value?.replaceAll(" ", "")?.toLowerCase()] : ''}  inter_regular_shark_14px ${format ? 'ml-0 mt-1': ""}`}>{value}
          </span>
      </div>
    </div>
  )
}

export default LabelAndValue