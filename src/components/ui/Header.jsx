import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Div = styled.div`
background-color: #111;
color: white;
text-shadow: 3px 2px 2px #777;
height: 5em;
margin-top: -2em;
padding-top: 1em;
font-family: 'Raleway', serif;

a {
    color: white;
    text-shadow: 3px 2px 2px #777;
}
`


const Header = () => {
    return (

        <Div>
            <Link to ='/'><h1>Quick Dice</h1></Link>
        </Div>
    );
}

export default Header;
