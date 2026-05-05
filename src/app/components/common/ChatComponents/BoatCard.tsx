import GradientDivider from './GradientDivider';

interface BoatData {
  // features: string[];
  year: string;
  brand: string;
  model: string;
  startingPrice: string;
  askingPrice: string;
  savings: string;
  image: string; // Add a real image URL
}

const BoatCard = (props: BoatData) => {
  const { year,
    brand: manufacturer,
    model,
    startingPrice: msrp,
    askingPrice,
    savings,
    image } = props
  // --- Inline Styles (Specific to the new Card UI) ---
  const styles = {
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '24px', // generous rounding per image
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)', // subtle shadow
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    } as React.CSSProperties,
    imageHeader: {
      position: 'relative',
      width: '100%',
      // Using padding-top for a fixed aspect ratio (e.g., 16:9)
      paddingTop: '150px',
      height: '150px'
    } as React.CSSProperties,
    boatImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover', // ensure image fills the space cleanly
    } as React.CSSProperties,
    floatingIcon: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      backgroundColor: '#fff',
      border: 'none',
      width: '30px',
      height: '50px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    } as React.CSSProperties,
    cardBody: {
      padding: '10px', // consistent padding
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1, // ensure it expands
    } as React.CSSProperties,
    titleRow: {
      fontSize: '18px', // bold and large
      fontWeight: '600',
      color: '#111827', // dark text
      marginBottom: '5px',
    } as React.CSSProperties,
    modelText: {
      fontWeight: '400',
      color: '#6b7280', // distinct grey for model
      marginLeft: '8px',
    } as React.CSSProperties,
    pricing: {
      marginBottom: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    } as React.CSSProperties,
    msrpLine: {
      fontSize: '14px',
      color: '#6b7280',
    } as React.CSSProperties,
    askingPriceLine: {
      fontSize: '20px', // large font size
      fontWeight: '600',
      color: '#0056b3', // blue color
    } as React.CSSProperties,
    askingPriceLabel: {
      marginRight: '8px',
    } as React.CSSProperties,
    savingsLine: {
      fontSize: '14px',
      color: '#4b5563', // slightly darker grey than msrp
      fontWeight: '500',
    } as React.CSSProperties,
    learnMoreBtn: {
      marginTop: 'auto', // push to the bottom
      width: '100%',
      padding: '11px 24px',
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '14px', // pill-shaped
      fontSize: '16px',
      fontWeight: '600',
      color: '#374151',
      cursor: 'pointer',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'block',
      boxSizing: 'border-box',
    } as React.CSSProperties,
  };

  const commentNow = false

  return (
    <div style={styles.card}>
      <div style={styles.imageHeader}>
        <img src={image} alt={`${year} ${manufacturer} ${model}`} style={styles.boatImage} />
        
      </div>

      <div style={styles.cardBody}>
        <div style={styles.titleRow}>
          <span>{year} {manufacturer}</span>
          <span style={styles.modelText}>{model}</span>
          <GradientDivider />
        </div>







        <div style={styles.pricing}>
          <div style={styles.msrpLine}>MSRP {msrp}</div>
          <div style={styles.askingPriceLine}>
            <span style={styles.askingPriceLabel}>Asking Price</span>
            <span>{askingPrice}</span>
          </div>
          {savings && (
            <div style={styles.savingsLine}>Savings {savings}</div>
          )}

        </div>

       {commentNow && (
         <a href="#" style={styles.learnMoreBtn}>
           Learn more
         </a>
       )}
      </div>
    </div>
  );
};

export default BoatCard;