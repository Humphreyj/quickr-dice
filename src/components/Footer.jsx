import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
background-color: #111;
color: white;
text-shadow: 3px 2px 2px #777;
height: 5em;
padding: 2%;
margin-top: 1em;
`


const Header = () => {
    return (

        <Div>
            <p>Quick Dice</p>
        </Div>
    );
}

export default Header;
