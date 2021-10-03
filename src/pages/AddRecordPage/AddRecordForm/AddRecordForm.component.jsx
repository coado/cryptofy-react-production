import React, { useState } from 'react';
import { connect } from 'react-redux';
// ACTIONS
import { userTradeUpload } from '../../../redux/user/user.actions';
// UTIL FUNCTIONS
import { checkTradeType, sliceComment, replaceComma, checkNumberField } from '../../../utils/form.funtions';
// COMPONENTS
import Close from '../../../components/Close/Close.component';
import Button from '../../../components/button/Button.component';
import CurrenciesList from '../../../components/List/CurrenciesList.component';

const AddRecordForm = ({ userTradeUpload, id, setHiddenUploadForm, setTradeLabel, setTableLoading }) => {
   
    const [data, setData] = useState({
        id,
        typeOfTrade: '',
        buyCurrency: '',
        buyAmount: null,
        sellCurrency: '',
        sellAmount: null,
        comment: '',
        date: null
    });

    const onChangeHandle = e => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Checking if trade type is correct
        if(!checkTradeType(data.typeOfTrade)) {
            setHiddenUploadForm(true);
            return setTradeLabel({
                status: true,
                message: 'Type of trade is not correct. Please try again.'
            })
        };

        if (data.typeOfTrade === 'Deposit') {
            data.sellAmount = "0";
            data.sellCurrency = "-";
        };

        if (data.typeOfTrade === 'Withdrawal') {
            data.buyAmount = "0";
            data.buyCurrency = '-';
        }


        // Slice comment every 20 characters
        data.comment = sliceComment(data.comment);

        // replacing , with . 
        data.buyAmount = replaceComma(data.buyAmount);
        data.sellAmount = replaceComma(data.sellAmount);

        // checking if in amount fields is number
        if(checkNumberField(data.buyAmount, data.sellAmount)) {
            setHiddenUploadForm(true);
            return setTradeLabel({
                status: true,
                message: 'Please provide only numbers in amount fields.'
            })
        }
       
        data.buyAmount = data.buyAmount*1;
        data.sellAmount = data.sellAmount*1;
        data.buyCurrency = data.buyCurrency.toLowerCase();
        data.sellCurrency = data.sellCurrency.toLowerCase();
        
        setTableLoading();
        userTradeUpload(data);
        document.getElementById('enterCoins-form').reset();
        setHiddenUploadForm(true);
        
    }

return (
        <div className='addRecordForm'>
            <div className='addRecordForm__container'>
                <form onSubmit={handleSubmit} className='addRecordForm__form' id='enterCoins-form'> 
                    <Close onClick={() => setHiddenUploadForm(true)} />
                    <h1 className='addRecordForm__text'> Add new record </h1>
                    <div className='addRecordForm__type'>
                        <label htmlFor='addRecordForm__type'> TYPE: </label>
                        <input required onChange={onChangeHandle} name='typeOfTrade' id='addRecordForm__type' list='types' className='addRecordForm__input' type="text" placeholder="type" />
                    </div>
                        <datalist id="types">
                            <option value="Trade" />
                            <option value="Deposit" />
                            <option value="Withdrawal" />
                            <option value="Mining" />
                        </datalist>
                    <CurrenciesList />
                        
                    <p className='addRecordForm__paragraph' style={data.typeOfTrade === 'Deposit' ?  null : {opacity: "0"}}> Use deposit if you just want provide crypto to system.  </p>

                    <div className='addRecordForm__buysell'>
                        <div className='addRecordForm__buy'>
                            <label htmlFor='addRecordForm__input--buy'> {
                                data.typeOfTrade === 'Deposit' ? "CURRENCY: " : "BUY: " 
                            } </label>
                            <input disabled={data.typeOfTrade === 'Withdrawal' ? 'disabled' : ''} list='currencies' required onChange={onChangeHandle} name='buyCurrency' id='addRecordForm__input--buy' className='addRecordForm__input' type="text" placeholder="currency" />
                            <input disabled={data.typeOfTrade === 'Withdrawal' ? 'disabled' : ''} required onChange={onChangeHandle} name='buyAmount' className='addRecordForm__input' type="text" placeholder="amount" />
                        </div>
                        <div className='addRecordForm__sell'>
                            <label htmlFor='addRecordForm__input--sell'> {
                                data.typeOfTrade === 'Deposit' ? "USD: " : "SELL: " 
                            } </label>
                            <input  disabled={data.typeOfTrade === 'Deposit' ? 'disabled' : ''} list='currencies' required onChange={onChangeHandle} name='sellCurrency' id='addRecordForm__input--sell' className='addRecordForm__input' type="text" placeholder="currency" />
                            <input  disabled={data.typeOfTrade === 'Deposit' ? 'disabled' : ''}   required onChange={onChangeHandle} name='sellAmount' className='addRecordForm__input' type="text" placeholder="amount" />
                        </div>
                    </div>
                    <div className='addRecordForm__comment--container'>
                        <label className='addRecordForm__comment--label' htmlFor='addRecordForm__comment'>COMMENT: </label>
                        <input onChange={onChangeHandle} name='comment' id='addRecordForm__comment'  className='addRecordForm__comment' /> 
                    </div>
                    <div className='addRecordForm__footer'>
                        <div className='addRecordForm__date'>
                            <label htmlFor='addRecordForm__date'>DATE: </label>
                            <input required onChange={onChangeHandle} name='date' id='addRecordForm__date' className='addRecordForm__input' type="date" placeholder="date" />
                        </div>
                        <Button text='APPLY' styles={{
                            fontSize: "1.5rem",
                            padding: "1rem 2.5rem",
                            marginRight: "3.5rem"
                        }}/> 
                    
                    </div>
                </form>
            </div>
        </div>    

)};

const mapDispatchToProps = dispatch => ({
    userTradeUpload: data => dispatch(userTradeUpload(data))
});

const mapStateToProps = state => ({
    id: state.user.currentUser._id
})
export default connect(mapStateToProps, mapDispatchToProps)(AddRecordForm);
