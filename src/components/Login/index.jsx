import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import './index.css';
import TextInput from '@avtopro/text-input/dist/index';
import Button from '@avtopro/button/dist/index';

const Login = observer(() => {
    const navigate = useNavigate();
    const email = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.setItem('token', email.current.value);
        navigate('/home');
    };

    return (
        <div className="login">
            <h1 className="login__title">Please login</h1>
            <form onSubmit={handleClick} className="d-flex align-center">
                <TextInput ref={email} placeholder="email" blockSize="sm" />
                <Button blockSize="sm" theme="light-blue">
                    login
                </Button>
            </form>
        </div>
    );
});

export default Login;
