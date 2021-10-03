import { takeLatest, put, all, call } from 'redux-saga/effects';
import axios from 'axios';
import UserActionTypes from './user.types';
import { signSuccess, 
         signFailure, 
         unsetTableLoading,
         setTableLoading, 
         updateUserWallet, 
         updateUserSpot, 
         unsetSpotTableLoading,
         setSpotTableLoading, 
         updateUserFuture,
         unsetFuturesTableLoading,
         setFuturesTableLoading,
         changeTheme,
         disActiveSpinnerLoader
        } from './user.actions';
import { setLoginLabel, setTradeLabel } from '../error/error.actions';
import fetchingData from '../../utils/fetchingData';
import calculatingWalletData from '../../utils/calculatingWalletData';
import { calculatingTransactionData, calculatingFutureData } from '../../utils/calculatingWalletTrackerData';



export function* signUp({payload: {email, password, confirmPassword}}) {
    try {
    
        const res = yield axios.post('https://cryptofy-react.herokuapp.com/signup', {
            email,
            password,
            confirmPassword
        });
        if(res.data.status === 'success') {
            const { user } = res.data.data;
            // 1) FETCHING DATA
            const walletData = yield calculatingWalletData(user.trades);
            const transactionData = yield calculatingTransactionData(user.transactions);
            const futureData = yield calculatingFutureData(user.futures);
           
            // 2) SAVING USER AND FATCHED DATA
            yield put(signSuccess({...res.data,
                                  walletData,
                                  transactionData,
                                  futureData,
                                  theme: user.theme
                                }))
            yield put(setLoginLabel({status: res.data.status, message: res.data.message}))
        } else {
            yield put(signFailure())
            yield put(setLoginLabel(res.data))
        }
    } catch(error) {
        console.log('Something wrong with signing up', error);
    }
};

export function* signIn({payload: {email, password}}) {
    try {
        const res = yield axios.post('https://cryptofy-react.herokuapp.com/signin', {
            email,
            password
        });
        
        if(res.data.status === 'success') {
            const { user } = res.data.data;
            const walletData = yield calculatingWalletData(user.trades);
            const transactionData = yield calculatingTransactionData(user.transactions);
            const futureData = yield calculatingFutureData(user.futures);
            yield put(signSuccess({...res.data,
                                    walletData,
                                    transactionData,
                                    futureData,
                                    theme: user.theme
                                }))
            yield put(setLoginLabel({status: res.data.status, message: res.data.message}))

        } else {
            yield put(signFailure())
            yield put(setLoginLabel(res.data))
        }
        
    } catch(error) {
        console.log('Something wrong with signing in ', error);
        
    }
}

export function* isUserLogedIn() {
    try {   
        const res = yield axios.get('https://cryptofy-react.herokuapp.com/auth');
  
        if (res.data.status === 'success') {
            const { user } = res.data.data;
            // 1) FETCHING DATA
            const walletData = yield calculatingWalletData(user.trades);
            const transactionData = yield calculatingTransactionData(user.transactions);
            const futureData = yield calculatingFutureData(user.futures);
            // 2) SAVING USER AND FATCHED DATA
            yield put(signSuccess({...res.data,
                                  walletData,
                                  transactionData,
                                  futureData,
                                  theme: user.theme
                                }))
            yield put(disActiveSpinnerLoader());
        } else {
            yield put(signFailure({
                status: '',
                messsage: ''
            }))
            yield put(disActiveSpinnerLoader());
        }
    } catch(error) {
        console.log(error);
    }
};

export function* userLogout() {
    try {
        const res = yield axios.get('https://cryptofy-react.herokuapp.com/logout');
        
        if (res.data.status === 'success') {
            window.location.reload(true)
        }

    } catch(error) {
        console.log(error);
    }
}

