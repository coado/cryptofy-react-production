import React from 'react';

const NotFoundPage = () => (
    <div className='notFoundPage'>
        <div className='notFoundPage__textWrapper'>
            <h1 className='notFoundPage__404'> 404 </h1>
            <h2 className='notFoundPage__header'> page not found </h2>
            <p className='notFoundPage__text'> The page you were looking for does not exist.
                Please try going back to previous page.
             </p>
        </div>
    </div>
);

export default NotFoundPage;