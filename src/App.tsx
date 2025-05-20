import React, {ChangeEvent, useState} from 'react';
import './App.css';
import axios from "axios";

function App() {
    const [value, setValue] = useState('nothing')
    const [title, setTitle] = useState('')

    const creatTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const handleOnClick = () => {
        axios.post('http://localhost:3010', {value,title})
            .then(res => {
                console.log(res.data)
                setValue(res.data);
            })
            .catch(error => {
                console.log(error.message)
                setValue(error.message);
            })
        setTitle('')
    }

    return (
        <div className="App">
            <input

                onChange={creatTitle}
                value={title}/>
            <div> ВВЕДИ ТЕКСТ</div>

            <button
                onClick={handleOnClick}
            > ЗАПРОС НА БЭК
            </button>
            <div>{value}</div>
        </div>

    );
}

export default App;
