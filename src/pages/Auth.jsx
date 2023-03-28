import Login from '../components/Login/Login';
import '../styles/pages.css';

export default function Auth() {
    return (
        <section className="auth">
            <div className="container">
                <Login />
            </div>
        </section>
    );
}
