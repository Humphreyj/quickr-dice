import React,{ useState } from 'react';
import styled from 'styled-components';

const Div =  styled.div`

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

`

const ActionForm = (props) => {

    const [newAction, setNewAction] = useState({
        id: props.actions.length +1,
        name: '',
        type: '',
        damageType:'',
        diceAmt: 0,
        dice: 0,
        damage: 0,
        
    })

    const changeHandler = e => {
        console.log(newAction)
        setNewAction({...newAction,[e.target.name] : e.target.value})
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
        diceAmt: 1,
        dice: 0,
        damage: 0,
        });
    }
    return (
        <Div>
            <form onSubmit={submitHandler}>
                <h4>Add a new Action</h4>

                <input type="text"
                name='name'
                value={newAction.name}
                placeholder='Name of Action'
                onChange={changeHandler}/>

                
                <select 
                name='type'
                value={newAction.type}
                onChange={changeHandler}>
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
                    <option value='Bludgeoning'>Bludgeoning</option>
                    <option value='Cold'>Cold</option>
                    <option value='Fire'>Fire</option>
                    <option value='Force'>Force</option>
                    <option value='Lightning'>Lightning</option>
                    <option value='Piercing'>Piercing</option>
                    <option value='Slashing'>Slashing</option>
                    <option value='Water'>Water</option>
                </select>

                <div className="dice-info">
                    <div>
                       
                        <select 
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
                    </div>
                    <div>
                        <select 
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

                    
                    
                    
                </div>
                

                <button>Add</button>

                

            </form>
            
        </Div>
    );
}

export default ActionForm;
