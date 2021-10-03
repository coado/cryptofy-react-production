import React, { useState } from 'react';
import { connect } from 'react-redux';
// UTIL FUNCTIONS
import { replaceComma, checkNumberField } from '../../../../utils/form.funtions';
// ACTIONS
import { userFutureUpload } from '../../../../redux/user/user.actions';
// COMPONETNS
import Button from '../../../../components/button/Button.component';
import Close from '../../../../components/Close/Close.component';

const FuturesAddRecordForm = ({ theme, setWalletTrackerLabel, id, hideForm, userFutureUpload, setFuturesTableLoading }) => {
    
    const [data, setData] = useState({
        id, 
        typeOfFuture: '',
        contract: '',
        profit: null,
        entry: null,
        laverage: null,
        date: ''
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

        if (data.profit) data.profit = replaceComma(data.profit);
        if (data.entry) data.entry = replaceComma(data.entry);

            data.typeOfFuture = data.typeOfFuture.toLowerCase();
        if (data.typeOfFuture !== 'short' && data.typeOfFuture !== 'long') {
            return setWalletTrackerLabel({
                status: true,
                message: 'Provide only Long or Short type.'
            })
        }

        if (checkNumberField(data.profit, data.entry)) {
            return setWalletTrackerLabel({
                status: true,
                message: 'Provide only numbers in profit and entry fields. '
            })
        }


        setFuturesTableLoading();
        userFutureUpload(data);
        hideForm();
    }
    
    return (
    <div className={`futuresForm-${theme} futuresForm`}>
        <div className='futuresForm__container'>
            <form onSubmit={handleSubmit} >
                <Close onClick={hideForm} />
                <h1 className='futuresForm__header'>Add new record</h1>
                <div className='futuresForm__box'>
                    <div className='futuresForm__inputBox'>
                        <label htmlFor='futuresForm__type'>TYPE: </label>
                        <input onChange={handleChange} list='shortAndLong' required name='typeOfFuture' type='text' placeholder='type' id='futuresForm__type' />
                    <datalist id="shortAndLong">
                        <option value="Short" />
                        <option value="Long" />
                    </datalist>
                    </div>
                    <div className='futuresForm__inputBox'>
                        <label htmlFor='futuresForm__contract'>CONTRACT: </label>
                        <input onChange={handleChange} type='text' name='contract' placeholder='contract' id='futuresForm__contract' />
                    </div>
                    <div className='futuresForm__inputBox'>
                        <label htmlFor='futuresForm__entry'>ENTRY: </label>
                        <input onChange={handleChange} name='entry' type='text' placeholder='entry' id='futuresForm__entry' />
                    </div>
                    <div className='futuresForm__inputBox'>
                        <label htmlFor='futuresForm__laverage'>LAVERAGE: </label>
                        <input onChange={handleChange} name='laverage' type='text' placeholder='laverage' id='futuresForm__laverage' />
                    </div>
                    <div className='futuresForm__inputBox'>
                        <label htmlFor='futuresForm__profit'>PROFIT: </label>
                        <input onChange={handleChange} name='profit' type='text' placeholder='profit' id='futuresForm__profit' />
                    </div>
                    <div className='futuresForm__inputBox'>
                        <label htmlFor='futuresForm__date'>DATE: </label>
                        <input onChange={handleChange} required name='date' type='date' placeholder='date' id='futuresForm__date' />
                    </div>
                    <Button type='submit' styles={{marginTop: 0}} text='APPLY' />
                </div>
            
            </form>
        </div>
    </div>
)};

const mapDispatchToProps = dispatch => ({
    userFutureUpload: data => dispatch(userFutureUpload(data))
});

export default connect(null, mapDispatchToProps)(FuturesAddRecordForm);