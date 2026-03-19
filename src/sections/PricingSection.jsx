import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { viewportConfig } from '../utils/animations';

const PricingSection = () => {
    const { t } = useTranslation();
    const [hoveredPlan, setHoveredPlan] = useState(null);

    const plans = [
        {
            key: 'pro',
            popular: false,
            launchOffer: true,
            gradient: 'from-brand-maroon to-brand-royal',
            iconBg: 'bg-brand-maroon/10',
            iconColor: 'text-brand-maroon',
            features: ['customWebsite', 'eventMachaHosting', 'validity1Year'],
        },
        {
            key: 'proPlus',
            popular: true,
            gradient: 'from-brand-saffron to-brand-turmeric',
            iconBg: 'bg-brand-saffron/10',
            iconColor: 'text-brand-saffron',
            features: ['customWebsite', 'customHosting', 'validity1Year'],
        },
        {
            key: 'ultimate',
            popular: false,
            gradient: 'from-brand-emerald to-brand-peacock',
            iconBg: 'bg-brand-emerald/10',
            iconColor: 'text-brand-emerald',
            features: ['customWebsite', 'customHosting', 'validity10Years'],
        },
    ];

    const comparisonFeatures = [
        'customWebsite',
        'eventMachaHosting',
        'customHosting',
        'validity1Year',
        'validity10Years',
    ];

    const planFeatureCheck = {
        pro: ['customWebsite', 'eventMachaHosting', 'validity1Year'],
        proPlus: ['customWebsite', 'customHosting', 'validity1Year'],
        ultimate: ['customWebsite', 'customHosting', 'validity10Years'],
    };

    return (
        <section id="pricing" className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportConfig}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-14"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-maroon dark:text-white mb-3">
                        {t('pricing.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg font-sans max-w-2xl mx-auto mb-4">
                        {t('pricing.subtitle')}
                    </p>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100px" }}
                        viewport={viewportConfig}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-1 bg-gradient-to-r from-brand-saffron via-brand-gold to-brand-turmeric mx-auto rounded-full"
                    ></motion.div>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.key}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewportConfig}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            onMouseEnter={() => setHoveredPlan(plan.key)}
                            onMouseLeave={() => setHoveredPlan(null)}
                            className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 transition-all duration-300 overflow-hidden ${plan.popular
                                    ? 'border-brand-saffron shadow-xl scale-[1.02] md:scale-105'
                                    : hoveredPlan === plan.key
                                        ? 'border-brand-gold shadow-xl'
                                        : 'border-gray-100 dark:border-gray-700'
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && !plan.launchOffer && (
                                <div className="absolute top-0 left-0 right-0">
                                    <div className={`bg-gradient-to-r ${plan.gradient} text-white text-center py-1.5 text-xs font-bold uppercase tracking-wider`}>
                                        {t('pricing.popular')}
                                    </div>
                                </div>
                            )}

                            {/* Launch Offer Badge */}
                            {plan.launchOffer && (
                                <div className="absolute top-0 left-0 right-0">
                                    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-center py-1.5 text-xs font-bold uppercase tracking-wider shadow-md animate-pulse">
                                        Launch Offer
                                    </div>
                                </div>
                            )}

                            <div className={`p-6 md:p-8 ${plan.popular ? 'pt-10' : ''}`}>
                                {/* Plan Icon & Name */}
                                <div className="text-center mb-6">
                                    <div className={`w-14 h-14 ${plan.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                                        {plan.key === 'pro' && (
                                            <svg className={`w-7 h-7 ${plan.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        )}
                                        {plan.key === 'proPlus' && (
                                            <svg className={`w-7 h-7 ${plan.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                            </svg>
                                        )}
                                        {plan.key === 'ultimate' && (
                                            <svg className={`w-7 h-7 ${plan.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                        )}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-maroon dark:text-white">
                                        {t(`pricing.plans.${plan.key}.name`)}
                                    </h3>
                                </div>

                                {/* Price */}
                                <div className="text-center mb-6">
                                    {t(`pricing.plans.${plan.key}.originalPrice`) && (
                                        <span className="text-gray-400 line-through text-lg font-sans mr-2">
                                            {t(`pricing.plans.${plan.key}.originalPrice`)}
                                        </span>
                                    )}
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                                            {t(`pricing.plans.${plan.key}.price`)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-sans">
                                        {t(`pricing.plans.${plan.key}.validity`)}
                                    </p>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2.5">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gradient-to-r ${plan.gradient}`}>
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300 font-sans text-sm">
                                                {t(`pricing.features.${feature}`)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={`w-full py-3 rounded-xl font-bold transition-all text-sm ${plan.popular
                                            ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg shadow-brand-saffron/20`
                                            : 'bg-gray-100 dark:bg-gray-700 text-brand-maroon dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                    onClick={() => {
                                        const contactSection = document.getElementById('contact');
                                        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    {t('pricing.contactUs')}
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportConfig}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-maroon dark:text-white text-center mb-6">
                        {t('pricing.comparisonTitle')}
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[500px]">
                                <thead>
                                    <tr className="bg-gradient-to-r from-brand-maroon to-brand-royal text-white">
                                        <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold">{t('pricing.feature')}</th>
                                        <th className="px-4 md:px-6 py-4 text-center text-sm font-semibold">{t('pricing.plans.pro.name')}</th>
                                        <th className="px-4 md:px-6 py-4 text-center text-sm font-semibold bg-brand-saffron/20">{t('pricing.plans.proPlus.name')}</th>
                                        <th className="px-4 md:px-6 py-4 text-center text-sm font-semibold">{t('pricing.plans.ultimate.name')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonFeatures.map((feature, idx) => (
                                        <tr key={feature} className={`${idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-750'} border-b border-gray-100 dark:border-gray-700`}>
                                            <td className="px-4 md:px-6 py-3.5 text-sm font-sans text-gray-700 dark:text-gray-300">
                                                {t(`pricing.features.${feature}`)}
                                            </td>
                                            {['pro', 'proPlus', 'ultimate'].map((planKey) => (
                                                <td key={planKey} className={`px-4 md:px-6 py-3.5 text-center ${planKey === 'proPlus' ? 'bg-brand-saffron/5' : ''}`}>
                                                    {planFeatureCheck[planKey].includes(feature) ? (
                                                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30">
                                                            <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700">
                                                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    {/* Price Row */}
                                    <tr className="bg-brand-cream/50 dark:bg-gray-700 font-bold">
                                        <td className="px-4 md:px-6 py-4 text-sm font-sans text-brand-maroon dark:text-brand-gold">
                                            {t('pricing.priceLabel')}
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center">
                                            <span className="text-gray-400 line-through text-xs block">₹10,000</span>
                                            <span className="text-brand-maroon dark:text-brand-gold font-bold">₹2,000</span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center bg-brand-saffron/5">
                                            <span className="text-gray-400 line-through text-xs block">₹12,000</span>
                                            <span className="text-brand-saffron font-bold">₹5,000</span>
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center">
                                            <span className="text-brand-emerald dark:text-green-400 font-bold">₹20,000</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PricingSection;
