import styles from './Breadcrumb.module.sass'
import Link from 'next/link';
type BreadcrumbItem = {
  label: string;
  href?: string;
};

function Breadcrumb({ items,dataTest }: { items: BreadcrumbItem[], dataTest?: string }) {
  return (
    <nav className={styles.breadcrumbBar} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.label} className={styles.breadcrumbItem}>
            {!isLast && item.href ? (
              <Link href={item.href} className={styles.breadcrumbLink}>
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  isLast
                    ? styles.breadcrumbCurrent
                    : styles.breadcrumbText
                }
              >
                {item.label}
              </span>
            )}
            {!isLast && (
              <span className={styles.breadcrumbSeparator}>{"<"}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb