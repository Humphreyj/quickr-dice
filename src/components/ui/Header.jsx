import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Div = styled.div`
background-color: #111;
color: white;
text-shadow: 3px 2px 2px #777;
height: 5em;
margin-top: -1em;
padding-top: 2em;

font-family: 'Raleway', serif;
text-align: center;


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
