import React, { useState,useEffect } from 'react';
import { axiosWithAuth } from '../clientAuth/auth';
import styled from 'styled-components';
import Load from './Loader';



const FormWrap = styled.div`
background-color: rgba(0,0,0,.3);
color: white;
text-shadow: 2px 2px 2px #111;
width: 20em;
margin: 0 auto;
padding: 3%;
height: 35em;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
h4 {
    font-size: 2.2em;
    text-align: center;
    font-family: 'Gelasio', serif;
    
}
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    input {
        margin: 1.5em 0em;
        height: 2em;
        font-size: 1.3em;
        border-radius 8px;
        font-family: 'Gelasio', serif;
    }
}
button {
    font-size: 1.3em;
    padding: 3%;
    border-radius: 8px;
    font-family: 'Gelasio', serif;
    
    @media(min-width: 800px) {
        padding: 2%;
    }
}
`

const Login = (props) => {

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const [loading, setLoading] = useState({
        isLoading: false
    })

    const [validation, setValidation] = useState({
        usernameVal: false,
        passwordVal: false,
    })

    const login = e => {
        e.preventDefault();
        if(validation.usernameVal || validation.passwordVal || credentials.username === '' || credentials.password==='') {
            setValidation({...validation,usernameVal: true,passwordVal: true})
        }else {
            axiosWithAuth().post('http://localhost:3030/api/auth/login', credentials)
            .then(res => {
            localStorage.setItem('token', res.data.token);
            console.log(res)
            let id = res.data.id
            localStorage.setItem('user_id', id)
            // console.log(res.data.token)
            props.history.push(`/player/${id}`);
            
            })
            .catch(err => {
                console.log(err);
            })
            setLoading({...loading,isLoading: true})
            setTimeout(()=> {
                setLoading({...loading,isLoading: false})
            },2000)
            console.log(credentials)
            
            
            
        }
        
    }

    const handleChange = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
        console.log(credentials)
    }

    const validateUserName = (e) => {

        if(credentials.username === '') {
            setValidation({...validation,usernameVal: true})
        }else {
            setValidation({...validation,usernameVal: false})
        }
        
        
    }

    const validatePassword = (e) => {

        if(credentials.password === '') {
            setValidation({...validation,passwordVal: true})
        }else{
            setValidation({...validation,passwordVal: false})

        }
        
        
    }

    

    

    return (
        <div >
            

            { loading.isLoading ? <FormWrap><h4>Logging in...</h4> <Load /> </FormWrap>   :
            <FormWrap>
                <h4>Welcome! Please log in to proceed.</h4>
            <form onSubmit={login}>
                <input 
                name='username'
                value={credentials.username}
                type="text"
                placeholder='Username'
                onChange={handleChange}
                onBlur ={validateUserName}/>
                {validation.usernameVal ? <p>You need a username!</p> : '' }

                <input 
                name='password'
                value={credentials.password}
                type="password"
                placeholder='Password'
                onChange={handleChange}
                onBlur = {validatePassword}/>
                 {validation.passwordVal ? <p>You need a password!</p> : '' }

                <button type='submit'>Log In!</button>
            </form>
            </FormWrap> }

        </div>
    );
}

export default Login;