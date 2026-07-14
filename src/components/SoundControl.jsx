import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

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
                      ? 'rgba(255, 255, 255, 0.13)'
                      : 'rgba(12, 12, 13, 0.78)',
                    border: '1px solid rgba(255,255,255,0.16)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(16px)',
                    boxShadow: isPlaying ? '0 0 28px rgba(255,255,255,0.12)' : '0 16px 36px rgba(0,0,0,0.34)',
                    transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isPlaying ? 'scale(1.04)' : 'scale(1)'
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
