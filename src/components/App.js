import './App.css';
import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import { ReactComponent as PlaySVG } from '../assets/play-arrow.svg';
import { ReactComponent as NextSVG } from '../assets/next.svg';

const AudioElement = styled.div`
     {
    }
`;

const playList = [
    'Atmosphere.mp3',
    'Destroy-capitalism-for-christmas.mp3',
    'music.mp3'
];

const App = () => {
    const audioElement = useRef();
    const seekbar = useRef();
    const intervalRef = useRef(0);
    const [title, setTitle] = useState('');
    const [trackProgress, setTrackProgress] = useState(0);
    const [trackIndex, setTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        console.log(audioElement);
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

    useEffect(() => {
        setTitle(audioElement.current.src);
        setTrackProgress(
            (audioElement.current.currentTime / audioElement.current.duration) *
                100
        );
        setIsPlaying(true);
    }, [trackIndex]);

    useEffect(
        () => () => {
            console.log(`isplaying useEffect ran`);
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

    const rangeSet = (e) => {
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

    return (
        <div className="App">
            <AudioElement className="noselect" id="audio-player-container">
                {title.split('/').pop()}
                <br></br>
                <audio
                    ref={audioElement}
                    controls
                    src={`./assets/${playList[trackIndex]}`}
                    type="audio/mpeg"
                    autoPlay={true}
                ></audio>
                <button onClick={togglePlay}>
                    <PlaySVG className="play-btn" width="50px" />
                </button>
                <button onClick={next}>
                    <NextSVG className="next-btn" width="50px" />
                </button>
                <input
                    ref={seekbar}
                    type="range"
                    name="seekbar"
                    id="seekbar"
                    min="0"
                    step="0.25"
                    max="100"
                    value={trackProgress}
                    onChange={rangeSet}
                ></input>
            </AudioElement>
        </div>
    );
};

export default App;
