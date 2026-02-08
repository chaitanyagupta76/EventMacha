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
        <section id="home" className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${banner.imageUrl})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 to-brand-navy/60"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl">
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
                    {t('hero.heading')}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-sans mb-8">
                    {t('hero.subtext')}
                </p>
                <button className="bg-brand-rose hover:bg-brand-rose/90 text-white font-sans font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105 shadow-lg">
                    {t('hero.cta')}
                </button>
            </div>
        </section>
    );
};

export default HeroBanner;
