import Controls from '../components/Controls';
import Cards from '../components/Cards';

export default function Home() {
    return (
        <section className="home">
            <div className="container">
                <Controls />
                <Cards />
            </div>
        </section>
    );
}
