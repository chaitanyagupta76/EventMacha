import { motion, AnimatePresence } from 'framer-motion';

const TemplatePreviewModal = ({ isOpen, onClose, siteUrl, templateName }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/90 flex flex-col"
            >
                {/* Top Bar */}
                <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-gray-900/95 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-white font-medium text-sm md:text-base">{templateName}</span>
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>
                    </div>
                </div>

                {/* Iframe */}
                <div className="flex-grow relative">
                    <iframe
                        src={siteUrl}
                        title={`Preview: ${templateName}`}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default TemplatePreviewModal;
