import React, { useState } from 'react';
import { signInUser } from '../../../redux/user/user.actions';
import { connect } from 'react-redux';


const SignIn = ({ signInUser, setLoading }) => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const onChangeHandle = e => {
        const { name, value } = e.target;
        setData( prevState => ({
            ...prevState,
            [name]: value
        }));
    };

const handleSubmit = (e) => {
        e.preventDefault();
        setLoading()
        signInUser({
            email: data.email,
            password: data.password
        });
        // cleaning form inputs
        document.getElementById('signIn-form').reset();
}

return (
    <div className='sign__container'>
        <form onSubmit={handleSubmit} className='sign__form' id='signIn-form'>
            <h1 className='sign__header'> SIGN IN </h1>
            <div className='signIn__login sign__box'>
                <input name='email' onChange={onChangeHandle} id='signIn__login--input' className='signIn__login--input sign__input' type="email" placeholder="Email" required />
                <label htmlFor='signIn__login--input' className='signIn__login--label sign__label'> Email: </label>
            </div>
            <div className='signIn__password sign__box'>
                <input name='password' onChange={onChangeHandle} id='signIn__password--input' className='signIn__password--input sign__input' type="password" placeholder="Password" required />
                <label htmlFor='signIn__password--input' className='signIn__password--label sign__label'> Password: </label>
            </div>
            <button className='sign__button'> APPLY </button>
        </form>
    </div>
)};

const mapDispatchToProps = dispatch => ({
    signInUser: userData => dispatch(signInUser(userData))
});

export default connect(null, mapDispatchToProps)(SignIn);