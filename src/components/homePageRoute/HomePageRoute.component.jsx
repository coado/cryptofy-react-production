import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const HomePageRoute = ({component: Component, logedIn,  ...rest}) => (
    <Route {...rest} render={props => (
        logedIn ? 
        <Redirect to='/dashboard'/>
        : <Component {...props} />
    )} />
);

const mapStateToProps = state => ({
    logedIn: state.user.logedIn 
})

export default connect(mapStateToProps)(HomePageRoute);