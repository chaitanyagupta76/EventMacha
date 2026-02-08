import './i18n/i18n';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroBanner from './sections/HeroBanner';
import CategorySection from './sections/CategorySection';
import TrendingSection from './sections/TrendingSection';

function App() {
    return (
        <ThemeProvider>
            <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
                <Header />
                <main className="flex-grow">
                    <HeroBanner />
                    <CategorySection />
                    <TrendingSection />
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;
