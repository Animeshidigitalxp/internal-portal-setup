import styles from './AlertBanner.module.sass';

type Props = {
  message: string;
  subText?: string;
  type: 'warning' | 'error';
};

export default function AlertBanner({ message, subText, type }: Props) {
  return (
    <div className={styles.banner} data-type={type}>
      <svg
        className={styles.icon}
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <circle className={styles.iconCircle} cx="9" cy="9" r="9" />
        <rect x="8.2" y="4.5" width="1.6" height="5.5" rx="0.8" fill="white" />
        <circle cx="9" cy="13" r="1" fill="white" />
      </svg>
      <div>
        <div className={styles.message}>{message}</div>
        {subText && <div className={styles.subText}>{subText}</div>}
      </div>
    </div>
  );
}