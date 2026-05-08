import styles from './DeviceSKU.module.sass';

const fmt = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type Props = {
  deviceName: string;
  sku: string;
  model: string;
  qty: number;
  unitPrice: number;
};

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.cell}>
      <div className={`${styles.cellLabel} inter_regular_lightgrey_12px`}>{label}</div>
      <div className={`${styles.cellValue} inter_regular_black_12px`}>{value}</div>
    </div>
  );
}

export default function DeviceSKU({ deviceName, sku, model, qty, unitPrice }: Props) {
  const total = qty * unitPrice;
  return (
    <div className={styles.card}>
      <div className={`${styles.heading} inter_regular_black_15px`}>Device &amp; SKU</div>
      <div className={`${styles.deviceName} inter_semibold_black_18px`}>{deviceName}</div>
      <div className={`${styles.sku} inter_regular_grey_18px`}>SKU: {sku}</div>
      <div className={styles.grid}>
        <Cell label="Quantity" value={`${qty} Units`} />
        <Cell label="Model" value={model} />
        <Cell label="Unit Price" value={fmt(unitPrice)} />
        <Cell label="Total" value={fmt(total)} />
      </div>
    </div>
  );
}