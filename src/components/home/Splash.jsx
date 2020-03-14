import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Splash = () => {
    return (
        <div>
            <h1>Welcome to Quick Dice!</h1>

            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae sit repellat laudantium ullam excepturi possimus ex tenetur atque sed consectetur.</p>

            <div className="auth-buttons">
                <button className="logIn"><Link to='/login'>Log In</Link></button>
                <button className="register"><Link to='/register'>Register</Link></button>
            </div>
            
        </div>
    );
}

export default Splash;
