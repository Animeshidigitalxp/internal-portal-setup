import styles from './page.module.sass';
import CustomerTable from './Components/CustomerTable/CustomerTable';
import TableToolbar from '../purchase-order/Components/TableToolbar/TableToolbar';



function CustomerWrapper() {

  return (
    <div className={styles.dashboard}>
        <h2  className='inter_regular_grey_12px mb-3'>Manage customer profiles and AI preferences</h2>

    
       

        {/* Row 2 — Toolbar */}
        <div className={styles.fullRow}>
          <TableToolbar />
        </div>

        {/* Row 3 — Purchase table (full width) */}
        <div className={styles.fullRow}>
          <CustomerTable />
        </div>

      

      </div>
  )
}

export default CustomerWrapper