export function* userTradeUpload({payload: {id, typeOfTrade, buyCurrency, buyAmount, sellCurrency, sellAmount, comment, date}}) {
    try {
        let courseData;
        let course = null;
        let tradeProfit = null;
        let sellCurrencyCourse = null;
        if (typeOfTrade === 'Deposit' || typeOfTrade === 'Mining') {     
             courseData = yield fetchingData(buyCurrency, 'usd');
             if (Object.keys(courseData).length === 0) {
                 throw Error;
             }
             course = yield Object.values(courseData)[0].usd;
        } else if (typeOfTrade === 'Trade') {
                // in case that someone sold stable coin like tether,
                // counting course from selling stable coin
                if (sellCurrency === 'tether' || sellCurrency === 'binance-usd' || sellCurrency === 'dai' || sellCurrency === 'paxos-standard') {
                    course = sellAmount / buyAmount;
                } else if (buyCurrency === 'tether' || buyCurrency === 'binance-usd' || buyCurrency === 'dai' || buyCurrency === 'paxos-standard') {
                    course = 1;
                } else if (sellCurrency === 'bitcoin') {
                    course = (Math.round(sellAmount / buyAmount * 10**7) / 10**7);
                }
                
                else {
                        courseData = yield fetchingData(`${buyCurrency},${sellCurrency}`, 'usd');
                        if (Object.keys(courseData).length < 2) {
                            throw Error;
                        }
                        course =  courseData[buyCurrency].usd;
                        sellCurrencyCourse = courseData[sellCurrency].usd
                        tradeProfit = (Math.round(((course*buyAmount) - (sellCurrencyCourse*sellAmount))*100)) / 100;
                }
            } else if (typeOfTrade === 'Withdrawal') {
            courseData = yield fetchingData(sellCurrency, 'usd');
            course = yield Object.values(courseData)[0].usd;
        }

        const res = yield axios.put('https://cryptofy-react.herokuapp.com/newTradeRecord', {
            id,
            typeOfTrade,
            buy: {
                currency: buyCurrency,
                amount: buyAmount
            },
            sell: {
                currency: sellCurrency,
                amount: sellAmount
            },
            comment,
            date,
            course,
            tradeProfit
        });
        if(res.data.status === 'success') {

             const walletData = yield calculatingWalletData(res.data.user.trades);
             yield put(updateUserWallet({currentUser: res.data.user, 
                                   walletData
                                }));
             yield put(unsetTableLoading());

        } else {
            
            yield put(setTradeLabel({
                status: true,
                message: res.message
            }));
            yield put(unsetTableLoading());
        }

    } catch(error) {
         yield put(setTradeLabel({status: true, message: 'There was a problem with provided currency. Please try again.'}))
         yield put(unsetTableLoading());
        console.log(error);
    }
}

export function* deleteUserTrade({ payload: { id, records }}) {
    try {
        const res = yield axios.put('https://cryptofy-react.herokuapp.com/deleteTrade', { 
            id,
            records
        });

        if(res.data.status === 'success') {
            const walletData = yield calculatingWalletData(res.data.user.trades);
                yield put(updateUserWallet({currentUser: res.data.user, 
                                      walletData
                                    }));
                yield put(unsetTableLoading());
        } else {
            yield put(setTradeLabel({
                status: true,
                message: res.message
            }));
            yield put(unsetTableLoading());
        }
    } catch(error) {
        console.log(error);
        yield put(unsetTableLoading());
    }
};

export function* userTradeUpdate({payload: {id, objectID, typeOfTrade, buyCurrency, buyAmount, sellCurrency, sellAmount, comment, date}}) {

    try {
        let courseData;
        let course = null;
        let tradeProfit = null;
        let sellCurrencyCourse = null;
        if (typeOfTrade === 'Deposit' || typeOfTrade === 'Mining') {     
             courseData = yield fetchingData(buyCurrency, 'usd');
 
             if (Object.keys(courseData).length === 0) {
                 throw Error;
             }
             course = yield Object.values(courseData)[0].usd;
        } else if (typeOfTrade === 'Trade') {
                // in case that someone sold stable coin like tether,
                // counting course from selling stable coin
                if (sellCurrency === 'tether' || sellCurrency === 'binance-usd' || sellCurrency === 'dai' || sellCurrency === 'paxos-standard') {
                    course = sellAmount / buyAmount;
                } else if (buyCurrency === 'tether' || buyCurrency === 'binance-usd' || buyCurrency === 'dai' || buyCurrency === 'paxos-standard') {
                    course = 1;
                }  else if (sellCurrency === 'bitcoin') {
                    course = (Math.round(sellAmount / buyAmount * 10**8)) / 10**8;
                }
                
                else {
                        courseData = yield fetchingData(`${buyCurrency},${sellCurrency}`, 'usd');
                        if (Object.keys(courseData).length < 2) {
                            throw Error;
                        }
                        course =  courseData[buyCurrency].usd;
                        sellCurrencyCourse = courseData[sellCurrency].usd
                        tradeProfit = (Math.round(((course*buyAmount) - (sellCurrencyCourse*sellAmount))*100)) / 100;
                }
            } else if (typeOfTrade === 'Withdrawal') {
            courseData = yield fetchingData(sellCurrency, 'usd');
            course = yield Object.values(courseData)[0].usd;
        }

        const res = yield axios.put('https://cryptofy-react.herokuapp.com/updateTrade', {
            id,
            objectID,
            typeOfTrade,
            buy: {
                currency: buyCurrency,
                amount: buyAmount
            },
            sell: {
                currency: sellCurrency,
                amount: sellAmount
            },
            comment,
            tradeProfit,
            course,
            date
        })
        if(res.data.status === 'success') {
            const walletData = yield calculatingWalletData(res.data.user.trades);
            yield put(updateUserWallet({currentUser: res.data.user, 
                                  walletData
                                }));
            yield put(unsetTableLoading());
        } else {
            yield put(setTradeLabel({
                status:true,
                message: res.message
            }));
            yield put(unsetTableLoading());
        }
    } catch(error) {
        console.log(error);
        yield put(unsetTableLoading());
    }
};

