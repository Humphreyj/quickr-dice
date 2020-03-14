import React,{ useState } from 'react';
import Action from './Action';
import ActionForm from './ActionForm';
import styled from 'styled-components';

const Div = styled.div`
display: flex;
flex-direction: column;

button {
    font-size: 1.1em;
    width: 50%;
    height: 1.5em;
    margin: .5em auto;
    text-align: center;
    background-color: #111;
    color: white;
    transition: all 0.1s ease;
    
    &:active {
        background-color: #888;
        color: #111;;
    }
}

`

const PlayerActions = (props) => {

    const [addingAction, setAddingAction] = useState(false)
    return (
        <Div>
            {props.actions.map(action => {
                return(
                    <Action
                    name={action.name}
                    type={action.type}
                    damageType={action.damageType}
                    diceAmt={action.diceAmt}
                    dice={action.dice}
                    mod={action.mod}
                    player={props.player}
                    setPlayerStats={props.setPlayerStats}
                    result={action.result}
                    damage={action.damage}
                     />
                )
            })}
            
            <button onClick={()=> {
                setAddingAction(true);
            }}>Add a new Action</button>   
            {addingAction ?  <ActionForm
            actions={props.actions}
            addingAction={addingAction}
            setAddingAction={setAddingAction}
            player={props.player}
            setPlayerStats={props.setPlayerStats} /> : null}
            
        </Div>
    );
}

export default PlayerActions;
