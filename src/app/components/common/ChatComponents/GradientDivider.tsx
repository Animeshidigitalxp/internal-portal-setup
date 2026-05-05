

const GradientDivider = () => {
    const containerStyle = {
        display: 'flex',
        alignItems: 'center', // Aligns the line to the center of the slanted shape
        width: '100%',
        margin: '5px 0',
        height: '7px', // Height of the "head" shape
    };

    const slantedHeadStyle = {
        width: '40px',
        height: '100%',
        backgroundColor: '#F0F0F0',
        // This creates the slanted parallelogram look from the image
        transform: 'skewX(-30deg)',
        marginRight: '-5px', // Slight overlap to ensure a seamless connection
        flexShrink: 0,
    };

    const lineStyle = {
        height: '1px',
        flexGrow: 1,
        border: 'none',
        /* Gradient starts solid white to connect to the shape, then fades out */
        backgroundColor: '#F0F0F0',
    };

    return (
        <div style={containerStyle}>
            <div style={slantedHeadStyle} />
            <hr style={lineStyle} />
        </div>
    );
};

export default GradientDivider;