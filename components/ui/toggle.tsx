import '@/components/ui/styles/toggle.css';

export default function Toggle({
    checked,
    onChange,
    label,
}: {    
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
}) {
    return (
        <div className="neo-toggle-container">
            <input 
                className="neo-toggle-input" 
                id="neo-toggle" 
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <label className="neo-toggle" htmlFor="neo-toggle">
                <div className="neo-track">
                    <div className="neo-background-layer"></div>
                    <div className="neo-grid-layer"></div>
                    <div className="neo-track-highlight"></div>
                </div>

                <div className="neo-thumb">
                    <div className="neo-thumb-ring"></div>
                    <div className="neo-thumb-core">
                        <div className="neo-thumb-icon">
                            <div className="neo-thumb-wave"></div>
                            <div className="neo-thumb-pulse"></div>
                        </div>
                    </div>
                </div>

                <div className="neo-gesture-area"></div>

                <div className="neo-interaction-feedback">
                    <div className="neo-ripple"></div>
                    <div className="neo-progress-arc"></div>
                </div>

                <div className="neo-status">
                    <div className="neo-status-indicator">
                        <div className="neo-status-dot"></div>
                        <div className="neo-status-text"></div>
                    </div>
                </div>
            </label>
      {/*       {label && <span className="ml-2">{label}</span>} */}
        </div>

    );
}