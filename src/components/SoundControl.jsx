import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaSpinner } from 'react-icons/fa';

const SoundControl = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRedHTML = useRef(null); // Rename to distinguish from audio API

    const togglePlay = () => {
         const audioEl = audioRedHTML.current;
         if (!audioEl) return;

         if (isPlaying) {
             audioEl.pause();
             setIsPlaying(false);
         } else {
             // HTML5 Audio Element is safest for mobile
             // It must be triggered directly by the click
             audioEl.play().then(() => {
                 setIsPlaying(true);
             }).catch(e => {
                 console.error("Play error:", e);
                 alert("Tap again to play - Mobile audio requires direct interaction.");
             });
         }
    };

    return (
        <>
            <audio 
                ref={audioRedHTML} 
                src="/interstellar.mp3" 
                loop 
                preload="auto"
                style={{display: 'none'}} 
            />
            
            <button 
                onClick={togglePlay}
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
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    boxShadow: isPlaying ? '0 0 20px rgba(139, 92, 246, 0.6)' : '0 4px 6px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    transform: isPlaying ? 'scale(1.1)' : 'scale(1)'
                }}
                aria-label={isPlaying ? "Pause Ambient Sound" : "Play Ambient Sound"}
            >
                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} style={{marginLeft: '4px'}}/>}
                
                <style>{`
                    .spin { animation: spin 1s linear infinite; }
                    @keyframes spin { 100% { transform: rotate(360deg); } }
                `}</style>
            </button>
        </>
    );
};

export default SoundControl;