export function* userSpotUpload({ payload: { id, buyAmount, buyCourse, buyCurrency, buyDate, profit, sellCourse, sellDate, percentageCourseChange}}) {
    try {

        const res = yield axios.put('https://cryptofy-react.herokuapp.com/uploadTransaction', {
            id, 
            buyAmount,
            buyCourse,
            buyCurrency,
            buyDate,
            profit,
            sellCourse,
            sellDate,
            percentageCourseChange
        });
        
        if (res.data.status === 'success') {
            const { user } = res.data
            const transactionData = yield calculatingTransactionData(user.transactions);
            yield put(updateUserSpot({
                 currentUser: res.data.user,
                 transactionData
             }));

            yield put(unsetSpotTableLoading())
        } else {
            yield put(unsetSpotTableLoading())
           }


    } catch(error) {
        console.log(error);
        yield put(unsetSpotTableLoading());
    }
} 

export function* userSpotDelete({ payload: { id, records } }) {
    try {
        const res = yield axios.put('https://cryptofy-react.herokuapp.com/deleteTransaction', {
            id,
            records
        });

        if (res.data.status === 'success') {
            const { user } = res.data
            const transactionData = yield calculatingTransactionData(user.transactions);
            yield put(updateUserSpot({
                 currentUser: res.data.user,
                 transactionData
             }));
            yield put(unsetSpotTableLoading())
       } else {
        yield put(unsetSpotTableLoading())
       }


    } catch (error) {
        console.log(error);
        yield put(unsetSpotTableLoading());
    }
}

export function* userSpotEdit({ payload: { id, objectID, buyAmount, buyCurrency, buyCourse, buyDate, sellCourse, profit, sellDate, percentageCourseChange }}) {
    try {   
        const res = yield axios.put('https://cryptofy-react.herokuapp.com/updateTransaction', {
            id,
            objectID,
            buyCurrency,
            buyAmount,
            buyCourse,
            buyDate,
            profit,
            sellCourse,
            sellDate,
            percentageCourseChange
        })
        if (res.data.status === 'success') {
            const { user } = res.data
            const transactionData = yield calculatingTransactionData(user.transactions);

            yield put(updateUserSpot({
                 currentUser: user,
                 transactionData
             }));

            yield put(unsetSpotTableLoading())
       } else {
            yield put(unsetSpotTableLoading())
       }
    } catch (error) {
        console.log(error);
        yield put(unsetSpotTableLoading());
    }
}

export function* userFuturesUpload({payload: {id, typeOfFuture, contract, profit, entry, laverage, date}}) {
    try {
        const res = yield axios.put('https://cryptofy-react.herokuapp.com/uploadFuture', {
            id,
            typeOfFuture,
            contract,
            profit,
            entry,
            laverage,
            date
        })
       
        if (res.data.status === 'success') {
            const { user } = res.data
            const futureData = yield calculatingFutureData(user.futures);
            yield put(updateUserFuture({
                currentUser: user,
                futureData
            }))
            yield put(unsetFuturesTableLoading())
        } else {
            yield put(unsetFuturesTableLoading())
        }
    } catch(error) {
        console.log(error);
        yield put(unsetFuturesTableLoading())
    }
}   

export function* userFutureDelete({payload: {id, records}}) {
    try {
        const res = yield axios.put('https://cryptofy-react.herokuapp.com/deleteFuture', { 
            id,
            records
        });
        if(res.data.status === 'success') {
            const { user } = res.data;
            const futureData = yield calculatingFutureData(user.futures);
            yield put(updateUserFuture({
                currentUser: user,
                futureData
            }))
            yield put(unsetFuturesTableLoading())

             
                
        } else {
            
            yield put(unsetFuturesTableLoading())
        }

    } catch(error) {
        console.log(error);
        yield put(unsetFuturesTableLoading())
    }
};

