const Card = ({ imageUrl, title, description, badge, isPopular, onClick }) => {
    return (
        <div
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={onClick}
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                {isPopular && (
                    <span className="absolute top-3 right-3 bg-brand-rose text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Popular
                    </span>
                )}
                {badge && (
                    <span className="absolute top-3 left-3 bg-brand-blue text-white px-3 py-1 rounded-full text-sm">
                        {badge}
                    </span>
                )}
            </div>

            <div className="p-5">
                <h3 className="text-xl font-serif font-semibold text-brand-navy mb-2">
                    {title}
                </h3>
                {description && (
                    <p className="text-gray-600 font-sans text-sm">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Card;
