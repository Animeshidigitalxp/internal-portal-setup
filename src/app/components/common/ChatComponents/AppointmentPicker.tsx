
import dayjs from 'dayjs';

interface AppointmentData {
    appointmentType: string;
    date: string;
    time: string
}

interface AppointmentPickerProps {
    primaryColor?: string;
    msg: AppointmentData;
}





export const AppointmentPicker = (props: AppointmentPickerProps) => {
    const { msg } = props
    const styles = {
        outerWrapper: {
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            padding: '8px 16px',
            fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
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
        } as React.CSSProperties,
        fieldGroup: { marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' } as React.CSSProperties,
        label: { fontSize: '16px', color: '#6B7280', fontWeight: '400' } as React.CSSProperties,

        viewHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px' } as React.CSSProperties,
        viewLabel: { fontSize: '14px', color: '#6B7280', marginBottom: '4px' } as React.CSSProperties,
        viewValue: { fontSize: '16px', color: '#111827', marginBottom: '12px', fontWeight: '400' } as React.CSSProperties,
    };

    return (
        <div style={styles.outerWrapper}>
            <div style={styles.container}>

                <div>
                    <div style={styles.viewHeader}>
                        <span style={{ fontWeight: '600', fontSize: '20px', color: '#111827' }}>Follow-up Details</span>

                    </div>
                    
                    <div style={styles.viewLabel}>Date</div>
                    <div style={styles.viewValue}>{msg?.date ? dayjs(msg?.date).format('DD-MMM-YYYY') : '-'}</div>
                    <div style={styles.viewLabel}>Time</div>
                    <div style={styles.viewValue}>{msg?.time || '-'}</div>
                    <div style={styles.viewLabel}>Preferred Mode of Contact</div>
                    <div style={styles.viewValue}>{msg?.appointmentType ?? '-'}</div>
                    
                </div>

            </div>
        </div>
    );
}
