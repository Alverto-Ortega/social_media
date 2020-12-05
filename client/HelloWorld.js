import React from 'react';
import {hot} from  'react-hot-loader';

//Helloworld React component which is hot exported to enable hot reloading with react-hot-loader
const HelloWorld = () => {
    return (
        <div>
            <h1>HELLO World! My Full-stack development environment is Fully set up with the MERN tecnologies! 8)</h1>
        </div>
    )
};

export default hot(module) (HelloWorld);