import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${banner.imageUrl})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 to-brand-navy/60"></div>
            </div>

            <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
                    {t('hero.heading')}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-sans mb-6 md:mb-8 max-w-2xl mx-auto">
                    {t('hero.subtext')}
                </p>
                <button className="bg-brand-rose hover:bg-brand-rose/90 text-white font-sans font-semibold 
                         px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg 
                         transition-all duration-300 hover:scale-105 shadow-lg
                         active:scale-95 min-w-[160px]">
                    {t('hero.cta')}
                </button>
            </div>
        </section>
    );
};

export default HeroBanner;
