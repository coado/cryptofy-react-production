import React from 'react';
import { connect } from 'react-redux';
// ACTIONS
import { userTradeUpdate } from '../../../redux/user/user.actions';
// UTIL FUNCTIONS
import { checkTradeType, sliceComment, replaceComma, checkNumberField } from '../../../utils/form.funtions';
// COMPONENTS
import Button from '../../../components/button/Button.component';
import CurrenciesList from '../../../components/List/CurrenciesList.component';
import Close from '../../../components/Close/Close.component';

const EditRecordForm = ({ setHiddenUploadEdit, editData, setEditData, userTradeUpdate, setTradeLabel, setTableLoading }) => {
    
    let { typeOfTrade, buyCurrency, buyAmount, sellCurrency, sellAmount, comment, date} = editData;

    const onChange = e => {
        const { name, value } = e.target;
        
        setEditData(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = e => {
       e.preventDefault();

          // Checking if trade type is correct
          if(!checkTradeType(editData.typeOfTrade)) {
            setHiddenUploadEdit(true);
            return setTradeLabel({
                status: true,
                message: 'Type of trade is not correct. Please try again.'
            })
        };

        if (typeOfTrade === 'Deposit') {
            editData.sellAmount = "0";
            editData.sellCurrency = "-";
        };

        if (typeOfTrade === 'Withdrawal') {
            editData.buyAmount = "0";
            editData.buyCurrency = '-';
        }

         // Slice comment every 20 characters
         editData.comment = sliceComment(editData.comment);

        // replacing , with . 
        editData.buyAmount = replaceComma(editData.buyAmount);
        editData.sellAmount = replaceComma(editData.sellAmount);

        // checking if in amount fields is number
        if(checkNumberField(editData.buyAmount, editData.sellAmount)) {
            setHiddenUploadEdit(true);
            return setTradeLabel({
                status: true,
                message: 'Please provide only numbers in amount fields.'
            })
        }

        editData.buyCurrency = editData.buyCurrency.toLowerCase();
        editData.sellCurrency = editData.sellCurrency.toLowerCase();
       
       setTableLoading()
       userTradeUpdate(editData);
       setHiddenUploadEdit(true);
    }

    return (
    <div className='editRecordForm'>
        <div className='editRecordForm__container'>
            <form onSubmit={handleSubmit} className='editRecordForm__form' id='editRecordForm-form'> 
                <Close onClick={() => setHiddenUploadEdit(true)} />
                <h1 className='editRecordForm__header'>Edit Record</h1>
                <div className='editRecordForm__type'>
                    <label htmlFor='editRecordForm__type'> TYPE: </label>
                    <input onChange={onChange} defaultValue={typeOfTrade} required name='typeOfTrade' id='editRecordForm__type' list='types__edit' className='editRecordForm__input' type="text" placeholder="type" />
                </div>
                <datalist id="types__edit">
                    <option value="Trade" />
                    <option value="Deposit" />
                    <option value="Withdrawal" />
                    <option value="Mining" />
                </datalist>
                <CurrenciesList />

                <div className='editRecordForm__buysell'>
                <div className='editRecordForm__buy'>
                    <label htmlFor='editRecordForm__input--buy'>BUY: </label>
                    <input disabled={typeOfTrade === 'Withdrawal' ? 'disabled' : ''} list='currencies' onChange={onChange} defaultValue={buyCurrency} required name='buyCurrency' id='editRecordForm__input--buy' className='editRecordForm__input' type="text" placeholder="currency" />
                    <input disabled={typeOfTrade === 'Withdrawal' ? 'disabled' : ''} onChange={onChange} defaultValue={buyAmount} required name='buyAmount' className='editRecordForm__input' type="text" placeholder="amount" />
                </div>
                <div className='editRecordForm__sell'>
                    <label htmlFor='editRecordForm__input--sell'>SELL: </label>
                    <input disabled={typeOfTrade === 'Deposit' ? 'disabled' : ''} list='currencies' onChange={onChange} defaultValue={sellCurrency} required name='sellCurrency' id='editRecordForm__input--sell' className='editRecordForm__input' type="text" placeholder="currency" />
                    <input disabled={typeOfTrade === 'Deposit' ? 'disabled' : ''} onChange={onChange} defaultValue={sellAmount} required name='sellAmount' className='editRecordForm__input' type="text" placeholder="amount" />
                </div>
                </div>
                <div className='editRecordForm__comment'>
                    <label className='editRecordForm__comment--label' htmlFor='editRecordForm__comment'>COMMENT: </label>
                    <input onChange={onChange} defaultValue={comment} name='comment' id='editRecordForm__comment'  className='editRecordForm__comment--input editRecordForm__input' /> 
                </div>
                <div className='editRecordForm__footer'>
                    <div className='editRecordForm__date'>
                        <label htmlFor='editRecordForm__date'>DATE: </label>
                        <input onChange={onChange} defaultValue={date} required name='date' id='editRecordForm__date' className='editRecordForm__input ' type="date" placeholder="date" />
                    </div>
                    <Button type='submit' text='APPLY' styles={{
                        padding: '1rem 3rem',
                        marginLeft: '10rem',
                        marginTop: '2rem'
                    }}/>
                </div>
            </form>
        </div>
    </div>
)};

const mapDispatchToProps = dispatch => ({
    userTradeUpdate: data => dispatch(userTradeUpdate(data))
});

export default connect(null, mapDispatchToProps)(EditRecordForm);