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

.error {
    text-align: center;
    font-size: 2em;
}

`

const PlayerActions = (props) => {

    const [addingAction, setAddingAction] = useState(false)
    const [actions, setActions] = useState()
    useEffect(() => {
        
            const id = localStorage.getItem('user_id')
            axiosWithAuth()
                .get(`https://quick-dice.herokuapp.com/api/users/${id}/actions`)
                .then(res => {
                    console.log(res)
                    setActions(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        
    }, [])

    const deleteAction = (props) => {
        axiosWithAuth().delete(`https://quick-dice.herokuapp.com/api/actions/${props}`)
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
        setActions({...actions.filter(item => item.id !== props)})
        
    }
    return (
        <Div>
            { actions && actions.length > 0 ? actions.map(action => {
                return(
                    <Action
                    id={action.id}
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
                    deleteAction={deleteAction}
                     />
                )
            }) : <h5 className = 'error'>You have no actions, add one below!</h5> }
            
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
