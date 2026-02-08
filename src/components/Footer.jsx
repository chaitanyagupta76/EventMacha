import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-brand-navy text-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="text-2xl font-serif font-bold mb-4 md:mb-0">
                        {t('header.logo')}
                    </div>

                    <div className="flex space-x-8">
                        <a href="#contact" className="hover:text-brand-pink transition-colors">
                            {t('footer.contact')}
                        </a>
                        <a href="#help" className="hover:text-brand-pink transition-colors">
                            {t('footer.help')}
                        </a>
                        <a href="#privacy" className="hover:text-brand-pink transition-colors">
                            {t('footer.privacy')}
                        </a>
                    </div>
                </div>

                <div className="border-t border-brand-grey pt-6 text-center text-sm">
                    <p>{t('footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
