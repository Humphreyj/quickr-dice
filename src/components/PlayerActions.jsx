import React from 'react';
import Action from './Action';
import ActionForm from './ActionForm';
import styled from 'styled-components';

const Div = styled.div`
display: flex;
flex-direction: column;
width: 80%;
margin: 0 auto;

`

const PlayerActions = (props) => {
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
                    player={props.player}
                    setPlayerStats={props.setPlayerStats}
                    result={action.result}
                    damage={action.damage}
                     />
                )
            })}
            <ActionForm
            actions={props.actions}
            player={props.player}
            setPlayerStats={props.setPlayerStats} />
        </Div>
    );
}

export default PlayerActions;
