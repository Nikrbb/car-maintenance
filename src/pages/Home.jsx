import Header from '../components/Header/Header';
import CardsTemplate from '../components/CardsSection/CardsTemplate';

export default function Home() {
    return (
        <section className="home">
            <div className="container">
                <Header />
                <CardsTemplate />
            </div>
        </section>
    );
}
