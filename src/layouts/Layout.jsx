import { observer } from 'mobx-react-lite';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import Header from '../components/Header';
import { contextRoot } from '../context/contextRoot';

function Layout() {
    const {
        user,
        user: { isAuth }
    } = useContext(contextRoot);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) navigate('/home');
        if (!isAuth) navigate('/');
    }, [isAuth]);

    const logout = () => {
        user.setAuthStatus(false);
    };

    return (
        <div className="layout">
            <Header logout={logout} />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default observer(Layout);
