import React from 'react';
import { connect } from 'react-redux';
// COMPONENTS
import WalletRow from './WalletRow.component';
import Spinner from '../../../components/Spinner/Spinner.component';

const WalletTable = ({ wallet, tableLoading, theme }) => (
                 <div className='dashboard__wallet--container'>
                    <div className={`dashboard__wallet--tableHeader dashboard__wallet--tableHeader-${theme}`}>
                        <table className='dashboard__wallet--table'>
                            <thead>
                                <tr>
                                    <th>Currency</th>
                                    <th>Amount</th>
                                    <th>Value in USD/BTC</th>
                                    <th>Average Entry Price in USD/BTC</th>
                                    <th>Current Price in USD/BTC</th>
                                    <th>Percentage</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className='dashboard__wallet--content'>
                    {
                        tableLoading ? <Spinner /> : null
                    }
        
                        <table className='dashboard__wallet--table'>
                            <tbody>
                            
                               { wallet ?
                                   Object.entries(wallet).map((el, i) => <WalletRow
                                                                theme={theme}
                                                                currency={el[0]}
                                                                course={el[1].course}
                                                                amount={(Math.round(el[1].amount*10**5))/10**5}
                                                                value={el[1].value}
                                                                percentage={el[1].percentage}
                                                                averageCourseEntry={el[1].prevCourse >= 1 ?
                                                                    ((Math.round(el[1].prevCourse*10**3))/10**3) 
                                                                    : 
                                                                    ((Math.round(el[1].prevCourse*10**8))/10**8) 
                                                                }
                                                                key={i}
                                                                to={el[1].to}
                                                                percentageProfit={Math.round(((el[1].value / el[1].prevValue) * 100 - 100)*100) / 100}
                                                                valueProfit={ el[1].value - el[1].prevValue >= 1 ?
                                                                    Math.round((el[1].value - el[1].prevValue)*10**3) / 10**3
                                                                    :
                                                                    Math.round((el[1].value - el[1].prevValue)*10**8) / 10**8
                                                                }
                                                                style={tableLoading ? {display: "none"} : null}
                                                                />)
                                                                : null
                               }
                               
                               
                            </tbody>
                        </table>
                    </div>
                </div>
);

const mapStateToProps = state => ({
    tableLoading: state.user.tableLoading
})


export default connect(mapStateToProps)(React.memo(WalletTable));