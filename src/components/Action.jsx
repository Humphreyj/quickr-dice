import React,{useState} from 'react';
import styled from 'styled-components';

const Div = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 2%;

h5 {
    font-size: 1em;
}
.dice-info {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;

        p {
            margin: 0 .1em;
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
    height: 2em;
    width: 3.8em;
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
        setActionDamage(damage + props.mod)
    }else if (props.type === 'Ranged'){
        console.log('damage',damage)
        setActionDamage(damage + props.mod)
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
        setActionDamage((criticalDamage*2) + props.mod)
    }else if (props.type === 'Ranged'){
        console.log('crit damage',criticalDamage)
        setActionDamage((criticalDamage*2) + props.mod)
    }

    if(actionDamage > props.player.highDamage) {
        props.setPlayerStats({...props.player,highDamage: actionDamage})
    }
    return {criticalDamage};
}

const rollDice = (num) => {
    
    let result = actionResult;
    result = (Math.floor(Math.random() * num + 1));
        if(result === 20) {
            console.log('Critical!')
            props.setPlayerStats({...props.player,criticalHits: props.player.criticalHits +=1 })
            setActionResult(result + props.mod)
            rollCriticalDamage(props.diceAmt ,props.dice)
        }else {
        console.log('roll',result + props.mod);
        setActionResult(result + props.mod)
        rollDamage(props.diceAmt,props.dice)
        }
    return result;
    }

    return (
        <Div>
            <h5>{props.name}</h5>
            <div className="dice-info">
                <p>{props.type}</p>
                <p>{props.diceAmt}</p>
                <p>d{props.dice}</p>
                <p>{props.damageType} </p>
                {props.mod > 0 ? <p> + {props.mod}</p> :'' }
                {actionResult > 0 ? <p className='action-result'>{actionResult} to hit</p>: '' }
                {actionDamage > 0 ? <p className='action-damage'>{actionDamage} damage</p>: '' } 
            </div>
            <button onClick={()=>rollDice(20)}>Attack!</button> 
        </Div>
    );
}

export default Action;
