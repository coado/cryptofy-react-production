import React from 'react';
import { connect } from 'react-redux';
// UTIL FUNCTIONS
import { replaceComma, checkNumberField, calculatePercentageCourseChange } from '../../../../utils/form.funtions';
// ACTIONS
import { userSpotEdit } from '../../../../redux/user/user.actions';
// COMPONENTS
import Button from '../../../../components/button/Button.component';
import Close from '../../../../components/Close/Close.component';

const SpotUpdateRecordForm  = ({ theme, setSpotTableLoading, setEditData, editData, setWalletTrackerLabel, hideForm, userSpotEdit }) => {
   
    const { buyCurrency, buyAmount, buyCourse, buyDate, profit, sellCourse, sellDate} = editData;

    
    const onChange = e => {
        const { name, value } = e.target;
        setEditData(prevState => ({
            ...prevState,
            [name]: value
        }))
    };


     const handleSubmit = e => {
        e.preventDefault();

        if (editData.sellCourse) editData.sellCourse = replaceComma(editData.sellCourse);
        if (editData.profit)  editData.profit = replaceComma(editData.profit);

        editData.buyAmount = replaceComma(editData.buyAmount);
        editData.buyCourse = replaceComma(editData.buyCourse);

        if(checkNumberField(editData.buyAmount, editData.buyCourse, editData.sellAmount, editData.sellCourse, editData.profit)) {
            return setWalletTrackerLabel({
                status: true,
                message: 'Provide only numbers in amount, profit and course fields. '
            })
        }

        if (editData.buyCourse && editData.sellCourse) {
            editData.percentageCourseChange = calculatePercentageCourseChange(editData.buyCourse, editData.sellCourse);
        };

        setSpotTableLoading();
        userSpotEdit(editData);
        hideForm();
    };

    return (
    <div className={`spotForm-${theme} spotForm`}>
        <div className='spotForm__container'>
            <form onSubmit={handleSubmit} >
                <Close onClick={hideForm} />
                    <h1 className='spotForm__header'> Update record </h1>
                <div className='spotForm__box'>
                    <div className='spotForm__buy'>
                        <p className='spotForm__paragraph'>Buying</p>
                        <div className='spotForm__inputBox'>
                            <label htmlFor='spotForm__input--1'> CURRENCY:  </label>
                            <input autoComplete='off' onChange={onChange} defaultValue={buyCurrency} required name='buyCurrency' type='text' placeholder='currency' id='spotForm__input--1' className='spotForm__input' />
                        </div>
                        <div className='spotForm__inputBox'>
                            <label htmlFor='spotForm__input--2'> AMOUNT:  </label>
                            <input autoComplete='off' onChange={onChange} defaultValue={buyAmount} required name='buyAmount' type='text' placeholder='amount' id='spotForm__input--2' className='spotForm__input' />
                        </div>
                        <div className='spotForm__inputBox'>
                            <label htmlFor='spotForm__input--3'> COURSE:  </label>
                            <input autoComplete='off' onChange={onChange} defaultValue={buyCourse} required name='buyCourse' type='text' placeholder='course' id='spotForm__input--3' className='spotForm__input' />
                        </div>
                        <div className='spotForm__inputBox'>
                            <label htmlFor='spotForm__input--4'> DATE:  </label>
                            <input autoComplete='off' onChange={onChange} defaultValue={buyDate} required name='buyDate' type='date' placeholder='date' id='spotForm__input--4' className='spotForm__input' />
                        </div>
                    </div>

                    <div className='spotForm__sell'>
                        <p className='spotForm__paragraph'>selling</p>
                        <div className='spotForm__inputBox'>
                            <label htmlFor='spotForm__input--6'> COURSE:  </label>
                            <input autoComplete='off' onChange={onChange} defaultValue={sellCourse} name='sellCourse' type='text' placeholder='course' id='spotForm__input--6' className='spotForm__input' />
                        </div>
                        <div className='spotForm__inputBox'>
                            <label htmlFor='spotForm__input--7'> PROFIT:  </label>
                            <input autoComplete='off' onChange={onChange} defaultValue={profit} name='profit' type='text' placeholder='profit' id='spotForm__input--7' className='spotForm__input' />
                        </div>
                        <div className='spotForm__inputBox'>
                            <label htmlFor='spotForm__input--8'> DATE:  </label>
                            <input autoComplete='off' onChange={onChange} defaultValue={sellDate} name='sellDate' type='date' placeholder='date' id='spotForm__input--8' className='spotForm__input' />
                        </div>
                    </div>
                </div>
                <Button text='APPLY' styles={{marginTop: '0rem', marginBottom: '2rem'}} />
                
            </form>
        </div>
    </div>
)};

const mapDispatchToProps = dispatch => ({
    userSpotEdit: data => dispatch(userSpotEdit(data))
});

export default connect(null, mapDispatchToProps)(SpotUpdateRecordForm);