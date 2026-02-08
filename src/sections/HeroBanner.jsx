import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import bannerData from '../data/banner.json';

const HeroBanner = () => {
    const { t } = useTranslation();
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        setBanner(bannerData);
    }, []);

    if (!banner) return null;

    return (
        <section
            id="home"
            className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden"
        >
            {/* Background Image with Parallax Effect */}
            <motion.div
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <img
                    src={banner.imageUrl}
                    alt={banner.heading}
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Gradient Overlay with Indian Colors */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-maroon/80 via-brand-royal/70 to-brand-emerald/60 z-10"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg"
                >
                    {t('hero.heading')}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 font-sans mb-6 md:mb-8 max-w-2xl mx-auto drop-shadow-md"
                >
                    {t('hero.subtext')}
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 107, 53, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-brand-saffron hover:bg-brand-turmeric text-white font-sans font-bold
                     px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg
                     transition-all duration-300 shadow-xl
                     min-w-[160px] border-2 border-brand-gold"
                >
                    {t('hero.cta')}
                </motion.button>

                {/* Decorative Elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
                >
                    <div className="w-20 h-1 bg-brand-gold rounded-full"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroBanner;
