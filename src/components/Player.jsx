import React,{useState} from 'react';
import styled from 'styled-components';
import PlayerActions from './PlayerActions'

const Div = styled.div`
.player-name {
    font-family: 'Fjalla One', sans-serif ;
    text-shadow: 2px 2px 2px #666;
}
.stats {
    display: flex;
    justify-content: space-evenly;
    font-family: 'Roboto',serif ;
    text-shadow: 2px 1px 1px #777;

    
}

`

const Player = () => {

    const [player, setPlayerStats] = useState({
        playerName: 'Jimothy',
        highDamage: 0,
        critFails: 0,
        criticalHits: 0,
        actions: [
            {
                id:0,
                name: 'Punch',
                type: 'Melee',
                damageType:'Bludgeoning',
                diceAmt: 1,
                dice: 4,
                mod: 3,
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
                mod: 3,
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
                mod: 4,
                result: 0,
                damage: 0,
            }
        ]
    })
    return (
        <Div>
            <h1 className='player-name'>{player.playerName}</h1>
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
