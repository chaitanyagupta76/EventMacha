import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const UnderConstructionPopup = ({ isOpen, onClose }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border-2 border-brand-gold"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Construction Icon */}
                    <div className="w-20 h-20 bg-brand-cream dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-5">
                        <svg className="w-10 h-10 text-brand-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-brand-maroon dark:text-brand-gold mb-3">
                        {t('underConstruction.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 font-sans">
                        {t('underConstruction.message')}
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        className="bg-brand-saffron hover:bg-brand-turmeric text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg"
                    >
                        {t('underConstruction.ok')}
                    </motion.button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default UnderConstructionPopup;
