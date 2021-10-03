import React from 'react';
import { ReactComponent as CloseIcon} from '../../svg/close-outline.svg';

const Close = ({ onClick }) => (
    <div className='close'>
        <CloseIcon className='close--icon' onClick={onClick} />
    </div>
); 

export default Close;