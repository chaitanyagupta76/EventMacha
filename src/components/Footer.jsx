import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { fadeInUp, viewportConfig } from '../utils/animations';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <motion.footer
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="bg-gradient-to-r from-brand-maroon via-brand-royal to-brand-emerald dark:bg-gray-950 text-white py-8 md:py-12 transition-colors duration-300"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-xl md:text-2xl font-serif font-bold mb-2 md:mb-0 text-brand-gold"
                    >
                        {t('header.logo')}
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        <motion.a
                            whileHover={{ scale: 1.1, color: '#FDB813' }}
                            href="#contact"
                            className="hover:text-brand-turmeric transition-colors text-sm md:text-base font-medium"
                        >
                            {t('footer.contact')}
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.1, color: '#FDB813' }}
                            href="#help"
                            className="hover:text-brand-turmeric transition-colors text-sm md:text-base font-medium"
                        >
                            {t('footer.help')}
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.1, color: '#FDB813' }}
                            href="#privacy"
                            className="hover:text-brand-turmeric transition-colors text-sm md:text-base font-medium"
                        >
                            {t('footer.privacy')}
                        </motion.a>
                    </div>
                </div>

                <div className="border-t border-brand-gold/30 pt-4 md:pt-6 text-center text-xs md:text-sm">
                    <p className="text-brand-cream">{t('footer.copyright')}</p>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
