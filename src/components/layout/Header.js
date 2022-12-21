import React from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import styles from './Header.module.css';

const Header = props => {
    return (
        <React.Fragment>
            <header className={styles.header}>
                <h1>Meals</h1>
                <HeaderCartButton onClick={props.onCartShow} />
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt='A table of food' />
            </div>
        </React.Fragment>
    );
};

export default Header;