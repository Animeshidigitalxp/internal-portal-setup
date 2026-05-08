import Link from 'next/link';
import styles from './OrderDetailHeader.module.sass';

function toVariant(label: string): string {
  return label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function StatusBadge({ label }: { label: string }) {
  return (
    <span className={styles.badge} data-variant={toVariant(label)}>
      {label}
    </span>
  );
}

type Props = {
  customer: string;
  poNumber: string;
  deviceName: string;
  vendor: string;
  orderStatus: string;
  riskStatus: string;
  haloSO: string;
};

export default function OrderDetailHeader({
  customer,
  poNumber,
  deviceName,
  vendor,
  orderStatus,
  riskStatus,
  haloSO,
}: Props) {
  const normalizedPO = poNumber.replace(/\s/g, '');

  return (
    <div>
      <div className={styles.breadcrumb}>
        <Link href="/purchase-order" className={styles.breadcrumbLink}>
          Purchase orders
        </Link>
        <span className={styles.breadcrumbSep}>{'<'}</span>
        <span className={styles.breadcrumbCurrent}>Order details</span>
      </div>

      <div className={styles.headerRow}>
        <div>
          <h1 className="inter_regular_black_17px">{customer}</h1>
          <p className={`inter_regular_grey_14px ${styles.poNumber}`}>
            Purchase Order #{normalizedPO}
          </p>
          <p className={`inter_regular_grey_13px ${styles.deviceInfo}`}>
            {deviceName} · via {vendor}
          </p>
          <div className={styles.badges}>
            <StatusBadge label={orderStatus} />
            {riskStatus.toLowerCase() !== 'delivered' && (
              <StatusBadge label={riskStatus} />
            )}
            <span className={styles.haloTag}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2h8v8H2z" stroke="#9ca3af" strokeWidth="1.2" fill="none" />
                <path d="M8 2V1m0 10V10M2 6h-.5M10.5 6H10" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Halo SO #{haloSO}
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={`inter_bold_Exo_13px ${styles.btnOutline}`}>
            Replace SKU
          </button>
          <button className={`inter_bold_white_Exo_13px ${styles.btnFilled}`}>
            Contact {vendor}
          </button>
        </div>
      </div>
    </div>
  );
}