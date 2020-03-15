import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import PlayerActions from './PlayerActions';
import {axiosWithAuth} from '../clientAuth/auth'
import { useSpring, animated } from 'react-spring';

const Div = styled.div`
.player-name {
    font-family: 'Fjalla One', sans-serif ;
    text-shadow: 2px 1px 1px #777;
    font-size: 1.4em;
}
.stats {
    display: flex;
    justify-content: space-evenly;
    font-family: 'Roboto',serif ;
    text-shadow: 1px 1px 1px #777;
    font-size: .9em;

    
}

.logout-button {
    display: flex;
    justify-content: center;
    align-items: center;
}

`

const Player = () => {

    const [player, setPlayerStats] = useState({
        playerName: 'Double click to edit Name!',
        highDamage: 0,
        critFails: 0,
        criticalHits: 0,
        actions: [
            {
                id:0,
                name: 'Greatsword',
                type: 'Melee',
                damageType:'Slashing',
                diceAmt: 2,
                dice: 6,
                mod: 3,
                result: 0,
                damage: 0,
            },
           
        ]
    })

    

    useEffect(() => {
        const id = localStorage.getItem('user_id')
        axiosWithAuth()
            .get(`http://localhost:3030/api/users/${id}`)
            .then(res => {
                console.log(res)
                setPlayerStats({...player,playerName: res.data.char_name})
                
            })
            .catch(err => {
                console.log(err)
            })
           
    },[])
    const [editing, setEditing] = useState(false);

    const changeHandler = e => {
        setPlayerStats({...player,[e.target.name]: e.target.value})
    }

    const handleLogout = (e) => {
        localStorage.clear()
        axiosWithAuth().get('http://localhost:3030/api/auth/logout')
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
        window.location.reload();
    }

    const green = useSpring({
        to: [{color: 'green'}, { color: 'black'}],
        from: {color: 'black'},
        config: {
            duration: 1000,
        }
      })

      
    
    return (
        <Div>
            {editing? <div>
                <input 
            type="text"
            name='playerName'
            value={player.playerName}
            onChange={(e) => changeHandler(e)}/>
            <button onClick={()=> {
                setEditing(false);
            }}>Save</button>
            </div> :
             <h1  
            className='player-name'
            onDoubleClick={() => {
                setEditing(true);
            }}
            >{player.playerName}</h1>} 
            
            <div className="stats">
                <animated.h3 style={green}>High Damage: {player.highDamage}</animated.h3>
                <h3>Crit Fails: {player.critFails}</h3>
                <h3>Critical Hits: {player.criticalHits}</h3>
            </div>
            <PlayerActions
            player={player}
            setPlayerStats={setPlayerStats}
            actions={player.actions} />

            <div className="logout-button">
                <button onClick={handleLogout}>Logout</button>
            </div>
        

        </Div>
    );
}

export default Player;
