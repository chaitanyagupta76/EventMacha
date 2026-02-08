import { motion } from 'framer-motion';

const Card = ({ imageUrl, title, description, badge, isPopular, onClick }) => {
    return (
        <motion.div
            whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(139, 21, 56, 0.2)",
                transition: { duration: 0.3 }
            }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-brand-gold"
            onClick={onClick}
        >
            <div className="relative h-48 overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon/30 to-transparent"></div>

                {isPopular && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="absolute top-3 right-3 bg-gradient-to-r from-brand-saffron to-brand-turmeric text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                    >
                        ⭐ Popular
                    </motion.span>
                )}

                {badge && (
                    <motion.span
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="absolute top-3 left-3 bg-brand-peacock text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md"
                    >
                        {badge}
                    </motion.span>
                )}
            </div>

            <div className="p-5">
                <h3 className="text-xl font-serif font-bold text-brand-maroon dark:text-white mb-2">
                    {title}
                </h3>
                {description && (
                    <p className="text-gray-600 dark:text-gray-300 font-sans text-sm leading-relaxed">
                        {description}
                    </p>
                )}
            </div>

            {/* Bottom Accent Line */}
            <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
                className="h-1 bg-gradient-to-r from-brand-saffron via-brand-gold to-brand-turmeric"
            ></motion.div>
        </motion.div>
    );
};

export default Card;
