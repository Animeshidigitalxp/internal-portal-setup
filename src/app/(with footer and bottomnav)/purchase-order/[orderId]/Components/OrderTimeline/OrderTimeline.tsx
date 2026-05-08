import type { TimelineStep } from '../../../data/purchaseOrderData';
import styles from './OrderTimeline.module.sass';

const RED = '#DC2626';
const GRAY = '#d1d5db';

function StepCircle({ status }: { status: TimelineStep['status'] }) {
  if (status === 'done') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="18" fill="#31BA9C"/>
        <path d="M21.5502 27.15L30.0252 18.675C30.2252 18.475 30.4585 18.375 30.7252 18.375C30.9918 18.375 31.2252 18.475 31.4252 18.675C31.6252 18.875 31.7252 19.1127 31.7252 19.388C31.7252 19.6633 31.6252 19.9007 31.4252 20.1L22.2502 29.3C22.0502 29.5 21.8168 29.6 21.5502 29.6C21.2835 29.6 21.0502 29.5 20.8502 29.3L16.5502 25C16.3502 24.8 16.2542 24.5627 16.2622 24.288C16.2702 24.0133 16.3745 23.7757 16.5752 23.575C16.7758 23.3743 17.0135 23.2743 17.2882 23.275C17.5628 23.2757 17.8002 23.3757 18.0002 23.575L21.5502 27.15Z" fill="white"/>
      </svg>
    );
  }
  if (status === 'active') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="17.5" fill="#31BA9C" stroke="white"/>
        <circle cx="24" cy="24" r="6" fill="white"/>
      </svg>
    );
  }
  if (status === 'error') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill={RED} />
        <rect x="21.5" y="11" width="5" height="16" rx="2.5" fill="white" />
        <circle cx="24" cy="34" r="2.5" fill="white" />
      </svg>
    );
  }
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke={GRAY} strokeWidth="2" fill="white" />
    </svg>
  );
}

type Props = {
  steps: TimelineStep[];
  updatedAt: string;
};

export default function OrderTimeline({ steps, updatedAt }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={`${styles.title} inter_regular_black_15px`}>Order Timeline</span>
        <span className={`${styles.updatedAt} inter_regular_grey_12px`}>Updated {updatedAt}</span>
      </div>

      <div className={styles.stepsRow}>
        {steps.map((step, i) => (
          <div key={step.label} className={styles.stepWrapper}>
            <div className={styles.circleRow}>
              <div
                className={styles.line}
                data-active={i > 0 && steps[i - 1].status === 'done' ? 'true' : 'false'}
                data-hidden={i === 0 ? 'true' : 'false'}
              />
              <StepCircle status={step.status} />
              <div
                className={styles.line}
                data-active={step.status === 'done' ? 'true' : 'false'}
                data-hidden={i === steps.length - 1 ? 'true' : 'false'}
              />
            </div>
            <div className={styles.stepInfo} data-status={step.status}>
              <span className={`${styles.label} inter_regular_black_12px`}>{step.label}</span>
              {step.date && <span className={`${styles.date} inter_regular_lightgrey_12px`}>{step.date}</span>}
              {step.subLabel && <span className={`${styles.subLabel} inter_regular_lightgrey_12px`}>{step.subLabel}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
