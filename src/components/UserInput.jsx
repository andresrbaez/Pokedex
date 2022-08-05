import React, { useState } from 'react';
import { changeUser } from '../store/slices/user.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import characterImg from '../images/trainerImg.png'

const UserInput = () => {

    const [ userName, setUserName ] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = e => {
        e.preventDefault();
        setUserName("");
        dispatch(changeUser(userName))
        navigate("/pokedex")
    }


    return (
        <div className="App">
            <div className="pokeball-background"></div>
            <div className='container'>
                <div className="banner">
                    <h1>Hello trainer!</h1>
                    {/* <img src="https://www.seekpng.com/png/full/201-2011786_red-by-xous-54-red-pokemon-trainer-png.png" alt="" /> */}
                    <img src={characterImg} alt="" />
                </div>
                <p className='title-input'>Give me your name to start</p>
                <form onSubmit={submit} className='form'>
                    <input 
                    type="text" 
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    />
                    <button><i className='bx bxl-telegram'></i></button>
                </form>
            </div>
        </div>
    );
};

export default UserInput;