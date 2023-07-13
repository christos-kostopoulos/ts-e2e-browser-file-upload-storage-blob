import React from 'react';

const Loader = (): JSX.Element => {
    return <div style={{
        margin: 10,
        padding: 10,
        display: 'grid',
        placeItems: 'center',
        minHeight: '100vh',
    }}>
        <div className="paytm-loader"></div>
    </div>

};

export default Loader;