import styles from './RecommendedBoats.module.sass';


type BoatsType = {
  image: string,
  model: string
  year: string
  brand: string
}

type RecommendedBoatsProps = {
  boats: BoatsType[]
}

const RecommendedBoats = (props: RecommendedBoatsProps) => {
  const {boats} = props
  return (
    <div className={styles.container}>
      <h3 className={'inter_regular_oblack_18px mb-3'}>Recommended Boats</h3>
      
      <div className={styles.list}>
        {boats?.map((boat: BoatsType, index:number) => (
          <div key={`${boat?.model+index}`} className={styles.boatCard}>
            <div className={styles.imageWrapper}>
              <img src={boat?.image} alt={`${boat?.model}`} />
            </div>
            
            <div className={styles.info}>
              <h4 className={'inter_light_darkblack_18px'}>
                <span className={'inter_bold_darkblack_18px'}>{boat?.year ?? '-'} {boat?.brand ?? ''}</span> {boat?.model ?? ''}
              </h4>
              {/* <p className={'inter_regular_darkgrey_14px font-italic'}>
                Ideal for wake surfing
              </p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedBoats;