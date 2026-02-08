import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-brand-grey shadow-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="text-2xl font-serif font-bold text-brand-navy">
                    {t('header.logo')}
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    <a href="#home" className="text-brand-navy hover:text-brand-rose transition-colors">
                        {t('header.nav.home')}
                    </a>
                    <a href="#themes" className="text-brand-navy hover:text-brand-rose transition-colors">
                        {t('header.nav.themes')}
                    </a>
                    <a href="#contact" className="text-brand-navy hover:text-brand-rose transition-colors">
                        {t('header.nav.contact')}
                    </a>
                    <a href="#help" className="text-brand-navy hover:text-brand-rose transition-colors">
                        {t('header.nav.help')}
                    </a>

                    <div className="flex items-center space-x-2 ml-4">
                        <button
                            onClick={() => changeLanguage('en')}
                            className={`px-3 py-1 rounded ${i18n.language === 'en'
                                    ? 'bg-brand-rose text-white'
                                    : 'bg-gray-100 text-brand-navy'
                                }`}
                        >
                            EN
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
