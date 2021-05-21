import './App.css';

const App = () => {
    return (
        <div className="App">
            <div id="audio-player-container">
                <audio
                    controls
                    src="./assets/ukulele.mp3"
                    type="audio/mpeg"
                ></audio>
            </div>
        </div>
    );
};

export default App;
