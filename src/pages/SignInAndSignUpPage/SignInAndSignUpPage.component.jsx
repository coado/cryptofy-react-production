import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/Spinner/Spinner.component';
import SignIn from './SignIn/SignIn.component';
import SignUp from './SignUp/SignUp.component'
import Label from '../../components/Label/Label.component';

const SignInAndSignUpPage = ({status, message}) => {
    const [showLabel, setShowLabel] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(status) {
            setLoading(false)
            setShowLabel(true)
        }
    }, [status])
    
    return (
        
    <div className='sign'>
    {
        showLabel ? <Label hideLabel={() => setShowLabel(false)} status={status} message={message}/> : null
    }
    {
        loading ?
        <div className='sign__spinnerWrapper'>
            <Spinner color='#fff' />
        </div>
        :
        null
    }   
        <div className='sign__wrapper' >
            <SignIn setLoading={() => setLoading(true)} />
            <SignUp setLoading={() => setLoading(true)} />
        </div>
    </div>
  
)};

const mapStateToProps = state => ({
    status: state.error.loginResult.status,
    message: state.error.loginResult.message

});

export default connect(mapStateToProps)(SignInAndSignUpPage);