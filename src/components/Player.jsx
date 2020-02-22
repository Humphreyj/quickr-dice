import React,{useState} from 'react';
import styled from 'styled-components';
import PlayerActions from './PlayerActions'

const Div = styled.div`

.stats {
    display: flex;
    justify-content: space-evenly;
}

`

const Player = () => {

    const [player, setPlayerStats] = useState({
        playerName: 'Jimothy',
        highDamage: 1,
        critFails: 1,
        criticalHits: 1,
        strengthMod: 3,
        dexMod: 4,
        actions: [
            {
                id:0,
                name: 'Punch',
                type: 'Melee',
                damageType:'Bludgeoning',
                diceAmt: 1,
                dice: 4,
                result: 0,
                damage: 0,
            },
            {
                id: 1,
                name: 'Shortsword',
                type: 'Melee',
                damageType: 'Slashing',
                diceAmt: 1,
                dice: 6,
                result: 0,
                damage: 0,
            },
            {
                id:2,
                name: 'ShortBow',
                type: 'Ranged',
                damageType: 'Piercing',
                diceAmt: 1,
                dice: 6,
                result: 0,
                damage: 0,
            }
        ]
    })
    return (
        <Div>
            <h1>{player.playerName}</h1>
            <div className="stats">
                <h3>High Damage: {player.highDamage}</h3>
                <h3>Crit Fails: {player.critFails}</h3>
                <h3>Critical Hits: {player.criticalHits}</h3>
            </div>
            <PlayerActions
            player={player}
            setPlayerStats={setPlayerStats}
            actions={player.actions} />
        

        </Div>
    );
}

export default Player;
