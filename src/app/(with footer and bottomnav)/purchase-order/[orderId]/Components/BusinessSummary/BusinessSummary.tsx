import styles from './BusinessSummary.module.sass';

const fmt = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type Props = {
  qty: number;
  unitPrice: number;
  margin: number;
};

function Row({
  label,
  value,
  bold,
  topBorder,
  teal,
}: {
  label: string;
  value: string;
  bold?: boolean;
  topBorder?: boolean;
  teal?: boolean;
}) {
  return (
    <div className={`${styles.row}${topBorder ? ` ${styles.topBorder}` : ''}`}>
      <span className={`${styles.rowLabel} inter_regular_lightgrey_12px`}>{label}</span>
      <span className={`${styles.rowValue}${bold ? ` ${styles.bold}` : ''}${teal ? ` ${styles.teal}` : ''}`}>
        {value}
      </span>
    </div>
  );
}

export default function BusinessSummary({ qty, unitPrice, margin }: Props) {
  const vendorCost = qty * unitPrice;
  const marginAmount = vendorCost * (margin / 100);
  const clientTotal = vendorCost + marginAmount;

  return (
    <div className={styles.card}>
      <div className={`${styles.heading} inter_regular_black_14px`}>Business Summary</div>
      <Row label="Quantity" value={`${qty} units`} bold />
      <Row label="TD Synnex price" value={`${fmt(unitPrice)} / unit`} />
      <Row label={`Margin (${margin}%)`} value={fmt(marginAmount)} teal />
      <Row label="Client invoice total" value={fmt(clientTotal)} bold topBorder />
    </div>
  );
}