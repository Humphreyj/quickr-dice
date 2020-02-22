import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
background-color: #111;
color: white;
text-shadow: 2px 2px 2px #333;
height: 5em;
margin-top: -2em;
padding-top: 1em;
`


const Header = () => {
    return (

        <Div>
            <h1>Quick Dice</h1>
        </Div>
    );
}

export default Header;
