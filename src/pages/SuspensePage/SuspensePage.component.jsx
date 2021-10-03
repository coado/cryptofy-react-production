import React from 'react';
import Spinner from '../../components/Spinner/Spinner.component';

const SuspensePage = ({ theme }) => (
    <div className={`suspense suspense__${theme}`}>
        <Spinner theme={theme} />
    </div>
);

export default SuspensePage;