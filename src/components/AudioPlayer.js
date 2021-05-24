import React from 'react';
import './AudioPlayer.css';
import { useRef, useState, useEffect } from 'react';
import { ReactComponent as PlaySVG } from '../assets/play-arrow.svg';
import { ReactComponent as NextSVG } from '../assets/next.svg';
import { ReactComponent as PauseSVG } from '../assets/pause.svg';
import DrawerSeekbar from './DrawerSeekbar';
import RotatingCD from './RotatingCD';

const playList = [
    'Atmosphere.mp3',
    'Destroy-capitalism-for-christmas.mp3',
    'music.mp3'
];

const AudioPlayer = () => {
    const audioElement = useRef();
    const seekbar = useRef();
    const intervalRef = useRef(0);
    const [title, setTitle] = useState('');
    const [trackProgress, setTrackProgress] = useState(0);
    const [trackIndex, setTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        setTitle(audioElement.current.src);
        setTrackProgress(
            (audioElement.current.currentTime / audioElement.current.duration) *
                100
        );
        setIsPlaying(false);
    }, [trackIndex]);

    useEffect(
        () => () => {
            intervalRef.current = setInterval(() => {
                setTrackProgress(
                    (audioElement.current.currentTime /
                        audioElement.current.duration) *
                        100
                );
            }, [1000]);
        },
        [isPlaying]
    );

    const rangeSet = () => {
        audioElement.current.currentTime = Math.floor(
            (seekbar.current.value / 100) * audioElement.current.duration
        );
    };

    const next = () => {
        if (trackIndex === playList.length - 1) {
            return setTrackIndex(0);
        }
        setTrackIndex((track) => track + 1);
    };

    const last = () => {
        if (trackIndex === 0) {
            return setTrackIndex(playList.length - 1);
        }
        setTrackIndex((track) => track - 1);
        console.log(audioElement);
    };

    const togglePlay = () => {
        if (audioElement.current.paused) {
            audioElement.current.play();
            clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
                setTrackProgress(
                    (audioElement.current.currentTime /
                        audioElement.current.duration) *
                        100
                );
            }, [1000]);
            setIsPlaying(true);
        } else {
            audioElement.current.pause();
            setIsPlaying(false);
        }
    };
    return (
        <div className="audio-container">
            <h1>Music Player</h1>
            <DrawerSeekbar
                title={title}
                seekbar={seekbar}
                trackProgress={trackProgress}
                rangeSet={rangeSet}
                isPlaying={isPlaying}
            />
            <div className="noselect " id="audio-player">
                <RotatingCD isPlaying={isPlaying} />
                <audio
                    ref={audioElement}
                    src={`./assets/${playList[trackIndex]}`}
                    type="audio/mpeg"
                ></audio>
                <div className="audio-control-group">
                    <button onClick={last}>
                        <NextSVG
                            className="last-btn"
                            width="50px"
                            height="50px"
                        />
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
                            <PlaySVG
                                className="play-btn"
                                width="80px"
                                height="80px"
                            />
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
            </div>
        </div>
    );
};

export default AudioPlayer;