export function* userFutureEdit({ payload: { id, objectID, typeOfFuture, contract, profit, entry, laverage, date}}) {
    try {
        const res = yield axios.put('https://cryptofy-react.herokuapp.com/updateFuture', {
            id,
            objectID,
            typeOfFuture,
            contract,
            profit,
            entry,
            laverage,
            date
        })
        console.log(res);
        if (res.data.status === 'success') {
            const { user } = res.data
            const futureData = yield calculatingFutureData(user.futures);
            yield put(updateUserFuture({
                currentUser: user,
                futureData
            }))

            yield put(unsetFuturesTableLoading())
       } else {
            yield put(unsetFuturesTableLoading())
       }
    } catch(error) {
        console.log(error);
        yield put(unsetFuturesTableLoading())
    }
}


export function* setTheme({payload: {id, theme}}) {
    try {
        const res = yield axios.put('https://cryptofy-react.herokuapp.com/setTheme', {
            id,
            theme
        })

        if (res.data.status) {
            yield put(changeTheme(theme));
            yield put(disActiveSpinnerLoader());
        }


    } catch(error) {
        console.log(error);
    }
};

export function* recalcData() {
    try {
        yield put(setTableLoading())
        yield put(setSpotTableLoading())
        yield put(setFuturesTableLoading())
        yield isUserLogedIn()
        yield put(unsetTableLoading())
        yield put(unsetSpotTableLoading())
        yield put(unsetFuturesTableLoading())
    } catch(error) {
        console.log(error);
        yield put(unsetTableLoading())
        yield put(unsetSpotTableLoading())
        yield put(unsetFuturesTableLoading())
    }
}

export function* onSignUp() {
    yield takeLatest(UserActionTypes.SIGN_UP_USER, signUp);
};

export function* onSignIn() {
    yield takeLatest(UserActionTypes.SIGN_IN_USER, signIn);
};

export function* onIsUserLogedIn() {
    yield takeLatest(UserActionTypes.IS_USER_LOGED_IN, isUserLogedIn)
};

export function* onUserLogout() {
    yield takeLatest(UserActionTypes.USER_LOGOUT, userLogout);
};



// TRADES
export function* onUserTradeUpload() {
    yield takeLatest(UserActionTypes.USER_TRADE_UPLOAD, userTradeUpload);
};

export function* onDeleteUserTrade() {
    yield takeLatest(UserActionTypes.USER_TRADE_DELETE, deleteUserTrade);
};

export function* onUserTradeUpdate() {
    yield takeLatest(UserActionTypes.USER_TRADE_UPDATE, userTradeUpdate);
};


// TRANSACTIONS
export function* onUserTransactionUpload() {
    yield takeLatest(UserActionTypes.USER_SPOT_UPLOAD, userSpotUpload);
};

export function* onUserTransactionDelete() {
    yield takeLatest(UserActionTypes.USER_SPOT_DELETE, userSpotDelete);
};

export function* onUserTransactionEdit() {
    yield takeLatest(UserActionTypes.USER_SPOT_EDIT, userSpotEdit);
};


// FUTURES
export function* onUserFutureUpload() {
    yield takeLatest(UserActionTypes.USER_FUTURE_UPLOAD, userFuturesUpload);
};

export function* onUserFutureDelete() {
    yield takeLatest(UserActionTypes.USER_FUTURE_DELETE, userFutureDelete);
};

export function* onUserFutureEdit() {
    yield takeLatest(UserActionTypes.USER_FUTURE_EDIT, userFutureEdit);
};

export function* onSetTheme() {
    yield takeLatest(UserActionTypes.SET_THEME, setTheme);
}

// OTHERS
export function* onRecalcData() {
    yield takeLatest(UserActionTypes.RECALC_DATA, recalcData)
}



export function* userSagas() {
    yield all([call(onSignUp),
               call(onSignIn),
                call(onIsUserLogedIn),
                call(onUserTradeUpload),
                call(onDeleteUserTrade),
                call(onUserTradeUpdate),
                call(onUserLogout),
                call(onUserTransactionUpload),
                call(onUserTransactionDelete),
                call(onUserTransactionEdit),
                call(onUserFutureUpload),
                call(onUserFutureDelete),
                call(onUserFutureEdit),
                call(onSetTheme),
                call(onRecalcData)            
            ]);
};