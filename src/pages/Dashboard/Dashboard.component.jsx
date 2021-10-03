import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// SVG's
import { ReactComponent as ChartDown} from '../../svg/iconmonstr-chart-9.svg';
import { ReactComponent as ChartUp} from '../../svg/iconmonstr-chart-6.svg';
import { ReactComponent as Cash} from '../../svg/iconmonstr-banknote-15.svg';
import { ReactComponent as Wallet} from '../../svg/wallet-outline.svg';
import { ReactComponent as RefreshIcon} from '../../svg/refreshIcon.svg';
// COMPONENTS
import WalletTable from './WalletTable/WalletTable.component';
import LineChart from '../../components/LineChart/LineChart.component';
import PolarChart from '../../components/PolarChart/PolarChart.component';
import Button from '../../components/button/Button.component';
// ACTIONS
import { recalcData } from '../../redux/user/user.actions';


const Dashboard = ({ theme, totalValue, profit, percentageWalletChange, chartData, wallet, recalcData }) => {

    return (
        <div className={`dashboard-${theme} dashboard`}>
            <div className='dashboard__cardContainer'>

            <div className='dashboard__card--container'>
                <div className='dashboard__card dashboard__percentageWalletChange'>
                {
                    percentageWalletChange >= 0 ?
                    <div className={`dashboard__percentageWalletChange--cardLeft dashboard__percentageWalletChange--cardLeft-up-${theme}`}>
                        <ChartUp className='dashboard__percentageWalletChange--chart' />
                    </div>
                    :
                    <div className={`dashboard__percentageWalletChange--cardLeft dashboard__percentageWalletChange--cardLeft-down-${theme}`}>
                        <ChartDown className='dashboard__percentageWalletChange--chart' />
                    </div>
                }
                    
                    <div className='dashboard__percentageWalletChange--text'>
                        <h1 className='dashboard__percentageWalletChange--header dashboard__card--header'> Percentage wallet change </h1>
                        {
                            percentageWalletChange >= 0 ? 
                            <h2 className={`dashboard__card--value dashboard__card--value-up-${theme}`}> + {percentageWalletChange} % </h2>
                            :
                            <h2 className={`dashboard__card--value dashboard__card--value-down-${theme}`}> {percentageWalletChange} % </h2>
                        }
                    </div>    
                </div>
                </div>

                    <div className='dashboard__card dashboard__walletValue'>
                        <Cash className='dashboard__walletValue--cash' /> 
                        <h1 className='dashboard__card--header'> Current Wallet Value </h1>
                        <h2 className='dashboard__walletValue--value dashboard__card--value'> {totalValue} $ </h2>
                    </div>

                <div className='dashboard__card--container'>
                    <div className='dashboard__card dashboard__usdWalletChange'>
                        <div className='dashboard__usdWalletChange--text'>
                            <h1 className='dashboard__card--header'> Profit in USD </h1>
                            {
                                profit >= 0 ?
                                <h2 className={`dashboard__card--value dashboard__card--value-up-${theme}`}> + {profit} $ </h2> 
                                :
                                <h2 className={`dashboard__card--value dashboard__card--value-down-${theme}`}> {profit} $ </h2>    

                            }                   
                        </div>
                            {
                                profit >= 0 ?
                                <div className={`dashboard__usdWalletChange--cardRight dashboard__usdWalletChange--cardRight-up-${theme}`}>
                                     <ChartUp className='dashboard__usdWalletChange--chart' />    
                                </div>
                                :
                                <div className={`dashboard__usdWalletChange--cardRight dashboard__usdWalletChange--cardRight-down-${theme}`}> 
                                    <ChartDown className='dashboard__usdWalletChange--chart' />
                                </div>
                            }

                    </div>

                </div>

            </div>
            <div className='dashboard__walletAndChart'>
                <div className='dashboard__wallet'>
                    <div className='dashboard__wallet--header'>
                        <Link to='/addRecord' ><Button text='Add Trades' theme={theme} /></Link>
                        <div className='dashboard__wallet--walletWrapper'>
                            <h1> WALLET </h1>
                            <Wallet className='dashboard__wallet--wallet'/>
                        </div>
                        <div onClick={recalcData} className='dashboard__wallet--recalcWrapper'>
                            <RefreshIcon className='dashboard__wallet--recalcIcon' />
                            <span className='dashboard__wallet--recalcSpan'> Recalculate data </span>
                        </div>
                    </div>
                    <WalletTable theme={theme} wallet={wallet} />
                </div>
                <div className='dashboard__lineChart'>
                {
                    chartData ?  <LineChart tickMark='$' height={200} times={chartData.chartTimes} values={chartData.chartValues} header={`${chartData.popularCurrency.toUpperCase()} VALUES`} chartColor='#f39c12' />
                    : <h2 className='dashboard__lineChart--text'>Add some transactions to see hourly chart of currency that you have the most in your wallet. </h2>
                }
                   
                </div>
            
            </div>
            <div className='dashboard__additionalData'>
                   <div className='dashboard__polarChart'>
                   {
                       wallet ?  <PolarChart theme={theme} wallet={wallet} /> 
                       : <h2 className='dashboard__polarChart--text'> Add some transaction to see wallet chart </h2>
                   }
                   </div> 
                   <div className='dashboard__lineChart'>
                    {
                        chartData ?  <LineChart tickMark='$' height={200} times={chartData.chartTimes} values={chartData.chartMarketCapValues} header={`${chartData.popularCurrency.toUpperCase()} MARKET CUP`} chartColor='#7ed6df' />
                        : <h2 className='dashboard__lineChart--text'>Add some transactions to see market cap chart of currency that you have the most in your wallet. </h2>
                    }
                   </div>
            </div>
        </div>
)};

const mapStateToProps = state => ({
    totalValue: state.user.dashboardData.totalValue,
    profit: state.user.dashboardData.profit,
    percentageWalletChange: state.user.dashboardData.percentageWalletChange,
    chartData: state.user.dashboardData.chartData,
    wallet: state.user.dashboardData.wallet,
    theme: state.user.theme
});

const mapDispatchToProps = dispatch => ({
    recalcData: () => dispatch(recalcData())
})


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

