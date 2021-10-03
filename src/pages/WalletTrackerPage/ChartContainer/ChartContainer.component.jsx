import React from 'react';
import LineChart from '../../../components/LineChart/LineChart.component';

// type toggle between efficiency and values
const ChartContainer = ({ data, text, color, type }) => (
    <div className='chartContainer'>
        {
            data ?
            <LineChart tickMark={type ? '$' : '%'} header={ type ? 'monthly profits' : 'efficiency'} width={300} height={300} times={type ? data.profitTimes : data.efficiencyTimes} values={type ? data.profitValues : data.efficiencyValues} chartColor={color} />
            :
            <h1 className='chartContainer__alternativeText'> { text } </h1>
        }
    </div>
)

export default ChartContainer;