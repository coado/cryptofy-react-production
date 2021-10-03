import { Link } from 'react-router-dom';
import React from 'react';

const HeaderLogedOut = () => (
    <div className='header'>
        <div className='header__container'>
            <div className='header__icon'>
            </div>
            <ul>
                <li><Link className='header__link' to='/'> HOME PAGE </Link></li>
                <li><Link className='header__link' to='/'> ABOUT US </Link></li>
                <li><Link className='header__link' to='/'> FAQ </Link></li>
                <li><Link className='header__link' to='/signUpSignIn'> SIGN PAGE </Link></li>
            </ul>
        </div>
    </div>
);

export default HeaderLogedOut;