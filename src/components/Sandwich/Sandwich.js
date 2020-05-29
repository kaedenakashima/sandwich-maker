import React from 'react';
import './Sandwich.css'
import SandwichIngredient from './SandwichIngredient/SandwichIngredient';

const sandwich = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <SandwichIngredient key={igKey + i} type={igKey} />;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p className='comment'>Please start adding ingredients</p>
    }
    return (
        <div className='Sandwich'>
            <SandwichIngredient type="bread-top" />
            {transformedIngredients}
            <SandwichIngredient type="bread-bottom" />
        </div>
    );
};

export default sandwich