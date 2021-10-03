import React from 'react';
import Button from '../button/Button.component';
import { ReactComponent as Close} from '../../svg/close-outline.svg';

const AlertWindow = ({ text, highlight, onClick, hideWindow }) => {

    const handleConfirm = () => {
        onClick();
        hideWindow(true);

    };

    

    return (
        <div className='alertWindow'>
            <div className='alertWindow__container'>
                <div className='close'>
                    <Close onClick={() => hideWindow(true)} className='close--icon'/>
                </div>
                <p className='alertWindow__text'> {text} </p>
                <div className='alertWindow__buttons'>
                    <Button onClick={() => hideWindow(true)} text={'CANCEL'} />
                    <Button onClick={handleConfirm} text={'CONFIRM'} /> 
                </div>
            </div>
        </div>
    );
};

export default AlertWindow;