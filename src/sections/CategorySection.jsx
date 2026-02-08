import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';
import categoriesData from '../data/categories.json';

const CategorySection = () => {
    const { t } = useTranslation();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories(categoriesData);
    }, []);

    return (
        <section className="py-16 bg-brand-pink/30">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy text-center mb-12">
                    {t('categories.title')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <Card
                            key={category.id}
                            imageUrl={category.imageUrl}
                            title={category.name}
                            description={category.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
