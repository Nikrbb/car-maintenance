import { useLocation } from 'react-router-dom';
import Button from '@avtopro/button/dist/index';

// eslint-disable-next-line react/prop-types
function Header({ logout }) {
    const { pathname } = useLocation();
    return (
        <header className="header">
            <div className="container d-flex">
                <h2 className="header__title m-0">Car Maintenance</h2>
                {pathname !== '/' ? (
                    <Button
                        onClick={() => logout()}
                        className="ml-auto"
                        blockSize="sm"
                    >
                        Exit
                    </Button>
                ) : null}
            </div>
        </header>
    );
}
export default Header;
