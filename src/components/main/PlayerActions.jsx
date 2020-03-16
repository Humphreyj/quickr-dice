import React,{ useState, useEffect } from 'react';
import Action from './Action';
import ActionForm from './ActionForm';
import { axiosWithAuth } from '../clientAuth/auth';
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
    const [actions, setActions] = useState()
    useEffect(() => {
        
            const id = localStorage.getItem('user_id')
            axiosWithAuth()
                .get(`http://localhost:3030/api/users/${id}/actions`)
                .then(res => {
                    console.log(res)
                    setActions(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        
    }, [])
    return (
        <Div>
            { actions && actions.length > 0 ? actions.map(action => {
                return(
                    <Action
                    name={action.action_name}
                    type={action.action_type}
                    damageType={action.dmg_type}
                    diceAmt={action.dice_amt}
                    dice={action.dice}
                    toHit={action.to_hit_mod}
                    dmg_mod={action.dmg_mod}
                    player={props.player}
                    setPlayerStats={props.setPlayerStats}
                    result={action.result}
                    damage={action.damage}
                     />
                )
            }) : <h5>You have no actions!</h5> }
            
            <button onClick={()=> {
                setAddingAction(true);
            }}>Add a new Action</button>   
            {addingAction ?  <ActionForm
            actions={actions}
            addingAction={addingAction}
            setAddingAction={setAddingAction}
            player={props.player}
            setActions={setActions} /> : null}
            
        </Div>
    );
}

export default PlayerActions;
