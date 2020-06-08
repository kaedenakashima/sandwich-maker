import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './SandwichIngredient.css'
import bread_top from './img/bread_top.png'
import bread_bottom from './img/bread_bottom.png'
import tomato from './img/tomato.png'
import salami from './img/salami.png'
import cheese from './img/cheese.png'
import lettuce from './img/lettuce.png'
// import salad from './img/salad.gif'
// import breadTop from './img/bread-top.gif'
// import breadBottom from './img/bread-bottom.gif'
// import provoleneCheese from './img/provolene-cheese.png'
// import cucumber from './img/cucumber.png'
// import onion from './img/onion.png'


class SandwichIngredient extends Component {
    render() {
        let ingredient = null;

        switch (this.props.type) {
            case 'bread-bottom':
                ingredient = <div className='BreadBottom'><img src={bread_bottom} alt='bread_bottom' /></div>;
                break;
            case 'bread-top':
                ingredient = (
                    <div className='BreadTop'><img src={bread_top} alt='bread_top' /></div>
                );
                break;
            case 'atomato':
                ingredient = <div className='Tomato'><img src={tomato} alt='tomato' /></div>;
                break;
            case 'cheese':
                ingredient = <div className='Cheese'><img src={cheese} alt='cheese' /></div>;
                break;
            case 'salad':
                ingredient = <div className='Salad'><img src={lettuce} alt='lettuce' /></div>;
                break;
            case 'salami':
                ingredient = <div className='Salami'><img src={salami} alt='salami' /></div>;
                break;
            default:
                ingredient = null;
        }
        return ingredient;
    }
}

SandwichIngredient.propTypes = {
    type: PropTypes.string.isRequired
};


export default SandwichIngredient
