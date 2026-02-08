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
        <section id="themes" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy text-center mb-12">
                    {t('trending.title')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
