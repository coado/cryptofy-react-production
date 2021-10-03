import React, { useState } from 'react';
import { connect } from 'react-redux';

// SPOT IMPORTS
import SpotTable from './Spot/Table/SpotTable.component';
import SpotAddRecordForm from './Spot/Form/SpotAddRecordForm.component';
import SpotUpdateRecordForm from './Spot/Form/SpotUpdateRecordForm.component';
// FUTURES IMPORTS
import FuturesTable from './Futures/Table/FuturesTable.component';
import FuturesAddRecordForm from './Futures/Form/FuturesAddRecordForm.component';
import FuturesUpdateRecordForm from './Futures/Form/FuturesUpdateRecordForm.component';

// STATS TABLE IMPORT
import StatsTable from './StatsTable/StatsTable.component'; 

import ChartContainer from './ChartContainer/ChartContainer.component';
import Button from '../../components/button/Button.component';
import Label from '../../components/Label/Label.component';
import StatisticCard from './StatisticCard/StatisticCard.component';
import { setWalletTrackerLabel } from '../../redux/error/error.actions';
import { userSpotDelete, setSpotTableLoading, userFutureDelete, setFuturesTableLoading } from '../../redux/user/user.actions';


const WalletTrackerPage = ({ theme, futureData, spotData, setFuturesTableLoading, userFutureDelete, setWalletTrackerLabel, label, id, userSpotDelete, setSpotTableLoading }) => {
    


    const [spotUploadForm, setSpotUploadForm] = useState(true);
    const [spotUpdateForm, setSpotUpdateForm] = useState(true);
    const [futuresUploadForm, setFuturesUploadForm] = useState(true);
    const [futuresUpdateForm, setFuturesUpdateForm] = useState(true);


    const [nodeArrTransactions, setNodeArrTransactions] = useState([]);
    const [nodeArrFutures, setNodeArrFutures] = useState([]);
    const [editTransactionData, setEditTransactionData] = useState({
        id,
        objectID: null,
        buyCurrency: '',
        buyAmount: null,
        buyCourse: null,
        buyDate: null,
        profit: null,
        sellAmount: null,
        sellCourse: null,
        sellDate: null        
    });

    const [editFutureData, setEditFutureData] = useState({
        id,
        objectID: null,
        typeOfFuture: '',
        contract: '' ,
        profit: '',
        date: ''     
    });

    const deleteRecordsTransactions = () => {
        const deleteArr = nodeArrTransactions.filter(el => el.checked === true).map(el => el.dataset.id);
        if (deleteArr.length === 0) return;
        nodeArrTransactions.forEach(el => el.checked = false);
        setSpotTableLoading();
        userSpotDelete({
            id,
            records: deleteArr
        })
    }

    const deleteRecordsFutures = () => {
        const deleteArr = nodeArrFutures.filter(el => el.checked === true).map(el => el.dataset.id);
        if (deleteArr.length === 0) return;
        nodeArrFutures.forEach(el => el.checked = false);
        
        setFuturesTableLoading();
        userFutureDelete({
            id,
            records: deleteArr
        })
        
    }

    return (
    
    <div className={`walletTracker-${theme} walletTracker`}>
    {
        label.status ? <Label status='error' message={label.message} hideLabel={() => setWalletTrackerLabel({status : false, message: ''})} /> : null
    }
    {
        spotUploadForm ? null :  <SpotAddRecordForm theme={theme} setSpotTableLoading={setSpotTableLoading} id={id} setWalletTrackerLabel={setWalletTrackerLabel} hideForm={() => setSpotUploadForm(true)} />
    }
    {
        spotUpdateForm ? null : <SpotUpdateRecordForm theme={theme} setSpotTableLoading={setSpotTableLoading} editData={editTransactionData} setEditData={setEditTransactionData} setWalletTrackerLabel={setWalletTrackerLabel} hideForm={() => setSpotUpdateForm(true)} />
    }
    
    {
        futuresUpdateForm ? null : <FuturesUpdateRecordForm theme={theme} setWalletTrackerLabel={setWalletTrackerLabel} setFuturesTableLoading={setFuturesTableLoading} editData={editFutureData} setEditData={setEditFutureData} hideForm={() => setFuturesUpdateForm(true)} />
    }

    {
       futuresUploadForm ? null :  <FuturesAddRecordForm theme={theme} setWalletTrackerLabel={setWalletTrackerLabel} setFuturesTableLoading={setFuturesTableLoading} id={id} hideForm={() => setFuturesUploadForm(true)} />
    }
        <div className='walletTracker__spotAndFutures'> 
           
                <div className='walletTracker__wrapper'>
                    <div className='walletTracker__table--header'>
                        <div className='walletTracker__table--buttons'>
                            <Button styles={{marginTop: '0'}} text='Add new record' onClick={() => setSpotUploadForm(false)} />
                            <Button onClick={deleteRecordsTransactions} styles={{marginTop: '0'}} text='Delete record' />
                        </div>
                        <h1 className='walletTracker__table--text'> SPOT </h1>

                    </div>
                    <SpotTable theme={theme} averageProfit={spotData.averageProfitPerOneTransaction} setEditData={setEditTransactionData} setHiddenUpdateForm={setSpotUpdateForm} setNodeArr={setNodeArrTransactions} />

                </div>

                <div className='walletTracker__wrapper'>
                    <div className='walletTracker__table--header'>
                        <div className='walletTracker__table--buttons'>
                            <Button styles={{marginTop: '0'}} text='Add new record' onClick={() => setFuturesUploadForm(false)} />
                            <Button onClick={deleteRecordsFutures} styles={{marginTop: '0'}} text='Delete record' />
                        </div>
                        <h1 className='walletTracker__table--text'> FUTURES </h1>

                    </div>
                        <FuturesTable theme={theme} averageProfit={futureData.averageProfitPerOneTransaction} setHiddenUpdateForm={setFuturesUpdateForm} setEditData={setEditFutureData} setNodeArr={setNodeArrFutures} />
                </div>
        </div>

            <div className='walletTracker__cards'>   
                    <div className='walletTracker__cards--wrapper'>
                        <StatisticCard type='transactions' header='Total Profit' dolar={true} data={spotData.totalProfit ? spotData.totalProfit : null} />
                        <StatisticCard type='transactions' header='total transactions' dolar={false} data={spotData.totalTransactionsAmount ? spotData.totalTransactionsAmount : null} />  
                    </div>
                    <div className='walletTracker__cards--wrapper'>
                        <StatisticCard type='futures' header='Total Profit' dolar={true} data={futureData.totalProfit ? futureData.totalProfit : null} />
                        <StatisticCard type='futures' header='total transactions' dolar={false} data={futureData.totalTransactionsAmount ? futureData.totalTransactionsAmount : null} /> 
                    </div>
                    </div>
        

        <div className='walletTracker__statsAndCharts'>
            
            <div className='walletTracker__charts'>
                <div className='walletTracker__charts--wrapper'>
                    <h1 className='walletTracker__charts--header'> Spot </h1>
                    <div className='walletTracker__charts--box'>
                        <ChartContainer data={spotData.monthlyProfitChartdata} text='Add some spot transactions to see chart' color='#f39c12' type={1} />
                        <ChartContainer data={spotData.monthlyProfitChartdata} text='Add some spot transactions to see chart'  color='#7ed6df' type={0} />
                    </div>
                </div>
                <div className='walletTracker__charts--wrapper'>
                    <h1 className='walletTracker__charts--header'> Futures </h1>
                    <div className='walletTracker__charts--box'>
                        <ChartContainer data={futureData.monthlyProfitChartdata} text='Add some spot transactions to see chart' color='#f39c12' type={1} />
                        <ChartContainer data={futureData.monthlyProfitChartdata} text='Add some spot transactions to see chart'  color='#7ed6df' type={0} />
                    </div>
                </div>
            </div>

            <div className='walletTracker__stats'>
                <h1 className='walletTracker__stats--header'> STATS </h1>
                <StatsTable spotData={spotData} futureData={futureData} />


                <div className='walletTracker__stats--card'>
                    <div className='walletTracker__stats--circle'></div>
                    <div className={`walletTracker__stats--cardContainer-${theme} walletTracker__stats--cardContainer`}>
                        <p>Cash Flow: {spotData.cashFlow + futureData.cashFlow}$ </p>
                        <p>Total profit: {spotData.totalProfit + futureData.totalProfit}$</p>
                        
                             
                            <p>Every dolar invested in futures <br></br> makes you
                            {
                                futureData.totalProfit && futureData.cashFlow ?
                               ` ${(Math.round(futureData.totalProfit / futureData.cashFlow*100)) / 100}$ ` 
                               : ' 0$ '
                            }    
                            richer </p>
                        
                            <p>Every dolar invested in transactions <br></br> makes you
                            {
                                spotData.totalProfit && spotData.cashFlow ?
                               ` ${(Math.round(spotData.totalProfit / spotData.cashFlow*100)) / 100}$ ` 
                               : ' 0$ '
                            }    
                            richer </p>
                        </div>
                    
                </div>
            </div>
            </div>
        
    </div>
)}

const mapDispatchToProps = dispatch => ({
    setWalletTrackerLabel: data => dispatch(setWalletTrackerLabel(data)),
    userSpotDelete: data => dispatch(userSpotDelete(data)),
    setSpotTableLoading: () => dispatch(setSpotTableLoading()),
    setFuturesTableLoading: () => dispatch(setFuturesTableLoading()),
    userFutureDelete: data => dispatch(userFutureDelete(data))
});

const mapStateToProps = state => ({
    label: state.error.walletTrackerLabel,
    id: state.user.currentUser._id,
    spotData: state.user.walletTrackerTransactionData,
    futureData: state.user.walletTrackerFuturesData,
    theme: state.user.theme
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletTrackerPage);