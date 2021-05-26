import React from 'react';

const RotatingCD = ({ isPlaying, title }) => {
    const rotate = isPlaying
        ? {
              animationPlayState: 'running'
          }
        : {
              animationPlayState: 'paused'
          };

    return (
        <div className="img-container">
            <img
                src={`./assets/${title.split('/').pop().split('.')[0]}.jpg`}
                alt="cd"
                style={rotate}
            ></img>
        </div>
    );
};

export default RotatingCD;
