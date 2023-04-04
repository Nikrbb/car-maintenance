import { observer } from 'mobx-react-lite';
import { useContext, useRef, useState } from 'react';
import './index.css';
import TextInput from '@avtopro/text-input/dist/index';
import Button from '@avtopro/button/dist/index';
import PasswordInput from '@avtopro/password-input/dist/index';
import RobotPreloader from '@avtopro/preloader/dist/index';
import classNames from 'classnames';
import { contextRoot } from '../../context/contextRoot';

const Login = observer(() => {
    const [loginStatus, setLoginStatus] = useState('logIn');
    const email = useRef(null);
    const authForm = useRef(null);
    const {
        user,
        user: { pending }
    } = useContext(contextRoot);

    const handleClick = async (e) => {
        e.preventDefault();
        const formData = new FormData(authForm.current);

        if (loginStatus === 'signIn') {
            await user.register({
                email: formData.get('email'),
                password: formData.get('password')
            });
        }
        if (loginStatus === 'logIn') {
            await user.login({
                email: formData.get('email'),
                password: formData.get('password')
            });
        }
    };

    const changeAuthStatus = (status) => {
        setLoginStatus(status);
    };

    return (
        <div className="login">
            <div className="login__header">
                <button
                    className={classNames(
                        'login__select-btn',
                        loginStatus === 'signIn'
                            ? 'login__select-btn--selected'
                            : null
                    )}
                    type="button"
                    onClick={() => changeAuthStatus('signIn')}
                >
                    Registration
                </button>
                <button
                    className={classNames(
                        'login__select-btn',
                        'border-left',
                        loginStatus === 'logIn'
                            ? 'login__select-btn--selected'
                            : null
                    )}
                    type="button"
                    onClick={() => changeAuthStatus('logIn')}
                >
                    Login
                </button>
            </div>

            <form ref={authForm} className="login__form" onSubmit={handleClick}>
                <TextInput name="email" ref={email} placeholder="login" />
                <PasswordInput name="password" placeholder="password" />
                {loginStatus === 'signIn' ? (
                    <PasswordInput
                        name="confirm"
                        placeholder="confirm password"
                    />
                ) : null}
                <Button blockSize="sm" theme="light-blue">
                    {loginStatus === 'signIn' ? 'Sign in' : 'Log in'}
                </Button>
            </form>
            {pending ? <RobotPreloader fixed /> : null}
        </div>
    );
});

export default Login;
