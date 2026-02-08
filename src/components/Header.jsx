import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t, i18n } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-brand-grey shadow-sm">
            <div className="container mx-auto px-4 py-3 md:py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="text-xl md:text-2xl font-serif font-bold text-brand-navy">
                        {t('header.logo')}
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        <a
                            href="#home"
                            className="text-sm lg:text-base text-brand-navy hover:text-brand-rose transition-colors"
                        >
                            {t('header.nav.home')}
                        </a>
                        <a
                            href="#themes"
                            className="text-sm lg:text-base text-brand-navy hover:text-brand-rose transition-colors"
                        >
                            {t('header.nav.themes')}
                        </a>
                        <a
                            href="#contact"
                            className="text-sm lg:text-base text-brand-navy hover:text-brand-rose transition-colors"
                        >
                            {t('header.nav.contact')}
                        </a>
                        <a
                            href="#help"
                            className="text-sm lg:text-base text-brand-navy hover:text-brand-rose transition-colors"
                        >
                            {t('header.nav.help')}
                        </a>

                        {/* Language Switcher - Desktop */}
                        <div className="flex items-center space-x-2 ml-4">
                            <button
                                onClick={() => changeLanguage('en')}
                                className={`px-3 py-1 rounded text-sm transition-colors ${i18n.language === 'en'
                                        ? 'bg-brand-rose text-white'
                                        : 'bg-gray-100 text-brand-navy hover:bg-gray-200'
                                    }`}
                            >
                                EN
                            </button>
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 text-brand-navy hover:text-brand-rose transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            // Close Icon
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            // Hamburger Icon
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                {mobileMenuOpen && (
                    <nav className="md:hidden mt-4 pb-4 border-t border-brand-grey pt-4">
                        <div className="flex flex-col space-y-4">
                            <a
                                href="#home"
                                onClick={closeMobileMenu}
                                className="text-brand-navy hover:text-brand-rose transition-colors py-2"
                            >
                                {t('header.nav.home')}
                            </a>
                            <a
                                href="#themes"
                                onClick={closeMobileMenu}
                                className="text-brand-navy hover:text-brand-rose transition-colors py-2"
                            >
                                {t('header.nav.themes')}
                            </a>
                            <a
                                href="#contact"
                                onClick={closeMobileMenu}
                                className="text-brand-navy hover:text-brand-rose transition-colors py-2"
                            >
                                {t('header.nav.contact')}
                            </a>
                            <a
                                href="#help"
                                onClick={closeMobileMenu}
                                className="text-brand-navy hover:text-brand-rose transition-colors py-2"
                            >
                                {t('header.nav.help')}
                            </a>

                            {/* Language Switcher - Mobile */}
                            <div className="flex items-center space-x-2 pt-2 border-t border-brand-grey">
                                <span className="text-sm text-gray-600">{t('header.language')}:</span>
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={`px-3 py-1 rounded text-sm transition-colors ${i18n.language === 'en'
                                            ? 'bg-brand-rose text-white'
                                            : 'bg-gray-100 text-brand-navy'
                                        }`}
                                >
                                    EN
                                </button>
                            </div>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
