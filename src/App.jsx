import './i18n/i18n';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroBanner from './sections/HeroBanner';
import CategorySection from './sections/CategorySection';
import TrendingSection from './sections/TrendingSection';

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <HeroBanner />
                <CategorySection />
                <TrendingSection />
            </main>
            <Footer />
        </div>
    );
}

export default App;
