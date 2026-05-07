import styles from './PipelineSteps.module.css'
import type { PipelineStep } from '../../QuoteDetailsClient'

interface PipelineStepsProps {
  steps: PipelineStep[]
}

export default function PipelineSteps({ steps }: PipelineStepsProps) {
  return (
    <div className={styles.container}>
      <p className={styles.heading}>AI Pipeline</p>
      <div className={styles.stepsRow}>
        {steps.map((step, index) => (
          <div key={step.id} className={styles.stepWrapper}>
            <div className={styles.step}>
              <div className={styles.stepTop}>
                <div className={styles.circleRow}>
                  <div className={`${styles.circle} ${step.isActive ? styles.circleActive : ''}`}>
                    {step.id}
                  </div>
                  {index < steps.length - 1 && <div className={styles.line} />}
                </div>
              </div>

              <div className={`${styles.stepCard} ${step.isActive ? styles.stepCardActive : ''}`}>
                <p className={`${styles.stepName} ${step.isActive ? styles.stepNameActive : ''}`}>
                  {step.name}
                </p>
                <p className={styles.stepDetail}>{step.detail}</p>
                <p className={styles.stepMeta}>{step.meta}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
