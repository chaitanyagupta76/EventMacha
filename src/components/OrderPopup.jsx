import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const EMAILJS_SERVICE_ID = 'service_nma3l1m';
const EMAILJS_CUSTOMER_TEMPLATE_ID = 'template_1ubgvzs';
const EMAILJS_TEAM_TEMPLATE_ID = 'template_lz6gezz';
const EMAILJS_PUBLIC_KEY = 'xEiErLBBpteIjFuxK';

const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { a, b, answer: a + b };
};

const generateOrderId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};

const OrderPopup = ({ isOpen, onClose, template }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        plan: 'pro',
    });
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null);
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaError, setCaptchaError] = useState(false);

    const refreshCaptcha = useCallback(() => {
        setCaptcha(generateCaptcha());
        setCaptchaInput('');
        setCaptchaError(false);
    }, []);

    useEffect(() => {
        if (isOpen) refreshCaptcha();
    }, [isOpen, refreshCaptcha]);

    if (!isOpen || !template) return null;

    const isCaptchaValid = parseInt(captchaInput, 10) === captcha.answer;

    const plans = [
        { value: 'pro', label: t('pricing.plans.pro.name'), price: t('pricing.plans.pro.price') },
        { value: 'proPlus', label: t('pricing.plans.proPlus.name'), price: t('pricing.plans.proPlus.price') },
        { value: 'ultimate', label: t('pricing.plans.ultimate.name'), price: t('pricing.plans.ultimate.price') },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isCaptchaValid) {
            setCaptchaError(true);
            return;
        }
        setCaptchaError(false);
        setSending(true);
        setStatus(null);

        const orderId = generateOrderId();
        const orderDate = new Date().toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        try {
            // Email 1: To customer
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_CUSTOMER_TEMPLATE_ID,
                {
                    order_id: orderId,
                    customer_name: formData.name,
                    theme_name: template.name,
                    theme_code: template.themeCode,
                    plan_code: formData.plan,
                    email: formData.email,
                },
                EMAILJS_PUBLIC_KEY
            );

            // Email 2: To Event Macha team
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEAM_TEMPLATE_ID,
                {
                    order_id: orderId,
                    order_date: orderDate,
                    plan_code: formData.plan,
                    template_code: template.themeCode,
                    customer_name: formData.name,
                    customer_email: formData.email,
                    customer_mobile: formData.mobile,
                    email: 'eventmacha@gmail.com',
                },
                EMAILJS_PUBLIC_KEY
            );

            setStatus('success');
            setFormData({ name: '', email: '', mobile: '', plan: 'pro' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
        } finally {
            setSending(false);
        }
    };

    const handleClose = () => {
        setStatus(null);
        setFormData({ name: '', email: '', mobile: '', plan: 'pro' });
        setCaptchaInput('');
        setCaptchaError(false);
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
                onClick={handleClose}
            >
                <motion.div
                    initial={{ scale: 0.85, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.85, opacity: 0, y: 30 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg border-2 border-brand-gold overflow-hidden my-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-brand-saffron to-brand-turmeric px-6 py-4 flex items-center justify-between">
                        <h3 className="text-xl font-serif font-bold text-white">{t('orderPopup.title')}</h3>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleClose}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>
                    </div>

                    <div className="p-6 max-h-[75vh] overflow-y-auto">
                        {status === 'success' ? (
                            /* ---- SUCCESS VIEW ---- */
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                                className="text-center py-4"
                            >
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
                                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-brand-maroon dark:text-brand-gold mb-4">
                                    {t('orderPopup.successTitle')}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 font-sans leading-relaxed mb-6">
                                    {t('orderPopup.successMessage')}
                                </p>

                                {/* Contact for urgent */}
                                <div className="bg-brand-cream/50 dark:bg-gray-700 rounded-xl p-4 mb-6 text-left">
                                    <p className="text-sm text-gray-600 dark:text-gray-300 font-sans mb-3">
                                        {t('orderPopup.urgentMessage')}
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        <a href="mailto:eventmacha@gmail.com" className="flex items-center gap-2 text-sm text-brand-saffron hover:underline font-semibold">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            eventmacha@gmail.com
                                        </a>
                                        <a href="tel:+919866909993" className="flex items-center gap-2 text-sm text-brand-saffron hover:underline font-semibold">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                            +91 98669 09993
                                        </a>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleClose}
                                    className="w-full bg-gradient-to-r from-brand-saffron to-brand-turmeric text-white font-bold py-3 rounded-xl shadow-lg"
                                >
                                    {t('orderPopup.close')}
                                </motion.button>
                            </motion.div>
                        ) : (
                            /* ---- FORM VIEW ---- */
                            <>
                                {/* Mini Preview */}
                                {template.siteUrl && (
                                    <div className="mb-5 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 shadow-md">
                                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                        </div>
                                        <iframe
                                            src={template.siteUrl}
                                            title={`Preview: ${template.name}`}
                                            className="w-full h-36 border-0 pointer-events-none"
                                            scrolling="no"
                                        />
                                    </div>
                                )}

                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 font-sans">
                                    {t('orderPopup.subtitle')}
                                </p>

                                {/* Error Message */}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl text-red-700 dark:text-red-300 text-sm"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-semibold">{t('orderPopup.technicalError')}</span>
                                        </div>
                                        <p>{t('orderPopup.technicalErrorMessage')}</p>
                                    </motion.div>
                                )}

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-brand-maroon dark:text-gray-200 mb-1.5">{t('orderPopup.name')}</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder={t('orderPopup.namePlaceholder')}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-brand-saffron focus:ring-2 focus:ring-brand-saffron/20 outline-none transition-all font-sans"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-brand-maroon dark:text-gray-200 mb-1.5">{t('orderPopup.email')}</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder={t('orderPopup.emailPlaceholder')}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-brand-saffron focus:ring-2 focus:ring-brand-saffron/20 outline-none transition-all font-sans"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-brand-maroon dark:text-gray-200 mb-1.5">{t('orderPopup.mobile')}</label>
                                        <PhoneInput
                                            international
                                            defaultCountry="IN"
                                            value={formData.mobile}
                                            onChange={(value) => setFormData({ ...formData, mobile: value || '' })}
                                            className="phone-input-custom w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus-within:border-brand-saffron focus-within:ring-2 focus-within:ring-brand-saffron/20 outline-none transition-all font-sans"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-brand-maroon dark:text-gray-200 mb-1.5">{t('orderPopup.itemCode')}</label>
                                        <input
                                            type="text"
                                            value={template.themeCode}
                                            disabled
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-mono font-bold cursor-not-allowed"
                                        />
                                    </div>

                                    {/* Plan Dropdown */}
                                    <div>
                                        <label className="block text-sm font-semibold text-brand-maroon dark:text-gray-200 mb-1.5">{t('orderPopup.selectPlan')}</label>
                                        <select
                                            name="plan"
                                            value={formData.plan}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-brand-saffron focus:ring-2 focus:ring-brand-saffron/20 outline-none transition-all font-sans appearance-none cursor-pointer"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'right 12px center',
                                                backgroundSize: '20px',
                                            }}
                                        >
                                            {plans.map((plan) => (
                                                <option key={plan.value} value={plan.value}>
                                                    {plan.label} — {plan.price}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Captcha */}
                                    <div>
                                        <label className="block text-sm font-semibold text-brand-maroon dark:text-gray-200 mb-1.5">{t('orderPopup.captcha')}</label>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brand-cream to-brand-gold/20 dark:from-gray-700 dark:to-gray-600 rounded-xl border-2 border-brand-gold/30 select-none">
                                                <span className="text-lg font-bold text-brand-maroon dark:text-brand-gold font-mono">{captcha.a} + {captcha.b} = ?</span>
                                            </div>
                                            <input
                                                type="number"
                                                value={captchaInput}
                                                onChange={(e) => { setCaptchaInput(e.target.value); setCaptchaError(false); }}
                                                required
                                                placeholder={t('orderPopup.captchaPlaceholder')}
                                                className={`flex-1 px-4 py-3 rounded-xl border-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 outline-none transition-all font-sans font-bold text-center ${captchaError
                                                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                                                    : 'border-gray-200 dark:border-gray-600 focus:border-brand-saffron focus:ring-brand-saffron/20'
                                                    }`}
                                            />
                                            <button
                                                type="button"
                                                onClick={refreshCaptcha}
                                                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 transition-colors"
                                                title="Refresh captcha"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                            </button>
                                        </div>
                                        {captchaError && (
                                            <p className="text-red-500 text-xs mt-1 font-sans">{t('orderPopup.captchaError')}</p>
                                        )}
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={sending || !isCaptchaValid}
                                        className="w-full bg-gradient-to-r from-brand-saffron to-brand-turmeric hover:from-brand-turmeric hover:to-brand-saffron text-white font-bold py-3.5 rounded-xl shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed text-lg"
                                    >
                                        {sending ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                {t('orderPopup.sending')}
                                            </span>
                                        ) : (
                                            t('orderPopup.placeOrder')
                                        )}
                                    </motion.button>
                                </form>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default OrderPopup;
