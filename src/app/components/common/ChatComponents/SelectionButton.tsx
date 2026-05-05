
interface SelectionButtonsProps {
  buttons: string[];
  messageKey: string
  handlePredefinedMessage: (text: string, messageKey: string)=> void;
}

const SelectionButtons = (props: SelectionButtonsProps) => {
  const {buttons,messageKey,handlePredefinedMessage} = props

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {buttons?.map((label) => (
        <button
          key={label}
          style={{
            padding: "6px 12px",
            borderRadius: 9999,
            border: "1px solid #E3E3E3",
            background: "#fff",
            color: "#2D2D2D",
            fontSize: 14,
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontFamily:'inherit'
          }}
          onClick={()=>handlePredefinedMessage(label,messageKey)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default SelectionButtons