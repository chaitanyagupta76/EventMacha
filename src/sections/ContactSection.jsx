import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { viewportConfig } from '../utils/animations';

const ContactSection = () => {
    const { t } = useTranslation();

    return (
        <section id="contact" className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-brand-cream via-white to-brand-cream dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportConfig}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 md:mb-10"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-maroon dark:text-white mb-3">
                        {t('contact.title')}
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100px" }}
                        viewport={viewportConfig}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-1 bg-gradient-to-r from-brand-saffron via-brand-gold to-brand-turmeric mx-auto rounded-full"
                    ></motion.div>
                </motion.div>

                {/* Contact Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportConfig}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-brand-gold/20 p-8 md:p-10 text-center"
                >
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-r from-brand-saffron to-brand-turmeric rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </div>

                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 font-sans leading-relaxed mb-8">
                        {t('contact.message')}
                    </p>

                    {/* Contact Details */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                        {/* Email */}
                        <a
                            href="mailto:eventmacha@gmail.com"
                            className="flex items-center gap-2.5 px-5 py-3 bg-brand-cream dark:bg-gray-700 rounded-xl hover:shadow-md transition-all group"
                        >
                            <svg className="w-5 h-5 text-brand-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-brand-maroon dark:text-brand-gold font-semibold text-sm md:text-base group-hover:text-brand-saffron transition-colors">
                                eventmacha@gmail.com
                            </span>
                        </a>

                        {/* Phone */}
                        <a
                            href="tel:+919866909993"
                            className="flex items-center gap-2.5 px-5 py-3 bg-brand-cream dark:bg-gray-700 rounded-xl hover:shadow-md transition-all group"
                        >
                            <svg className="w-5 h-5 text-brand-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-brand-maroon dark:text-brand-gold font-semibold text-sm md:text-base group-hover:text-brand-saffron transition-colors">
                                +91 98669 09993
                            </span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;
