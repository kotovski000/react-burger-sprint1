import React, { useState, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from './ingredient-card';
import styles from './burger-ingredients.module.css';
import { IngredientsArrayType } from '../../utils/types';

const BurgerIngredients = ({ ingredients, onIngredientClick }) => {
    const [currentTab, setCurrentTab] = useState('bun');

    const groupedIngredients = useMemo(() => {
        const groups = {
            bun: [],
            sauce: [],
            main: []
        };

        ingredients.forEach(ingredient => {
            groups[ingredient.type].push(ingredient);
        });

        return groups;
    }, [ingredients]);

    const categories = [
        { type: 'bun', title: 'Булки' },
        { type: 'sauce', title: 'Соусы' },
        { type: 'main', title: 'Начинки' }
    ];

    if (ingredients.length === 0) {
        return <section className={styles.section}>No ingredients available</section>;
    }

    return (
        <section className={styles.section}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

            <div className={styles.tabs}>
                {categories.map(({ type, title }) => (
                    <Tab
                        key={type}
                        value={type}
                        active={currentTab === type}
                        onClick={setCurrentTab}
                    >
                        {title}
                    </Tab>
                ))}
            </div>

            <div className={styles.ingredientsContainer}>
                {categories.map(({ type, title }) => (
                    groupedIngredients[type].length > 0 && (
                        <div key={type} className={styles.ingredientsSection} id={type}>
                            <h2 className="text text_type_main-medium mt-10 mb-6">{title}</h2>
                            <div className={styles.ingredientsGrid}>
                                {groupedIngredients[type].map(item => (
                                    <IngredientCard
                                        key={item._id}
                                        item={item}
                                        onClick={() => onIngredientClick(item)}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </section>
    );
};

BurgerIngredients.propTypes = {
    ingredients: IngredientsArrayType
};

export default BurgerIngredients;