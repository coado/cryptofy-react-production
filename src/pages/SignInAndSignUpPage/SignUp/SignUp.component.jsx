import React, { useState } from 'react';
import { connect } from 'react-redux';

import { signUpUser } from '../../../redux/user/user.actions';

const SignUp = ({ signUpUser, setLoading }) => {


    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const onChangeHandle = e => {
        const { name, value } = e.target;
        setData( prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        setLoading()
        signUpUser({
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword
        });
        // cleaning form inputs
        document.getElementById('signUp-form').reset();
    }

    
return (
   
    <div className='sign__container'>
        <form onSubmit={handleSubmit} className='sign__form' id='signUp-form'>
            <h1 className='sign__header'> SIGN UP </h1>
            <div className='sign__box'>
                <input onChange={onChangeHandle} name='email' id='signUp__email--input' className='sign__input' type="email" placeholder="Email" required />
                <label htmlFor='signUp__email--input' className='sign__label'> Email: </label>
            </div>
            <div className='sign__box'>
                <input onChange={onChangeHandle} name='password' id='signUp__password--input' className='sign__input' type="password" placeholder="Password" required />
                <label htmlFor='signUp__password--input' className='sign__label'> Password: </label>
            </div>
            <div className='sign__box'>
                <input onChange={onChangeHandle} name='confirmPassword' id='signUp__passwordConfirm--input' className='sign__input' type="password" placeholder="Confirm Password" required />
                <label htmlFor='signUp__passwordConfirm--input' className=' sign__label'> Confirm Password: </label>
            </div>
            <button className='sign__button'> APPLY </button>
        </form>
    </div>
    
)};

const mapDispatchToProps = dispatch => ({
    signUpUser: userData => dispatch(signUpUser(userData))
});


export default connect(null, mapDispatchToProps)(SignUp);