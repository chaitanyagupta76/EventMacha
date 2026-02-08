import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import trendingData from '../data/trending.json';
import { staggerContainer, cardVariant, viewportConfig } from '../utils/animations';

const TrendingSection = () => {
    const { t } = useTranslation();
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        setThemes(trendingData);
    }, []);

    return (
        <section id="themes" className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                {/* Animated Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportConfig}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 md:mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-maroon dark:text-white mb-3">
                        {t('trending.title')}
                    </h2>
                    {/* Decorative Underline */}
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100px" }}
                        viewport={viewportConfig}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-1 bg-gradient-to-r from-brand-peacock via-brand-emerald to-brand-royal mx-auto rounded-full"
                    ></motion.div>
                </motion.div>

                {/* Staggered Grid Animation */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={viewportConfig}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {themes.map((theme) => (
                        <motion.div key={theme.id} variants={cardVariant}>
                            <Card
                                imageUrl={theme.imageUrl}
                                title={theme.name}
                                badge={theme.category}
                                isPopular={theme.isPopular}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TrendingSection;
