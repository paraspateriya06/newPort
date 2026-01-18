import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaSpinner } from 'react-icons/fa';

const SoundControl = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // Reliable static placeholder URL for "Ambient Piano" music
    // Using a direct mp3 link that allows CORS and hotlinking
    const audioUrl = 'https://assets.mixkit.co/music/preview/mixkit-slow-trail-71.mp3'; 
    // Alternate: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3' (upbeat)
    // We want Hans Zimmer style. Let's try:
    // 'https://assets.mixkit.co/music/preview/mixkit-slow-trail-71.mp3' (Cinematic)
    
    // We will use a ref to hold the audio instance
    const audioRef = useRef(null);

    useEffect(() => {
        // Initialize Audio object
        const audio = new Audio('/interstellar.mp3');
        audio.loop = true;
        audio.volume = 0.5;
        
        // Add event listeners
        // 'canplay' fires much earlier than 'canplaythrough' (which waits for full buffer)
        const setReady = () => {
             console.log("Audio ready to play");
             setIsLoading(false);
        };
        const handleError = (e) => {
            console.error("Audio Load Error:", e);
            // Even if error, unlock button so user can try clicking to see what happens
            setIsLoading(false); 
        };

        audio.addEventListener('canplay', setReady);
        audio.addEventListener('loadedmetadata', setReady); // Fallback to enable sooner
        audio.addEventListener('error', handleError);
        
        // In case it loads instantly from cache
        if (audio.readyState >= 1) setIsLoading(false);

        audioRef.current = audio;

        return () => {
             audio.pause();
             audio.removeEventListener('canplay', setReady);
             audio.removeEventListener('loadedmetadata', setReady);
             audio.removeEventListener('error', handleError);
        };
    }, []);

    const togglePlay = async () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            try {
                // Browsers require user interaction before playing audio. 
                // This function is triggered by a click, so it should pass.
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                console.error("Play failed:", error);
                // Maybe show a UI error state or retry
            }
        }
    };

    return (
        <button 
            onClick={togglePlay}
            disabled={isLoading}
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 1000,
                background: isPlaying 
                  ? 'rgba(139, 92, 246, 0.4)' 
                  : 'rgba(30, 41, 59, 0.6)',
                border: '1px solid var(--primary-accent)',
                color: 'white',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isLoading ? 'wait' : 'pointer',
                backdropFilter: 'blur(10px)',
                boxShadow: isPlaying ? '0 0 20px rgba(139, 92, 246, 0.6)' : '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: isPlaying ? 'scale(1.1)' : 'scale(1)'
            }}
            aria-label={isPlaying ? "Pause Ambient Sound" : "Play Ambient Sound"}
            title="Toggle Cinematic Experience"
        >
            {isLoading ? (
                <FaSpinner className="spin" />
            ) : (
                isPlaying ? <FaPause size={20} /> : <FaPlay size={20} style={{marginLeft: '4px'}}/>
            )}
            
            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </button>
    );
};

export default SoundControl;
