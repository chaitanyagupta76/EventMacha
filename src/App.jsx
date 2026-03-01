import './i18n/i18n';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroBanner from './sections/HeroBanner';
import CategorySection from './sections/CategorySection';
import TrendingSection from './sections/TrendingSection';
import PricingSection from './sections/PricingSection';
import ContactSection from './sections/ContactSection';
import SearchTemplatesPage from './pages/SearchTemplatesPage';

function HomePage() {
    return (
        <>
            <HeroBanner />
            <CategorySection />
            <TrendingSection />
            <PricingSection />
            <ContactSection />
        </>
    );
}

function App() {
    return (
        <ThemeProvider>
            <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/templates" element={<SearchTemplatesPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;
