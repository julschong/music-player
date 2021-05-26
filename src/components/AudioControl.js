import React from 'react';
import { ReactComponent as PlaySVG } from '../assets/play-arrow.svg';
import { ReactComponent as NextSVG } from '../assets/next.svg';
import { ReactComponent as PauseSVG } from '../assets/pause.svg';

const AudioControl = ({ isPlaying, last, togglePlay, next }) => {
    return (
        <div className="audio-control-group">
            <button onClick={last}>
                <NextSVG className="last-btn" width="50px" height="50px" />
            </button>
            {isPlaying ? (
                <button onClick={togglePlay}>
                    <PauseSVG
                        className="pause-btn"
                        width="80px"
                        height="80px"
                    />
                </button>
            ) : (
                <button onClick={togglePlay}>
                    <PlaySVG className="play-btn" width="80px" height="80px" />
                </button>
            )}
            <button onClick={next}>
                <NextSVG
                    className="next-btn track-btn"
                    width="50px"
                    height="50px"
                />
            </button>
        </div>
    );
};

export default AudioControl;
