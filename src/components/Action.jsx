import React,{useState} from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const Div = styled.div`
display: flex;
width: 95%;
flex-direction: column;
background-color: #9999;
justify-content: center;
align-items: center;
padding:  0 1%;
margin: .5em auto;
box-shadow: 2px 2px 2px #444;
font-family: 'Raleway', serif;
border: 1px solid black;
.action-name {
    font-size: 1.7em;
    text-shadow: 1px 1px 1px #777;
    font-weight: bold;
    @media(min-width: 1000px) {
        font-size: 1.3em;
        
    }
}
.dice-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.3em;
    font-weight: bold;
    text-shadow: 1px 1px 1px #777;

        p {
            margin: .5em .5em;
        }.type {
            margin: -1.2em 0 0 0;
            @media(min-width: 1000px) {
                margin 0 .5em;
            }
        }
        .die-amt {
            margin: 0;
        }
        .damage-die {
            margin: 0;
        }
        div {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            
        }
        @media(min-width: 1000px) {
            font-size: 1.2em;
            flex-direction: row;
        }
}

.action-result {
    margin-left: 3em;
    font-size: 1.2em;
}

.action-damage {
    text-decoration: underline;
    font-size: 1.2em;
}

.atk {
    font-size: 1em;
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
    flex-direction: row;
    height: 5em;
}

`


const Action = (props) => {

    const [actionResult, setActionResult] = useState(props.result)
    const [actionDamage, setActionDamage] = useState(props.damage)
    const [criticals, setCriticals] = useState({
        hit: false,
        fail: false,
    })

const criticalHit = () => {
        setCriticals({...criticals,hit: true});         
}
const criticalFail = () => {
    setCriticals({...criticals,fail: true});         
}

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
    let critResult;
    for(let i=0;i<amt;i++){
    result.push(Math.floor(Math.random() * num + 1));
    }
    criticalDamage = result.reduce((accumulator, currentValue)=> {
        return accumulator + currentValue;
    },0)
    critResult = criticalDamage * 2;
    if(props.type === 'Melee'){
        console.log('crit damage',criticalDamage);
        setActionDamage(critResult += parseInt(props.mod))
    }else if (props.type === 'Ranged'){
        console.log('crit damage',criticalDamage)
        setActionDamage(critResult += parseInt(props.mod))
    }

    if(actionDamage > props.player.highDamage) {
        props.setPlayerStats({...props.player,highDamage: actionDamage})
    }
    return {criticalDamage};
}

const rollDice = (num) => {
    setCriticals({...criticals,hit: false, criticals,fail : false});
    

    if(props.type == 'Melee') {
        let result = actionResult;
        result = (Math.floor(Math.random() * num + 1));
        if(result === 1) {
            props.setPlayerStats({...props.player,critFails: props.player.critFails +=1 })
            criticalFail();
            rollDamage(props.diceAmt,props.dice)
        }else if(result === 20) {
            props.setPlayerStats({...props.player,criticalHits: props.player.criticalHits +=1 })
            setActionResult(result += parseInt(props.mod))
            criticalHit();
            rollCriticalDamage(props.diceAmt ,props.dice)
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


    const resultFade = useSpring({
        to: [{opacity: 0}, { opacity: 1}],
        from: {opacity: 1},
        config: {
            duration: 300,
        }
         
    })

    const critAnimate = useSpring({
        color: actionResult - parseInt(props.mod) === 20 ? 'green': "black",
        textDecoration: criticals.fail ? 'line-through': "none",
        textDecorationColor: 'red'
    })
    return (
        <Div>
            <h5  className='action-name'>{props.name}</h5>
            <div className="dice-info">
                <p className="type">{props.type}</p>
                <div className='die'>
                    <p className='die-amt'>{props.diceAmt}</p>
                    <p className='damage-die'>d{props.dice}</p>
                    {props.mod > 0 ? <p> + {props.mod}</p> :'' }
                    <p>{props.damageType} </p>
                </div>
                {criticals.fail ? <animated.p style={critAnimate}>Critical Fail!</animated.p> : '' }           
                 {criticals.hit ? <animated.p style={critAnimate}>Critical Hit!</animated.p> : '' }   
                <animated.div style={resultFade}>
                    {actionResult > 0 ? <animated.p style={critAnimate} className='action-result'>{actionResult} to hit</animated.p>: '' }
                    {actionDamage > 0 ? <animated.p style={critAnimate} className='action-damage'>{actionDamage} DAM</animated.p>: '' }
                </animated.div>  
            </div>
            <button className='atk' onClick={()=>rollDice(20)}>Attack</button> 
        </Div>
    );
}

export default Action;
