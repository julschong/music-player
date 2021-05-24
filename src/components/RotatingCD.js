import React from 'react';

const RotatingCD = ({ isPlaying }) => {
    const rotate = isPlaying
        ? {
              animationPlayState: 'running'
          }
        : {
              animationPlayState: 'paused'
          };

    return (
        <div className="img-container">
            <img src="./assets/Atmosphere.jpg" alt="cd" style={rotate}></img>
        </div>
    );
};

export default RotatingCD;
