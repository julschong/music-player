import React, { useEffect, useState } from 'react';

const DrawerSeekbar = ({
    title,
    seekbar,
    trackProgress,
    rangeSet,
    isPlaying
}) => {
    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            return setVisibility(true);
        }
        setVisibility(false);
    }, [isPlaying]);

    const visibleStype = {
        transform: 'none',
        opacity: 1
    };

    return (
        <div
            className="drawer-seekbar"
            style={visibility ? visibleStype : null}
        >
            <p>{title.split('/').pop().split('.')[0]}</p>
            <input
                ref={seekbar}
                type="range"
                name="seekbar"
                id="seekbar"
                min="0"
                step="0.25"
                max="100"
                value={trackProgress ? trackProgress : 0}
                onChange={rangeSet}
            ></input>
        </div>
    );
};

export default DrawerSeekbar;
