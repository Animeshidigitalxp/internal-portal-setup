import React from "react";
import styles from "./ConversionFunnel.module.sass";

export interface FunnelStage {
  label: string;
  value: number;
  percentage: string;
}

export interface ConversionFunnelProps {
  title?: string;
  stages: FunnelStage[];
}

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M-0.000156403 10.84V4.84H7.99984V0L15.8398 7.84L7.99984 15.68V10.84L-0.000156403 10.84Z" fill="#1275B3"/>
</svg>

);

const formatValue = (value: number): string => {
  return value.toLocaleString("en-US");
};

const ConversionFunnel: React.FC<ConversionFunnelProps> = ({
  title = "Conversion Funnel",
  stages,
}) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>

      <div className={styles.funnel}>
        {stages.map((stage, index) => (
          <React.Fragment key={stage.label}>
            <div className={styles.stage}>
              <span className={styles.stageLabel}>{stage.label}</span>
              <div className={styles.stageBottom}>
                <span className={styles.stageValue}>
                  {formatValue(stage.value)}
                </span>
                <span className={styles.stagePercent}>{stage.percentage}</span>
              </div>
            </div>

            {index < stages.length - 1 && (
              <div className={styles.arrow} aria-hidden="true">
                <ArrowIcon />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ConversionFunnel;