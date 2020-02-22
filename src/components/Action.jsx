import React,{useState} from 'react';
import styled from 'styled-components';

const Div = styled.div`
width: 100%;
display: flex;
justify-content: space-around;
align-items: center;
.dice-info {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

        p {
            margin: 0 .25em;
        }
}

.action-result {
    margin-left: 3em;
    font-weight: bold;
}

.action-damage {
    text-decoration: underline;
}

button {
    height: 2em;
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
        setActionDamage(damage + props.player.strengthMod)
    }else if (props.type === 'Ranged'){
        console.log('damage',damage)
        setActionDamage(damage + props.player.dexMod)
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
        setActionDamage((criticalDamage*2) + props.player.strengthMod)
    }else if (props.type === 'Ranged'){
        console.log('crit damage',criticalDamage)
        setActionDamage((criticalDamage*2) + props.player.dexMod)
    }

    if(actionDamage > props.player.highDamage) {
        props.setPlayerStats({...props.player,highDamage: actionDamage})
    }
    return {criticalDamage};
}

const rollDice = (num) => {
    
    let result = actionResult;
    result = (Math.floor(Math.random() * num + 1));
        
        if(props.type === 'Melee'){
            if(result === 20) {
                console.log('Critical!')
                props.setPlayerStats({...props.player,criticalHits: props.player.criticalHits +=1 })
                rollCriticalDamage(props.diceAmt ,props.dice)
            }else {
            console.log('roll',result + props.player.strengthMod);
            setActionResult(result + props.player.strengthMod)
            rollDamage(props.diceAmt,props.dice)
            }
        }else if(props.type === 'Ranged') {
        if(result === 20) {
            console.log('Critical!')
            props.setPlayerStats({...props.player,criticalHits: props.player.criticalHits +=1 })
            rollCriticalDamage(props.diceAmt,props.dice)
        }else {
            console.log('roll',result + props.player.dexMod, "dexMod")
            setActionResult(result + props.player.dexMod)
            rollDamage(props.diceAmt,props.dice)
        }
        }else if(props.type === 'Dex Save') {
            rollDamage(props.diceAmt, props.dice)
        }
    return result;
    }

    return (
        <Div>
            <h3>{props.name}</h3>
            <div className="dice-info">
            <p>{props.type}</p>
                <p>{props.diceAmt}</p>
                <p>d{props.dice}</p>
                <p>{props.damageType} </p>
                {props.type === 'Melee' ? <p> + {props.player.strengthMod}</p> : <p> + {props.player.dexMod}</p> }
                {actionResult > 0 ? <p className='action-result'>{actionResult} to hit</p>: '' }
                {actionDamage > 0 ? <p className='action-damage'>{actionDamage} damage</p>: '' } 
            </div>
            <button onClick={()=>rollDice(20)}>Attack!</button> 
        </Div>
    );
}

export default Action;
