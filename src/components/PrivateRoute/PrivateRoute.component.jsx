import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({component: Component, logedIn,  ...rest}) => (
    <Route {...rest} render={props => (
        logedIn ? 
        <Component {...props} />
        : <Redirect to='/signUpSignIn'/>
    )} />
);

const mapStateToProps = state => ({
    logedIn: state.user.logedIn 
})

export default connect(mapStateToProps)(PrivateRoute);