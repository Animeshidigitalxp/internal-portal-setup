import style from './style.module.sass'

interface InsightLabelAndValueProps {
    label: string
    value: string
    dataTest?: string
    maxScore?: number | null; // for score dots
    score?: number | null; // for score dots
    
}
const InsightLabelAndValue = (props: InsightLabelAndValueProps) => {
    const {dataTest, label, value, maxScore, score } = props
    
  return (
    <div className={`d-flex align-items-center w-100 ${style['margin-bottom-12']} ${label === 'Buyer Score' ? style['margin-bottom-10'] : ''} ${label === 'Persona' ? style['margin-bottom-10'] : ''} ${label === 'Specifically' ? style['specifically-value'] : ''}`}>
        
          <span className={`${style['label-text']} inter_regular_darkgrey_14px`}>{`${label}:`}</span>
          
          <span  data-test={dataTest}
            style={{ whiteSpace: 'pre-line' }} className={`${style['label-value']} inter_regular_darkcharcoal_14px  ${label === 'Persona' ? `${style['Persona-value']} inter_regular_greencyanblue_14px`: ''} ml-3`}>
             {maxScore && score !== null && score !== undefined &&
              <div className={style.scoreContainer}>
            <div className={style.dots}>
              {Array.from({ length: maxScore || 0 }).map((_, index) => (
                <span
                  key={index}
                  className={`${style.dot} ${
                    score !== null && score !== undefined && index < score ? style.activeDot : ""
                  }`}
                />
              ))}
              </div>
            </div>}

               {value}
          </span>
    </div>
  )
}

export default InsightLabelAndValue