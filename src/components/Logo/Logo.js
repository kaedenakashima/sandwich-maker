import React from 'react';
import sandwichLogo from '../../assets/images/sandwich-logo.gif'
// import sandwichLogo from '../../assets/images/original.png'
import styles from './Logo.module.css'

const Logo = (props) => (
    <div className={styles.Logo} style={{ height: props.height }}>
        <img src={sandwichLogo} alt='sandwichLogo' />
    </div>
);

export default Logo;