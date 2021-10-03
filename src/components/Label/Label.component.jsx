import React from 'react';
import { ReactComponent as Close} from '../../svg/close-outline.svg';

const Label = ({status, message, hideLabel}) => {
    
    return <div className={`label label__${status}`}>
    <div  className='close'>
                <Close onClick={hideLabel} style={{margin: '.2rem'}} className='close--icon' />
            </div>
    <p className='label__text'> { message } </p> </div>
};

export default Label;