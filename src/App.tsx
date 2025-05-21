import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

declare global {
    interface Window {
        grecaptcha: any;
    }
}

function App() {
    const [value, setValue] = useState('nothing')
    const [title, setTitle] = useState('')


    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.google.com/recaptcha/api.js?render=6LcIaUMrAAAAACLiH5fja6dupHb3pF3mMh_UqmqE";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const creatTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)


    }


    const handleOnClick = () => {
        if (window.grecaptcha) {
            window.grecaptcha.execute('6LcIaUMrAAAAACLiH5fja6dupHb3pF3mMh_UqmqE', {action: 'submit'})
                .then((token: any) => {
                    console.log('token', token)
                    axios.post('http://localhost:3010', {value, title, token})
                        .then(res => {
                            console.log(res.data)
                            setValue(res.data);
                        })
                        .catch(error => {
                            console.log(error.message)
                            setValue(error.message);
                        })
                    setTitle('')
                })

        }


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
