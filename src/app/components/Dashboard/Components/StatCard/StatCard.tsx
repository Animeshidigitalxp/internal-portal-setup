import styles from "./StatCard.module.sass";

type Props = {
  title: string;
  value: number | string;
  percentage: number;
  growth?:boolean
};

export default function StatCard({ title, value, percentage, growth }: Props) {
    const positiveSvg = <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_507_381)">
            <path d="M11 3.5L6.75 7.75L4.25 5.25L1 8.5" stroke="#10B981" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 3.5H11V6.5" stroke="#10B981" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_507_381">
                <rect width="12" height="12" fill="white" />
            </clipPath>
        </defs>
    </svg>

    const negativeSvg = <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_507_399)">
            <path d="M11 8.5L6.75 4.25L4.25 6.75L1 3.5" stroke="#D71A23" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 8.5H11V5.5" stroke="#D71A23" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_507_399">
                <rect width="12" height="12" fill="white" transform="matrix(1 0 0 -1 0 12)" />
            </clipPath>
        </defs>
    </svg>
  return (
    <div className={styles.card}>
      <p className={`${styles.title} inter_regular_gray_16px`}>{title}</p>

      <div className={styles.valueContainer}>
        <h3 className={`${styles.value} inter_regular_black_24px `}>
        {value}
      </h3>

      <span className={` ${percentage > 0 ? "inter_medium_light_green_12px" : "inter_medium_red_12px"} `}>{percentage > 0 ? positiveSvg : negativeSvg} {percentage}%</span>

      </div>

      
    </div>
  );
}