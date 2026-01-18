import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaSpinner } from 'react-icons/fa';

const SoundControl = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // No loading initially
    const audioRef = useRef(null);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = async () => {
        // Lazy load: Initialize audio ONLY on the first user interaction (Mobile requirement)
        if (!audioRef.current) {
            setIsLoading(true);
            try {
                const audio = new Audio('/interstellar.mp3');
                audio.loop = true;
                audio.volume = 0.5;
                
                // Wait for it to be actually playable
                await audio.play();
                
                audioRef.current = audio;
                setIsPlaying(true);
            } catch (error) {
                console.error("Playback failed (likely mobile restriction or network):", error);
                alert("Audio could not play. Please interact with the page or check your connection.");
            } finally {
                setIsLoading(false);
            }
        } else {
            // Standard toggle
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.error("Resume failed:", err);
                }
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
