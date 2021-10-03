import React from 'react';
import { connect } from 'react-redux';
// UTIL FUNCTIONS
import { replaceComma, checkNumberField } from '../../../../utils/form.funtions';
// ACTIONS
import { userFutureEdit } from '../../../../redux/user/user.actions';
// COMPONETNS
import Button from '../../../../components/button/Button.component';
import Close from '../../../../components/Close/Close.component';


const FuturesUpdateRecordForm = ({ setWalletTrackerLabel, hideForm, userFutureEdit, setFuturesTableLoading, editData, setEditData }) => {

    const { typeOfFuture, contract, profit, date, entry, laverage } = editData;
    
    const handleChange = e => {
        const { name, value } = e.target;

        setEditData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (editData.profit) editData.profit = replaceComma(editData.profit);
        if (editData.entry) editData.entry = replaceComma(editData.entry);

            editData.typeOfFuture = editData.typeOfFuture.toLowerCase();
        if (editData.typeOfFuture !== 'short' && editData.typeOfFuture !== 'long') {
            return setWalletTrackerLabel({
                status: true,
                message: 'Provide only Long or Short type.'
            })
        }

        if (checkNumberField(editData.profit, editData.entry)) {
            return setWalletTrackerLabel({
                status: true,
                message: 'Provide only numbers in profit and entry fields. '
            })
        }

        setFuturesTableLoading();
        userFutureEdit(editData);
        hideForm();
    }
    
    return (
    <div className='futuresForm'>
        <div className='futuresForm__container'>
            <form onSubmit={handleSubmit} >
                <Close onClick={hideForm} />
                <h1 className='futuresForm__header'>Update Record</h1>
                <div className='futuresForm__box'>
                    <div className='futuresForm__inputBox'>
                        <label htmlFor='futuresForm__type'>TYPE: </label>
                        <input defaultValue={typeOfFuture} onChange={handleChange} list='shortAndLong' required name='typeOfFuture' type='text' placeholder='type' id='futuresForm__type' />
                    <datalist id="shortAndLong">
                        <option value="Short" />
                        <option value="Long" />
                    </datalist>
                    </div>
                    <div className='futuresForm__inputBox'>
                        <label htmlFor='futuresForm__contract'>CONTRACT: </label>
                        <input defaultValue={contract} onChange={handleChange} type='text' name='contract' placeholder='contract' id='futuresForm__contract' />
                    </div>
                    <div className='futuresForm__inputBox'>
                        <label htmlFor='futuresForm__entry'>ENTRY: </label>
                        <input required defaultValue={entry} onChange={handleChange} name='entry' type='text' placeholder='entry' id='futuresForm__entry' />
                    </div>
                    <div className='futuresForm__inputBox'>
                        <label htmlFor='futuresForm__laverage'>LAVERAGE: </label>
                        <input defaultValue={laverage} onChange={handleChange} name='laverage' type='text' placeholder='laverage' id='futuresForm__laverage' />
                    </div>
                    <div className='futuresForm__inputBox'>
                        <label htmlFor='futuresForm__profit'>PROFIT: </label>
                        <input defaultValue={profit} onChange={handleChange} name='profit' type='text' placeholder='profit' id='futuresForm__profit' />
                    </div>
                    <div className='futuresForm__inputBox'>
                        <label htmlFor='futuresForm__date'>DATE: </label>
                        <input defaultValue={date} onChange={handleChange} required name='date' type='date' placeholder='date' id='futuresForm__date' />
                    </div>
                    <Button type='submit' styles={{marginTop: 0}} text='APPLY' />
                </div>
            
            </form>
        </div>
    </div>
)};

const mapDispatchToProps = dispatch => ({
    userFutureEdit: data => dispatch(userFutureEdit(data))
});

export default connect(null, mapDispatchToProps)(FuturesUpdateRecordForm);