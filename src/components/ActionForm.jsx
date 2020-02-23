import React,{ useState } from 'react';
import styled from 'styled-components';

const Div =  styled.div`
font-family: 'Fjalla One', sans-serif ;
form {
    width: 60%;
    margin: 0 auto;
    h4 {
        text-shadow: 2px 1px 1px #666;
    }
    .dice-info {
        display: flex;
        justify-content: space-evenly;
        div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }

    .type-form {
        display: flex;
        justify-content: space-evenly;
    }
    
    select {
        height: 2.4em;
        margin: 1em .5em;
        box-shadow: 2px 2px 2px #666;
        @media(min-width: 1000px) {
            height: 2.6em;
            margin: 1.5em 1em;
        }
    }
    
    }
    input {
        height: 2em;
        box-shadow: 2px 2px 2px #666;
    }
    
   
}

@media(min-width: 1000px) {
    width: 40%;
    margin: 0 auto;
}
button {
    width: 3em;
    height: 2.3em;
    background-color: #111;
    color: white;
    font-size: 1.1em;
    box-shadow: 2px 2px 2px #444;
    margin: 1em 0;
}
`
const ActionForm = (props) => {

    const [newAction, setNewAction] = useState({
        id: props.actions.length +1,
        name: '',
        type: '',
        damageType:'',
        diceAmt: 0,
        dice: 0,
        mod: 0,
        damage: 0,
    })

    const changeHandler = e => {
        console.log(newAction)
        setNewAction({...newAction,[e.target.name] : e.target.value})
    }
    const cancelAdding = e => {
        props.setAddingAction(false);
    }

    const submitHandler = e => {
        e.preventDefault();
        let updatedActions = [...props.actions, newAction]
        props.setPlayerStats({...props.player,actions: updatedActions})
        
        console.log(props.actions);
        setNewAction({
        id:  0,
        name: '',
        type: '',
        damageType:'',
        diceAmt: 0,
        dice: 0,
        mod: 0,
        damage: 0,
        });
        props.setAddingAction(false);
        
    }
    return (
        <Div>
            <form onSubmit={submitHandler}>
                
                <input type="text"
                name='name'
                value={newAction.name}
                placeholder='Name of Action'
                onChange={changeHandler}/>

                <div className="type-form">
                    <select 
                    name='type'
                    value={newAction.type}
                    onChange={changeHandler}>
                        <option value='none'>Attack Type</option>
                        <option value='Cha Save'>Cha Save</option>
                        <option value='Con Save'>Con Save</option>
                        <option value='Dex Save'>Dex Save</option>
                        <option value='Int Save'>Int Save</option>
                        <option value='Melee'>Melee</option>
                        <option value='Ranged'>Ranged</option>
                        <option value='Wis Save'>Wis Save</option>
                    </select>

                    <select 
                        name='damageType'
                        value={newAction.damageType}
                        onChange={changeHandler}>
                        <option value='none'>Damage Type</option>   
                        <option value='Bludgeoning'>Bludgeoning</option>
                        <option value='Cold'>Cold</option>
                        <option value='Fire'>Fire</option>
                        <option value='Force'>Force</option>
                        <option value='Lightning'>Lightning</option>
                        <option value='Piercing'>Piercing</option>
                        <option value='Slashing'>Slashing</option>
                        <option value='Water'>Water</option>
                    </select>
                </div>

                <div className="dice-info">
                    
                        <select 
                            className='dice-select'
                            name='diceAmt'
                            value={newAction.diceAmt}
                            onChange={changeHandler}>
                            <option value='none'>How many dice?</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>

                        <select 
                            className='mod'
                            name='mod'
                            value={newAction.mod}
                            onChange={changeHandler}>
                            <option value='none' selected>Modifier</option>
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
            
                        <select 
                            className='dice-select'
                            name='dice'
                            value={newAction.dice}
                            onChange={changeHandler}>
                            <option value='none'>Which Dice?</option>
                            <option value={4}>4</option>
                            <option value={6}>6</option>
                            <option value={8}>8</option>
                            <option value={10}>10</option>
                            <option value={12}>12</option>
                        </select>
                </div>
                <button>Add</button>
            </form>
            <button onClick={()=> {
                cancelAdding();
            }}>Cancel</button>   
        </Div>
    );
}

export default ActionForm;
