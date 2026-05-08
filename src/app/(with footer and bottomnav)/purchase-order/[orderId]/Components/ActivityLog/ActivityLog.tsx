import type { ActivityItem } from '../../../data/purchaseOrderData';
import styles from './ActivityLog.module.sass';

type Props = {
  items: ActivityItem[];
};

export default function ActivityLog({ items }: Props) {
  return (
    <div className={styles.card}>
      <div className={`${styles.heading} inter_regular_black_15px`}>Activity</div>
      <div className={styles.timeline}>
        <div className={styles.verticalLine} />
        <div className={styles.items}>
          {items.map((item, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.dot} data-color={item.color} />
              <div className={styles.content}>
                <div className={styles.contentHeader}>
                  <span className={`${styles.itemTitle} inter_regular_grey_14px`}>{item.title}</span>
                  <span className={`${styles.itemTime} inter_regular_grey_12px`}>{item.time}</span>
                </div>
                <div className={`${styles.itemDesc} inter_regular_grey_12px`}>{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}