import React from 'react';

const StatsTable = ({ spotData, futureData }) => (

    <table className='statsTable'>
         <thead>
             <tr>
                 <th>TITLE</th>
                 <th>SPOT</th>
                 <th>FUTURES</th>
             </tr>
         </thead>

        <tbody>
            <tr>
                <td className='statsTable--title'>Average profit per one transaction:</td>
                <td>{spotData.averageProfitPerOneTransaction}$</td>
                <td>{futureData.averageProfitPerOneTransaction}$</td>
            </tr>
            <tr>
                <td className='statsTable--title'>highest profit:</td>
                <td>{spotData.highestProfit}$</td>
                <td>{futureData.highestProfit}$</td>
            </tr>
            <tr>
                <td className='statsTable--title'>lowest profit:</td>
                <td>{spotData.lowestProfit}$</td>
                <td>{futureData.lowestProfit}$</td>
            </tr>

            <tr>
                <td className='statsTable--title'>first Trade:</td>
                <td>{spotData.firstTrade}</td>
                <td>{futureData.firstTrade}</td>
            </tr>
            <tr>
                <td className='statsTable--title'>last trade:</td>
                <td>{spotData.lastTrade}</td>
                <td>{futureData.lastTrade}</td>
            </tr>

            <tr>
                <td className='statsTable--title'>Average moves per month:</td>
                <td>{spotData.averageTransactionsPerMonth}</td>
                <td>{futureData.averageTransactionsPerMonth}</td>
            </tr>
            <tr>
                <td className='statsTable--title'>Highest amount of moves per month:</td>
                <td>{spotData.highestTransactionsAmountInMonth}</td>
                <td>{futureData.highestTransactionsAmountInMonth}</td>
            </tr>
            <tr>
                <td className='statsTable--title'>Highest amount of moves in month:</td>
                <td>{spotData.highestTransactionsDate}</td>
                <td>{futureData.highestTransactionsDate}</td>
            </tr>
            <tr>
                <td className='statsTable--title'>The best month:</td>
                <td>{spotData.bestMonth}</td>
                <td>{futureData.bestMonth}</td>
            </tr>
            <tr>
                <td className='statsTable--title'>The worste month:</td>
                <td>{spotData.worstMonth}</td>
                <td>{futureData.worstMonth}</td>
            </tr>
        </tbody>
    </table>

)

export default StatsTable;