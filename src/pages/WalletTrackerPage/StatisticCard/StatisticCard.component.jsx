import React from 'react';

const StatisticCard = ({ data, header, dolar, type }) => (
    <div className='statisticCard'>
        <div className='statisticCard__container'>
            <div style={{backgroundColor: data >= 0 ? '#32ff7e' : '#ff3838'}} className='statisticCard__header'>
                <h1>{header}</h1>
                <p>{type}</p>
            </div>
            {
                data ? <h2> {data}{dolar ? '$'  : null} </h2>
                : <h2> - </h2>
            }                    
        </div>   
    </div>
);

export default React.memo(StatisticCard);