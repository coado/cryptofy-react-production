import React, { useState } from 'react';
import { connect } from 'react-redux';
// UTIL FUNCTIONS
import { replaceComma, checkNumberField, calculatePercentageCourseChange } from '../../../../utils/form.funtions';
// ACTIONS
import { userSpotUpload } from '../../../../redux/user/user.actions';
// COMPONENTS
import Button from '../../../../components/button/Button.component';
import CurrenciesList from '../../../../components/List/CurrenciesList.component';
import Close from '../../../../components/Close/Close.component';


const SpotAddRecordForm  = ({ theme, setSpotTableLoading, setWalletTrackerLabel, hideForm, userSpotUpload, id }) => {
   
    const [data, setData] = useState({
        id,
        buyCurrency: '',
        buyAmount: null,
        buyCourse: null,
        buyDate: null,
        sellCourse: null,
        sellDate: null,
        profit: null,
        percentageCourseChange: null
    });



    const handleChange = e => {
        const { name, value } = e.target;

        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (data.sellCourse) data.sellCourse = replaceComma(data.sellCourse);
        if (data.profit)  data.profit = replaceComma(data.profit);

        if (data.buyAmount) data.buyAmount = replaceComma(data.buyAmount);
        if (data.buyCourse) data.buyCourse = replaceComma(data.buyCourse);

        if(checkNumberField(data.buyAmount, data.buyCourse, data.sellCourse, data.profit)) {
            return setWalletTrackerLabel({
                status: true,
                message: 'Provide only numbers in amount, profit and course fields. '
            })
        }

        if (data.buyCourse && data.sellCourse) {
            data.percentageCourseChange = calculatePercentageCourseChange(data.buyCourse, data.sellCourse);
        };

        setSpotTableLoading();
        userSpotUpload(data);
        hideForm();


    };

    return (
    <div className={`spotForm-${theme} spotForm`}>
        <div className='spotForm__container'>
            <form onSubmit={handleSubmit} >
                <Close onClick={hideForm} />
                    <h1 className='spotForm__header'> Add new record </h1>
                <div className='spotForm__box'>
                    <div className='spotForm__buy'>
                        <p className='spotForm__paragraph'>Buying</p>
                        <div className='spotForm__inputBox'>
                            <label htmlFor='spotForm__input--1'> CURRENCY:  </label>
                            <input autoComplete='off' list='currencies' required onChange={handleChange} name='buyCurrency' type='text' placeholder='currency' id='spotForm__input--1' className='spotForm__input' />
                            <CurrenciesList />
                        </div>
                        <div className='spotForm__inputBox'>
                            <label htmlFor='spotForm__input--2'> AMOUNT:  </label>
                            <input autoComplete='off' required onChange={handleChange} name='buyAmount' type='text' placeholder='amount' id='spotForm__input--2' className='spotForm__input' />
                        </div>
                        <div className='spotForm__inputBox'>
                            <label htmlFor='spotForm__input--3'> COURSE:  </label>
                            <input autoComplete='off' required onChange={handleChange} name='buyCourse' type='text' placeholder='course' id='spotForm__input--3' className='spotForm__input' />
                        </div>
                        <div className='spotForm__inputBox'>
                            <label htmlFor='spotForm__input--4'> DATE:  </label>
                            <input autoComplete='off' required onChange={handleChange} name='buyDate' type='date' placeholder='date' id='spotForm__input--4' className='spotForm__input' />
                        </div>
                    </div>

                    <div className='spotForm__sell'>
                        <p className='spotForm__paragraph'> selling </p>
                        <div className='spotForm__inputBox'>
                            <label htmlFor='spotForm__input--6'> COURSE:  </label>
                            <input autoComplete='off' onChange={handleChange} name='sellCourse' type='text' placeholder='course' id='spotForm__input--6' className='spotForm__input' />
                        </div>
                        <div className='spotForm__inputBox'>
                            <label htmlFor='spotForm__input--7'> PROFIT:  </label>
                            <input autoComplete='off' onChange={handleChange} name='profit' type='text' placeholder='profit' id='spotForm__input--7' className='spotForm__input' />
                        </div>
                        <div className='spotForm__inputBox'>
                            <label htmlFor='spotForm__input--8'> DATE:  </label>
                            <input autoComplete='off' onChange={handleChange} name='sellDate' type='date' placeholder='date' id='spotForm__input--8' className='spotForm__input' />
                        </div>
                    </div>
                </div>
                <Button type='submit' text='APPLY' styles={{marginTop: '0rem', marginBottom: '2rem'}} />
                
            </form>
        </div>
    </div>
)};

const mapDispatchToProps = dispatch => ({
    userSpotUpload: data => dispatch(userSpotUpload(data))
});

export default connect(null, mapDispatchToProps)(SpotAddRecordForm);