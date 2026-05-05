


interface LeadData {
  name: string;
  email: string;
  phone: string;
}

interface LeadFormInlineProps {
  primaryColor?: string;
  leadData:LeadData
  // onSendConatactInfo: (obj: any) => void;
}

const LeadFormInline = (props: LeadFormInlineProps) => {
  const {primaryColor,leadData} = props
  

  

  // --- Shared Styles ---
  const styles = {
    outerWrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      padding: '0 16px',
      fontFamily: '"Inter", system-ui, sans-serif',
    } as React.CSSProperties,
    container: {
      maxWidth: '340px',
      width: '90%',
      backgroundColor: '#ffffff',
      borderRadius: '20px 20px 20px 20px',
      border: '1px solid #e5e7eb',
      borderRight: `4px solid rgb(24, 89, 207)`,
      padding: '16px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
      marginBottom: '16px',
    } as React.CSSProperties,
    // Form Styles
    

    // View Mode Styles
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px' } as React.CSSProperties,
    viewLabel: { fontSize: '12px', color: '#5B5B5B', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' } as React.CSSProperties,
    viewValue: { fontSize: '16px', color: '#2D2D2D', marginBottom: '12px' } as React.CSSProperties,
    editIcon: { cursor: 'pointer', color: primaryColor, background: 'none', border: 'none', padding: 0 } as React.CSSProperties,
  };

  return (
    <div style={styles.outerWrapper} className={'widget-message-tile'}>
      <div style={styles.container}>
        
        
          <div>
            <div style={styles.header}>
              <span style={{ fontWeight: '600', fontSize: '18px', color: '#111827' }}>Contact Details</span>
              
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={styles.viewLabel}>Name</label>
              <div style={styles.viewValue}>{leadData?.name ?? '-'}</div>

              <label style={styles.viewLabel}>Email</label>
              <div style={styles.viewValue}>{leadData?.email ?? '-'}</div>

              <label style={styles.viewLabel}>Phone</label>
              <div style={styles.viewValue}>{leadData?.phone ?? '-'}</div>
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default LeadFormInline

