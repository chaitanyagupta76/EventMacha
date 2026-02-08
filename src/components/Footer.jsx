import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-brand-navy text-white py-8 md:py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
                    <div className="text-xl md:text-2xl font-serif font-bold mb-2 md:mb-0">
                        {t('header.logo')}
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        <a
                            href="#contact"
                            className="hover:text-brand-pink transition-colors text-sm md:text-base"
                        >
                            {t('footer.contact')}
                        </a>
                        <a
                            href="#help"
                            className="hover:text-brand-pink transition-colors text-sm md:text-base"
                        >
                            {t('footer.help')}
                        </a>
                        <a
                            href="#privacy"
                            className="hover:text-brand-pink transition-colors text-sm md:text-base"
                        >
                            {t('footer.privacy')}
                        </a>
                    </div>
                </div>

                <div className="border-t border-brand-grey pt-4 md:pt-6 text-center text-xs md:text-sm">
                    <p>{t('footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
