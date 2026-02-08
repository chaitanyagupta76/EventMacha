import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
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
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-brand-grey dark:border-gray-700 shadow-sm transition-colors duration-300">
            <div className="container mx-auto px-4 py-3 md:py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="text-xl md:text-2xl font-serif font-bold text-brand-navy dark:text-white">
                        {t('header.logo')}
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        <a
                            href="#home"
                            className="text-sm lg:text-base text-brand-navy dark:text-gray-200 hover:text-brand-rose dark:hover:text-brand-pink transition-colors"
                        >
                            {t('header.nav.home')}
                        </a>
                        <a
                            href="#themes"
                            className="text-sm lg:text-base text-brand-navy dark:text-gray-200 hover:text-brand-rose dark:hover:text-brand-pink transition-colors"
                        >
                            {t('header.nav.themes')}
                        </a>
                        <a
                            href="#contact"
                            className="text-sm lg:text-base text-brand-navy dark:text-gray-200 hover:text-brand-rose dark:hover:text-brand-pink transition-colors"
                        >
                            {t('header.nav.contact')}
                        </a>
                        <a
                            href="#help"
                            className="text-sm lg:text-base text-brand-navy dark:text-gray-200 hover:text-brand-rose dark:hover:text-brand-pink transition-colors"
                        >
                            {t('header.nav.help')}
                        </a>

                        {/* Theme Toggle - Desktop */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                // Moon icon for dark mode
                                <svg className="w-5 h-5 text-brand-navy dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            ) : (
                                // Sun icon for light mode
                                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            )}
                        </button>

                        {/* Language Switcher - Desktop */}
                        <div className="flex items-center space-x-2 ml-4">
                            <button
                                onClick={() => changeLanguage('en')}
                                className={`px-3 py-1 rounded text-sm transition-colors ${i18n.language === 'en'
                                        ? 'bg-brand-rose text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-brand-navy dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                EN
                            </button>
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 text-brand-navy dark:text-gray-200 hover:text-brand-rose dark:hover:text-brand-pink transition-colors"
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
                    <nav className="md:hidden mt-4 pb-4 border-t border-brand-grey dark:border-gray-700 pt-4">
                        <div className="flex flex-col space-y-4">
                            <a
                                href="#home"
                                onClick={closeMobileMenu}
                                className="text-brand-navy dark:text-gray-200 hover:text-brand-rose dark:hover:text-brand-pink transition-colors py-2"
                            >
                                {t('header.nav.home')}
                            </a>
                            <a
                                href="#themes"
                                onClick={closeMobileMenu}
                                className="text-brand-navy dark:text-gray-200 hover:text-brand-rose dark:hover:text-brand-pink transition-colors py-2"
                            >
                                {t('header.nav.themes')}
                            </a>
                            <a
                                href="#contact"
                                onClick={closeMobileMenu}
                                className="text-brand-navy dark:text-gray-200 hover:text-brand-rose dark:hover:text-brand-pink transition-colors py-2"
                            >
                                {t('header.nav.contact')}
                            </a>
                            <a
                                href="#help"
                                onClick={closeMobileMenu}
                                className="text-brand-navy dark:text-gray-200 hover:text-brand-rose dark:hover:text-brand-pink transition-colors py-2"
                            >
                                {t('header.nav.help')}
                            </a>

                            {/* Theme Toggle - Mobile */}
                            <div className="flex items-center justify-between pt-2 border-t border-brand-grey dark:border-gray-700">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Theme:</span>
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    aria-label="Toggle theme"
                                >
                                    {theme === 'light' ? (
                                        <svg className="w-5 h-5 text-brand-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {/* Language Switcher - Mobile */}
                            <div className="flex items-center space-x-2 pt-2 border-t border-brand-grey dark:border-gray-700">
                                <span className="text-sm text-gray-600 dark:text-gray-400">{t('header.language')}:</span>
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={`px-3 py-1 rounded text-sm transition-colors ${i18n.language === 'en'
                                            ? 'bg-brand-rose text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-brand-navy dark:text-gray-200'
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
