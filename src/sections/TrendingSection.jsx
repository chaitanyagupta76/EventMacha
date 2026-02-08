import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';
import trendingData from '../data/trending.json';

const TrendingSection = () => {
    const { t } = useTranslation();
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        setThemes(trendingData);
    }, []);

    return (
        <section id="themes" className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-navy dark:text-white text-center mb-8 md:mb-12">
                    {t('trending.title')}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {themes.map((theme) => (
                        <Card
                            key={theme.id}
                            imageUrl={theme.imageUrl}
                            title={theme.name}
                            badge={theme.category}
                            isPopular={theme.isPopular}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingSection;
