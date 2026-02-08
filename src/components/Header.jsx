import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Header = () => {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

    const languages = [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
        { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
        { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
        { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setLanguageMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const getCurrentLanguage = () => {
        return languages.find(lang => lang.code === i18n.language) || languages[0];
    };

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b-2 border-brand-gold dark:border-brand-turmeric shadow-md transition-colors duration-300"
        >
            <div className="container mx-auto px-4 py-3 md:py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-xl md:text-2xl font-serif font-bold text-brand-maroon dark:text-brand-gold"
                    >
                        {t('header.logo')}
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        <motion.a
                            whileHover={{ scale: 1.1, color: '#FF6B35' }}
                            href="#home"
                            className="text-sm lg:text-base text-brand-maroon dark:text-gray-200 hover:text-brand-saffron dark:hover:text-brand-gold transition-colors font-medium"
                        >
                            {t('header.nav.home')}
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.1, color: '#FF6B35' }}
                            href="#themes"
                            className="text-sm lg:text-base text-brand-maroon dark:text-gray-200 hover:text-brand-saffron dark:hover:text-brand-gold transition-colors font-medium"
                        >
                            {t('header.nav.themes')}
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.1, color: '#FF6B35' }}
                            href="#contact"
                            className="text-sm lg:text-base text-brand-maroon dark:text-gray-200 hover:text-brand-saffron dark:hover:text-brand-gold transition-colors font-medium"
                        >
                            {t('header.nav.contact')}
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.1, color: '#FF6B35' }}
                            href="#help"
                            className="text-sm lg:text-base text-brand-maroon dark:text-gray-200 hover:text-brand-saffron dark:hover:text-brand-gold transition-colors font-medium"
                        >
                            {t('header.nav.help')}
                        </motion.a>

                        {/* Theme Toggle - Desktop */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 15 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-brand-cream dark:bg-gray-700 hover:bg-brand-gold/30 dark:hover:bg-gray-600 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <svg className="w-5 h-5 text-brand-maroon dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            )}
                        </motion.button>

                        {/* Language Switcher - Desktop */}
                        <div className="relative ml-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                                className="px-3 py-2 rounded-lg bg-brand-saffron text-white font-semibold text-sm shadow-md hover:bg-brand-turmeric transition-colors flex items-center gap-2"
                            >
                                <span>{getCurrentLanguage().nativeName}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </motion.button>

                            {/* Language Dropdown */}
                            {languageMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-2 border-brand-gold overflow-hidden"
                                >
                                    {languages.map((lang) => (
                                        <motion.button
                                            key={lang.code}
                                            whileHover={{ backgroundColor: '#FEF3C7' }}
                                            onClick={() => changeLanguage(lang.code)}
                                            className={`w-full text-left px-4 py-3 transition-colors ${i18n.language === lang.code
                                                    ? 'bg-brand-saffron text-white font-bold'
                                                    : 'text-brand-maroon dark:text-gray-200 hover:bg-brand-cream dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{lang.nativeName}</span>
                                                {i18n.language === lang.code && (
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 text-brand-maroon dark:text-gray-200 hover:text-brand-saffron dark:hover:text-brand-gold transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </motion.button>
                </div>

                {/* Mobile Navigation Menu */}
                {mobileMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 pb-4 border-t-2 border-brand-gold dark:border-gray-700 pt-4"
                    >
                        <div className="flex flex-col space-y-4">
                            <a
                                href="#home"
                                onClick={closeMobileMenu}
                                className="text-brand-maroon dark:text-gray-200 hover:text-brand-saffron dark:hover:text-brand-gold transition-colors py-2 font-medium"
                            >
                                {t('header.nav.home')}
                            </a>
                            <a
                                href="#themes"
                                onClick={closeMobileMenu}
                                className="text-brand-maroon dark:text-gray-200 hover:text-brand-saffron dark:hover:text-brand-gold transition-colors py-2 font-medium"
                            >
                                {t('header.nav.themes')}
                            </a>
                            <a
                                href="#contact"
                                onClick={closeMobileMenu}
                                className="text-brand-maroon dark:text-gray-200 hover:text-brand-saffron dark:hover:text-brand-gold transition-colors py-2 font-medium"
                            >
                                {t('header.nav.contact')}
                            </a>
                            <a
                                href="#help"
                                onClick={closeMobileMenu}
                                className="text-brand-maroon dark:text-gray-200 hover:text-brand-saffron dark:hover:text-brand-gold transition-colors py-2 font-medium"
                            >
                                {t('header.nav.help')}
                            </a>

                            {/* Theme Toggle - Mobile */}
                            <div className="flex items-center justify-between pt-2 border-t border-brand-gold dark:border-gray-700">
                                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Theme:</span>
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-lg bg-brand-cream dark:bg-gray-700 hover:bg-brand-gold/30 dark:hover:bg-gray-600 transition-colors"
                                    aria-label="Toggle theme"
                                >
                                    {theme === 'light' ? (
                                        <svg className="w-5 h-5 text-brand-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            <div className="pt-2 border-t border-brand-gold dark:border-gray-700">
                                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2 block">{t('header.language')}:</span>
                                <div className="flex flex-col space-y-2">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                changeLanguage(lang.code);
                                                closeMobileMenu();
                                            }}
                                            className={`px-3 py-2 rounded text-sm font-semibold transition-colors text-left ${i18n.language === lang.code
                                                    ? 'bg-brand-saffron text-white'
                                                    : 'bg-brand-cream dark:bg-gray-700 text-brand-maroon dark:text-gray-200'
                                                }`}
                                        >
                                            {lang.nativeName}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.nav>
                )}
            </div>
        </motion.header>
    );
};

export default Header;
