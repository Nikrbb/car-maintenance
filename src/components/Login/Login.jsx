import TextInput from '@avtopro/text-input/dist/index';
import Button from '@avtopro/button/dist/index';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    };

    return (
        <div className="login">
            <h1 className="login__title">Please login</h1>
            <div className="d-flex align-center">
                <TextInput placeholder="email" blockSize="sm" />
                <Button onClick={handleClick} blockSize="sm" theme="light-blue">
                    login
                </Button>
            </div>
        </div>
    );
}
