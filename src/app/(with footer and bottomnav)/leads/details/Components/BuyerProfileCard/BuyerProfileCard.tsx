import React from "react";
import styles from "./BuyerProfileCard.module.sass";
import { MdOutlineMail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
// ── Types ─────────────────────────────────────────────────────

export interface BuyerProfileField {
  label: string;
  value: string;
}

export interface BuyerProfileCardProps {
  /** Full name */
  name: string;
  email?: string;
  phone?: string;
  /** e.g. "5/5" */
  buyerScore?: string;
  /** e.g. "Analytical" */
  persona?: string;
  /**
   * Grid fields rendered in the 4-column info grid.
   * Pass them in reading order (left-to-right, top-to-bottom).
   */
  fields?: BuyerProfileField[];
  /** Free-text note shown below the grid under "Specifically:" */
  specifically?: string;
  className?: string;
}



// ── Component ─────────────────────────────────────────────────

const BuyerProfileCard: React.FC<BuyerProfileCardProps> = ({
  name,
  email,
  phone,
  buyerScore,
  persona,
  fields = [],
  specifically,
  className,
}) => {
  return (
    <div className={`${styles.card} ${className ?? ""}`}>

      {/* ── Header row ──────────────────────────────────── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={` ${styles.name} inter_regular_oblack_18px`}>{name}</h2>
          <div className={styles.contacts}>
            {email && (
              <span className={styles.contactItem}>
                <MdOutlineMail />
                <span>{email}</span>
              </span>
            )}
            {phone && (
              <span className={styles.contactItem}>
                <LuPhone />
                <span>{phone}</span>
              </span>
            )}
          </div>
        </div>

        {(buyerScore || persona) && (
          <div className={styles.headerRight}>
            {buyerScore && (
              <div className={styles.scorePill}>
                <span className={styles.scoreLabel}>Buyer Score:</span>
                <span className={styles.scoreValue}>{buyerScore}</span>
              </div>
            )}
            {persona && (
              <div className={styles.personaGroup}>
                <span className={styles.personaLabel}>Persona:</span>
                <span className={styles.personaBadge}>{persona}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Divider ─────────────────────────────────────── */}
      {(fields.length > 0 || specifically) && (
        <hr className={styles.divider} />
      )}

      {/* ── Info grid ───────────────────────────────────── */}
      {fields.length > 0 && (
        <dl className={styles.grid}>
          {fields.map((f) => (
            <div key={f.label} className={styles.gridItem}>
              <dt className={` ${styles.fieldLabel} inter_regular_darkgrey_14px`}>{f.label} </dt>
              <dd className={` ${styles.fieldValue}  inter_regular_darkblack_14px`}>{f.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {/* ── Specifically note ────────────────────────────── */}
      {specifically && (
        <div className={styles.specifically}>
          <span className={` ${styles.specificallyLabel} inter_regular_darkgrey_14px`}>Specifically:</span>
          <p className={` ${styles.specificallyText} inter_regular_darkblack_14px`}>{specifically}</p>
        </div>
      )}
    </div>
  );
};

export default BuyerProfileCard;