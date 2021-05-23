import './App.css';
import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import { ReactComponent as PlaySVG } from './play-arrow.svg';

const AudioElement = styled.div`
     {
    }
`;

const ButtonElement = styled.button`
     {
        display: block;
        height: 50px;
        width: 100px;
        margin: auto;
    }
`;

const App = () => {
    const audioElement = useRef();
    const seekbar = useRef();
    const [title, setTitle] = useState('');

    const togglePlay = () => {
        console.log(audioElement);
        audioElement.current.paused
            ? audioElement.current.play()
            : audioElement.current.pause();
    };

    useEffect(() => {
        setTitle(audioElement.current.src);
    }, []);

    const rangeSet = (e) => {
        audioElement.current.currentTime = Math.floor(
            (seekbar.current.value / 100) * audioElement.current.duration
        );
    };

    return (
        <div className="App">
            <AudioElement className="noselect" id="audio-player-container">
                {title.split('/').pop()}
                <br></br>
                <audio
                    ref={audioElement}
                    controls
                    src="./assets/music.mp3"
                    type="audio/mpeg"
                ></audio>
                {/* <ButtonElement onClick={togglePlay}>Play Pause</ButtonElement> */}
                <PlaySVG
                    className="play-btn"
                    width="50px"
                    onClick={togglePlay}
                />
                <input
                    ref={seekbar}
                    type="range"
                    name="seekbar"
                    id="seekbar"
                    min="0"
                    step="0.25"
                    max="100"
                    defaultValue="0"
                    onChange={rangeSet}
                ></input>
            </AudioElement>
        </div>
    );
};

export default App;
