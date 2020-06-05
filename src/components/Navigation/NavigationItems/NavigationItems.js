import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css'

const NavigationItems = (props) => (
    <ul className='NavigationItems'>
        <NavigationItem link='/' exact>Sandwich Builder</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>
        <NavigationItem link='/auth'>Authenticate</NavigationItem>
    </ul>
);
export default NavigationItems;