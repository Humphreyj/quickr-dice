import React from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const Load = () => {
    return (
        <div>
            <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={2500} //2 secs

            />
        </div>
    );
}

export default Load;