import React, { useState } from 'react';
import { axiosWithAuth } from '../clientAuth/auth';
import styled from 'styled-components';
import Load from './Loader';




const FormWrap = styled.div`
background-color: #111;
color: white;
text-shadow: 3px 2px 2px #777;
width: 100%;
text-shadow: 2px 2px 2px #111;

margin: 0 auto;
padding: 3%;
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
        
        height: 2em;
        font-size: 1.3em;
        border-radius 8px;
        font-family: 'Gelasio', serif;
        margin: .6em 0;
    } 
    select {
        margin: .6em 0;
        font-size: 1.2em;
    }
    .userInput {
        margin: .5em 0;
    }
    p {
        font-size: 1.4em;
    }
}
button {
    font-size: 1.3em;
    padding: 3%;
    margin-top: .6em;
    border-radius: 8px;
    font-family: 'Gelasio', serif;
    
    @media(min-width: 800px) {
        padding: 2%;
    }
}
`

const Registration = (props) => {

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        char_name: '',
        race: '',
        class: '',
        str_mod: 0 
    });

    const [loading, setLoading] = useState({
        isLoading: false
    })

    const [validation, setValidation] = useState({
        usernameVal: false,
        passwordVal: false,
        charVal: false
    })


    const register = e => {
        e.preventDefault();
        if(validation.usernameVal || validation.passwordVal || validation.charVal) {
            setValidation({...validation,usernameVal: true,passwordVal: true})
            
        }else {
            axiosWithAuth().post('https://quick-dice.herokuapp.com/api/auth/register', credentials)
            .then(res => {
            localStorage.setItem('token', res.data.token);
            props.history.push('/login');
            
            
            console.log(credentials)
            
            })
            setLoading({...loading,isLoading: true})
            setTimeout(()=> {
                setLoading({...loading,isLoading: false})
            },2000)
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
    const validateChar = (e) => {

        if(credentials.char_name === '') {
            setValidation({...validation,charVal: true})
        }else{
            setValidation({...validation,charVal: false})

        }
        
        
    }

    return (
        <div >
            

            { loading.isLoading ? <FormWrap><h4>Logging in...</h4> <Load /> </FormWrap>   :
            <FormWrap>
                <h4>Register here!</h4>
            <form onSubmit={register}>
                <input 
                name='username'
                className='userInput'
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
                onBlur ={validatePassword}/>
                {validation.passwordVal ? <p>You need a password!</p> : '' }

                <input 
                name='char_name'
                value={credentials.char_name}
                type="text"
                placeholder='Character Name'
                onChange={handleChange}
                onBlur ={validateChar}/>
                {validation.charVal ? <p>You need a Character Name!</p> : '' }

                <input 
                name='race'
                value={credentials.race}
                type="text"
                placeholder='Race'
                onChange={handleChange}
                />

                <input 
                name='class'
                value={credentials.class}
                type="text"
                placeholder='Class'
                onChange={handleChange}
                />
                <p className="str-mod">Strength Mod</p>
                <select 
                    className='mod'
                    name='str_mod'
                    value={credentials.str_mod}
                    onChange={handleChange}>
                    <option defaultValue >Modifier</option>
                    <option value={-3}>-3</option>
                    <option value={-2}>-2</option>
                    <option value={-1}>-1</option>
                    <option value={0}>0</option>
                    <option value={1}>+1</option>
                    <option value={2}>+2</option>
                    <option value={3}>+3</option>
                    <option value={4}>+4</option>
                    <option value={5}>+5</option>
                    <option value={6}>+6</option>
                    <option value={7}>+7</option>
                    <option value={8}>+8</option>
                    <option value={9}>+9</option>
                    <option value={10}>+10</option>
                    <option value={11}>+11</option>
                    <option value={12}>+12</option>
                    <option value={13}>+13</option>
                </select>
                


                <button type='submit'>Register!</button>
            </form>
            
            </FormWrap> } 
        </div>
    );
}

export default Registration;