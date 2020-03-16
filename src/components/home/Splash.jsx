import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Div = styled.div`
height: 78vh;

background-color: #111;
.contents {
    color: white;
    text-shadow: 1px 2px 2px rgba(244, 244, 244, .2);
    padding: 4% ;
    @media(min-width: 1000px) { {
        width: 70%;
        margin: 0 auto;
    }}

    h1 {
        font-family: 'Fjalla One', sans-serif ;
        border-bottom: 1px solid white;
        font-size: 2.2em;
        width: 90%;
        letter-spacing: .1em;
        @media(min-width: 1000px) { {
            width: 70%;
            
        }}
    }
    h4 {
        font-size: 1.3em;
    }
    p {
        font-family: 'Roboto',serif ;
    }
    .auth-buttons {
        a {
            color: white;
            text-decoration: none;
            font-family: 'Fjalla One', sans-serif ;
            text-shadow: 1px 2px 2px rgba(244, 244, 244, .2);
        }
        button {
            background-color: #111;
            color: white;
            font-size: 1.2em;
            padding: 1.5%;
            margin: 0 1.1em;
        }
    }
    .about {
        p {
            font-size: 1.3em;
            font-family: 'Raleway', serif;
            margin: 2em 0;
        }
    }
}

`

const Splash = () => {
    return (
        <Div>
            <div className="contents">
                <h1>Welcome to Quick Dice!</h1>
                <h4>Speeding Up Combat Since 2020</h4>

            <div className="about">
                <p><i className="fas fa-dice-d6"></i> Create an account and start saving your commonly used actions!</p>
                <p><i className="fas fa-dice-d6"></i> Use less time adding up dice and more time thinking tactically!</p>
                <p><i className="fas fa-dice-d6"></i> Impress your friends with how quickly you take your turn!</p>

            </div>

                <div className="auth-buttons">
                    <button className="logIn"><Link to='/login'>Log In</Link></button>
                    <button className="register"><Link to='/register'>Register</Link></button>
                </div>
            

            </div>
            
        </Div>
    );
}

export default Splash;
