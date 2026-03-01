import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import categoriesData from '../data/categories.json';
import templatesData from '../data/templates-metadata.json';
import TemplatePreviewModal from '../components/TemplatePreviewModal';
import OrderPopup from '../components/OrderPopup';
import UnderConstructionPopup from '../components/UnderConstructionPopup';

const SearchTemplatesPage = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [previewTemplate, setPreviewTemplate] = useState(null);
    const [orderTemplate, setOrderTemplate] = useState(null);
    const [showUnderConstruction, setShowUnderConstruction] = useState(false);

    const templates = templatesData.templates;

    // Pre-select category from URL query param
    useEffect(() => {
        const categoryFromUrl = searchParams.get('category');
        if (categoryFromUrl) {
            setSelectedCategories([categoryFromUrl]);
        }
    }, [searchParams]);

    // Filter templates
    const filteredTemplates = useMemo(() => {
        return templates.filter((template) => {
            const matchesSearch =
                searchQuery === '' ||
                template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.themeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.category.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(template.category);

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategories, templates]);

    const handleCategoryToggle = (categoryCode) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryCode)
                ? prev.filter((c) => c !== categoryCode)
                : [...prev, categoryCode]
        );
    };

    const handlePreview = (template) => {
        if (!template.siteUrl) {
            setShowUnderConstruction(true);
        } else {
            setPreviewTemplate(template);
        }
    };

    const handleBuy = (template) => {
        setOrderTemplate(template);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-brand-cream via-white to-brand-cream dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Compact Header */}
            <section className="pt-6 pb-2 md:pt-8 md:pb-3 px-4">
                <div className="container mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl md:text-3xl font-serif font-bold text-brand-maroon dark:text-brand-gold"
                    >
                        {t('templates.pageTitle')}
                    </motion.h1>
                </div>
            </section>

            {/* Sleek Search & Filter Bar */}
            <section className="px-4 pb-4">
                <div className="container mx-auto max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-4 md:p-5"
                    >
                        {/* Search Bar — compact */}
                        <div className="relative mb-3">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder={t('templates.searchPlaceholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:border-brand-saffron focus:ring-2 focus:ring-brand-saffron/10 outline-none transition-all font-sans placeholder:text-gray-400"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Inline Category Filters */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider shrink-0">
                                {t('templates.filterByCategory')}:
                            </span>
                            {categoriesData.map((category) => {
                                const isSelected = selectedCategories.includes(category.categoryCode);
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => handleCategoryToggle(category.categoryCode)}
                                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${isSelected
                                                ? 'bg-brand-saffron text-white shadow-sm'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Results Count */}
                    <div className="text-right mt-2 pr-1">
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-sans">
                            {t('templates.showing')} {filteredTemplates.length} {t('templates.of')} {templates.length} {t('templates.templatesLabel')}
                        </span>
                    </div>
                </div>
            </section>

            {/* Templates Grid */}
            <section className="px-4 pb-16">
                <div className="container mx-auto max-w-5xl">
                    {filteredTemplates.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <div className="w-16 h-16 bg-brand-cream dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-serif font-bold text-gray-600 dark:text-gray-300 mb-1">{t('templates.noResults')}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">{t('templates.noResultsHint')}</p>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredTemplates.map((template, index) => (
                                    <motion.div
                                        key={template.themeCode}
                                        layout
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: index * 0.06 }}
                                        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
                                    >
                                        {/* Card Image */}
                                        <div className="relative h-44 md:h-48 overflow-hidden">
                                            {template.sitePreviewImage ? (
                                                <img
                                                    src={template.sitePreviewImage}
                                                    alt={template.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-brand-saffron/20 via-brand-gold/30 to-brand-turmeric/20 dark:from-brand-saffron/10 dark:via-brand-gold/20 dark:to-brand-turmeric/10 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <svg className="w-10 h-10 text-brand-saffron/50 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-xs text-brand-saffron/60 font-sans">{t('templates.previewComingSoon')}</span>
                                                    </div>
                                                </div>
                                            )}
                                            {/* Category Badge */}
                                            <div className="absolute top-2.5 left-2.5">
                                                <span className="px-2.5 py-0.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-brand-maroon dark:text-brand-gold shadow-sm">
                                                    {template.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-4">
                                            <div className="mb-3">
                                                <h3 className="text-base font-serif font-bold text-brand-maroon dark:text-white">
                                                    {template.name}
                                                </h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">
                                                    {t('templates.code')}: {template.themeCode}
                                                </p>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    onClick={() => handlePreview(template)}
                                                    className="flex-1 flex items-center justify-center gap-1.5 bg-brand-maroon/10 dark:bg-brand-gold/10 text-brand-maroon dark:text-brand-gold hover:bg-brand-maroon/20 dark:hover:bg-brand-gold/20 font-semibold py-2 rounded-lg transition-all text-xs"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    {t('templates.preview')}
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleBuy(template)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-brand-saffron to-brand-turmeric text-white shadow-md hover:shadow-lg transition-all"
                                                    title="Buy this template"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                                                    </svg>
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </section>

            {/* Modals */}
            <TemplatePreviewModal
                isOpen={!!previewTemplate}
                onClose={() => setPreviewTemplate(null)}
                siteUrl={previewTemplate?.siteUrl}
                templateName={previewTemplate?.name}
            />

            <OrderPopup
                isOpen={!!orderTemplate}
                onClose={() => setOrderTemplate(null)}
                template={orderTemplate}
            />

            <UnderConstructionPopup
                isOpen={showUnderConstruction}
                onClose={() => setShowUnderConstruction(false)}
            />
        </div>
    );
};

export default SearchTemplatesPage;
