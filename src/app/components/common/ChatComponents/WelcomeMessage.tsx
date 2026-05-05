
import MarkdownRenderer from "./MarkdownRenderer";
import SelectionButtons from "./SelectionButton";

interface MessageBubbleProps {
    message: any;
    
    
}

const WelcomeMessage = (props: MessageBubbleProps) => {
    const { message, 
        
    } = props

    const keyToArray: Record<string, string[]> = {
        'welcome': [
            "Find the right boat for me",
            "Browse boats & inventory",
            "compare boat models",
            "Talk to an expert",
            "Ask a question",
        ],
        "boat_for": [
            "Family outings & leisure",
            "Watersports",
            "Fishing",
            "Relaxation cruising",
            "Mixed use",
        ],
        "people_on_board": [
            '2–4 people',
            '5–8 people',
            '8–12 people',
            '12+ people'
        ],
        "use_of_boat": [
            'Lakes',
            'Ocean / coastal waters',
            'Rivers',
            'Not sure yet'
        ],
        "boat_ownership": ['First-time buyer', 'Some experience', 'Experienced owner'],
        "budget_range": ['Under $50K', '$50K – $100K', '$100K – $200K', '$200K+', 'Not sure yet'],
        "buying_timeline": ['Ready now', 'Within 1–3 months', 'Within 3–6 months', 'Just exploring'],
        "storage_option": ['Yes, I have a dock', "I’ll use a marina", 'Not yet'],
        "important_take": [
            'Performance & speed',
            'Comfort & space',
            'Luxury & design'
        ]
    }

    return (
        <div
            className={'widget-message-tile'}
            style={{
                padding: "0px 16px",
                marginBottom: "12px",
                marginRight:  "60px",
            }}>
            {/* Three-dot indicator while waiting for first streaming token */}
            
            <div
           
                style={{
                    maxWidth: 520,  //changed
                    padding: "10px 20px",
                    borderLeft: "4px solid #1a56db",
                    borderRadius: 12,
                    background: "#fff",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    color: "#2D2D2D",
                    fontSize: 14,
                    lineHeight: 1.6,
                }}
            >
                <div style={{ margin: "0 0 12px 0" }}>
                    {/* { <TypingIndicator />} */}
                    {message?.content ? <MarkdownRenderer content={message?.content} /> : ''}
                </div>
                {
                    message?.key && keyToArray?.[message?.key] &&
                    <SelectionButtons 
                    messageKey={message?.key}
                    buttons={keyToArray?.[message?.key]}
                    handlePredefinedMessage={()=>{}} />
                }
                

            </div>
        </div>
    )
}

export default WelcomeMessage