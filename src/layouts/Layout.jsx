import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '@avtopro/button/dist/index';
import './index.css';

export default function Layout() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if (!localStorage.getItem('token')) navigate('/');
        else navigate('/home');
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="layout">
            <header className="headerx">
                <div className="container d-flex">
                    <h2 className="header__title m-0">Car Maintenance</h2>
                    {pathname !== '/' ? (
                        <Button
                            onClick={() => logout()}
                            className="ml-auto"
                            blockSize="sm"
                        >
                            Logout
                        </Button>
                    ) : null}
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
