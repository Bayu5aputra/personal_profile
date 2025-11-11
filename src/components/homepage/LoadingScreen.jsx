import React, { useEffect, useState } from 'react';
import './styles/LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [waterDropVisible, setWaterDropVisible] = useState(false);
    const [rippleVisible, setRippleVisible] = useState(false);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Sequence animation
        const timer1 = setTimeout(() => {
            setWaterDropVisible(true);
        }, 500);

        const timer2 = setTimeout(() => {
            setRippleVisible(true);
        }, 1000);

        const timer3 = setTimeout(() => {
            setIsFading(true);
        }, 2000);

        const timer4 = setTimeout(() => {
            setIsVisible(false);
            onLoadingComplete();
        }, 3000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, [onLoadingComplete]);

    if (!isVisible) return null;

    return (
        <div className={`loading-screen ${isFading ? 'fading' : ''}`}>
            {/* Water Drop */}
            <div className={`water-drop ${waterDropVisible ? 'visible' : ''}`}>
                <div className="drop-shape"></div>
            </div>
            
            {/* Ripple Waves */}
            <div className="ripple-container">
                <div className={`ripple-wave ${rippleVisible ? 'wave-1' : ''}`}></div>
                <div className={`ripple-wave ${rippleVisible ? 'wave-2' : ''}`}></div>
                <div className={`ripple-wave ${rippleVisible ? 'wave-3' : ''}`}></div>
            </div>
        </div>
    );
};

export default LoadingScreen;