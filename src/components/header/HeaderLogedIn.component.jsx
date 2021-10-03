import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import { ReactComponent as ThemeToggle} from '../../svg/eclipse.svg';
import { ReactComponent as Matrix} from '../../svg/matrix.svg';
import { ReactComponent as Moon} from '../../svg/moon.svg';
import { ReactComponent as Saturn} from '../../svg/saturn.svg';
import { ReactComponent as Light} from '../../svg/sun.svg';

import { activeSpinnerLoader } from '../../redux/user/user.actions';

import { setTheme } from '../../redux/user/user.actions';

const HeaderLogedIn = ({ activeSpinnerLoader, id, setTheme, theme, logout }) => {
    
    const [toggleTheme, setToggleTheme] = useState(false);

    const handleClick = (theme) => {
        activeSpinnerLoader();
        setTheme({
            id,
            theme
        })
    }
    
    return (
    <div className={`header-${theme} header`}>
        <div className='header__container'>
            <div className='header__icon'>
            </div>
            <ul>
                <li><Link to='/dashboard'> DASHBOARD </Link></li>
                <li><Link to='/wallet'> WALLET TRACKER </Link></li>
                <li><Link onClick={logout} to='/'> LOGOUT </Link></li>
                <li><ThemeToggle onClick={() => setToggleTheme(!toggleTheme)} className={`header__themeIcon-${theme} header__themeIcon`} /></li>
            </ul>
        </div>
        {
            toggleTheme ? 
            <div className={`header__theme--container-${theme} header__theme--container`}>
                <Moon onClick={() => handleClick('dark')} className={`header__theme--icon-${theme} header__theme--icon`} />
                <Saturn onClick={() => handleClick('space')} className={`header__theme--icon-${theme} header__theme--icon`} />
                <Matrix onClick={() => handleClick('matrix')} className={`header__theme--icon-${theme} header__theme--icon`} />
                <Light onClick={() => handleClick('light')} className={`header__theme--icon-${theme} header__theme--icon`} />
            </div> 
            :
            null
        }
        
    </div>
)};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    setTheme: data => dispatch(setTheme(data)),
    activeSpinnerLoader: () => dispatch(activeSpinnerLoader())
});

const mapStateToProps = state => ({
    theme: state.user.theme,
    id:  state.user.currentUser._id
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogedIn);