import React,{useState} from 'react';
import styled from 'styled-components';

const Div = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding:  0 2%;
margin: 1em 0;
box-shadow: 2px 2px 2px #444;
font-family: 'Raleway', serif;
border: 1px solid black;
.action-name {
    font-size: 1em;
    text-shadow: 2px 1px 1px #777;
    @media(min-width: 1000px) {
        font-size: 1.3em;
    }
}
.dice-info {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .9em;
    text-shadow: 1px 1px 1px #777;

        p {
            margin: 0 .5em;
        }
        .die-amt {
            margin: 0;
        }
        .damage-die {
            margin: 0;
        }
        @media(min-width: 1000px) {
            font-size: 1.2em;
        }
}

.action-result {
    margin-left: 3em;
    font-weight: bold;
    font-size: .9em;
}

.action-damage {
    text-decoration: underline;
    font-size: .9em;
}

button {
    font-size: 1.1em;
    width: 3.8em;
    height: 1.5em;
    text-align: center;
    background-color: #111;
    color: white;
    transition: all 0.1s ease;
    
    &:active {
        background-color: #888;
        color: #111;;
    }
}

@media(min-width: 1000px) {
    width: 75%;
    margin: 1em auto;
}

`


const Action = (props) => {

    const [actionResult, setActionResult] = useState(props.result)
    const [actionDamage, setActionDamage] = useState(props.damage)

const rollDamage = (amt,num) => {
    let damage = actionDamage;
    let result =[];
    for(let i=0;i<amt;i++){
    result.push(Math.floor(Math.random() * num + 1));
    }
    damage = result.reduce((accumulator, currentValue)=> {
        return accumulator + currentValue;
    },0)
    if(props.type === 'Melee'){
        console.log('damage',damage);
        setActionDamage(damage += parseInt(props.mod))
    }else if (props.type === 'Ranged'){
        console.log('damage',damage)
        setActionDamage(damage += parseInt(props.mod))
    }else if(props.type=== 'Dex Save') {
        setActionDamage(damage)
    }

    //Get Highest Damage
    if(actionDamage > props.player.highDamage) {
        props.setPlayerStats({...props.player,highDamage: actionDamage})
    }
    return {damage};
}

const rollCriticalDamage = (amt,num) => {
    let criticalDamage = actionDamage;
    let result =[];
    for(let i=0;i<amt;i++){
    result.push(Math.floor(Math.random() * num + 1));
    }
    criticalDamage = result.reduce((accumulator, currentValue)=> {
        return accumulator + currentValue;
    },0)
    if(props.type === 'Melee'){
        console.log('crit damage',criticalDamage);
        setActionDamage((criticalDamage*2) + parseInt(props.mod))
    }else if (props.type === 'Ranged'){
        console.log('crit damage',criticalDamage)
        setActionDamage((criticalDamage*2) + parseInt(props.mod))
    }

    if(actionDamage > props.player.highDamage) {
        props.setPlayerStats({...props.player,highDamage: actionDamage})
    }
    return {criticalDamage};
}

const rollDice = (num) => {

    if(props.type == 'Melee') {
        let result = actionResult;
        result = (Math.floor(Math.random() * num + 1));
        if(result === 1) {
            props.setPlayerStats({...props.player,critFails: props.player.critFails +=1 })
            alert('Natural One!')
        }
        if(result === 20) {
            console.log('Critical!')
            props.setPlayerStats({...props.player,criticalHits: props.player.criticalHits +=1 })
            setActionResult(result += parseInt(props.mod))
            rollCriticalDamage(props.diceAmt ,props.dice)
            alert('Critical Hit!')
        }else {
        console.log('roll',result + parseInt(props.mod));
        setActionResult(result += parseInt(props.mod))
        rollDamage(props.diceAmt,props.dice)
            // return result;
        }
    
    }else if(props.type == 'Ranged'){
        let result = actionResult;
        result = (Math.floor(Math.random() * num + 1));
        if(result === 20) {
            console.log('Critical!')
            props.setPlayerStats({...props.player,criticalHits: props.player.criticalHits +=1 })
            setActionResult(result += parseInt(props.mod))
            rollCriticalDamage(props.diceAmt ,props.dice)
        }else {
        console.log('roll',result + parseInt(props.mod));
        setActionResult(result += parseInt(props.mod))
        rollDamage(props.diceAmt,props.dice)
            // return result;
        }

    }else {
        setActionResult(0);
        rollDamage(props.diceAmt,props.dice)
    }
    }

    return (
        <Div>
            <h5 className='action-name'>{props.name}</h5>
            <div className="dice-info">
                <p>{props.type}</p>
                <p className='die-amt'>{props.diceAmt}</p>
                <p className='damage-die'>d{props.dice}</p>
                <p>{props.damageType} </p>
                {props.mod > 0 ? <p> + {props.mod}</p> :'' }
                {actionResult > 0 ? <p className='action-result'>{actionResult} to hit</p>: '' }
                {actionDamage > 0 ? <p className='action-damage'>{actionDamage} DAM</p>: '' } 
            </div>
            <button onClick={()=>rollDice(20)}>Attack</button> 
        </Div>
    );
}

export default Action;
