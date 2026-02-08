import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { staggerContainer, cardVariant, viewportConfig } from '../utils/animations';

// Import all language-specific data
import categoriesEn from '../data/categories.json';
import categoriesTe from '../data/categories.te.json';
import categoriesHi from '../data/categories.hi.json';
import categoriesTa from '../data/categories.ta.json';
import categoriesKn from '../data/categories.kn.json';

const categoryData = {
    en: categoriesEn,
    te: categoriesTe,
    hi: categoriesHi,
    ta: categoriesTa,
    kn: categoriesKn,
};

const CategorySection = () => {
    const { t, i18n } = useTranslation();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Load data based on current language, fallback to English if not available
        const currentLang = i18n.language;
        const data = categoryData[currentLang] || categoryData.en;
        setCategories(data);
    }, [i18n.language]); // Re-load when language changes

    return (
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-brand-cream via-brand-lotus/20 to-brand-cream dark:bg-gray-800 transition-colors duration-300">
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
                        {t('categories.title')}
                    </h2>
                    {/* Decorative Underline */}
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100px" }}
                        viewport={viewportConfig}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-1 bg-gradient-to-r from-brand-saffron via-brand-gold to-brand-turmeric mx-auto rounded-full"
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
                    {categories.map((category) => (
                        <motion.div key={category.id} variants={cardVariant}>
                            <Card
                                imageUrl={category.imageUrl}
                                title={category.name}
                                description={category.description}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CategorySection;
