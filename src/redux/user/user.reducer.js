
import UserActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    dashboardData: {

    },
    walletTrackerTransactionData: {
        
    },
    walletTrackerFuturesData: {
       
    },
    tableLoading: false,
    spotTableLoading: false,
    futuresTableLoading: false,
    logedIn: null,
    spinnerLoader: true,
    theme: 'dark'
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // case UserActionTypes.SIGN_UP_USER:
        //     return {
        //         ...state,
        //         currentUser: action.payload
        //     }
        case UserActionTypes.SIGN_SUCCESS: 
            return {
                ...state,
              currentUser: action.payload.data.user,
              logedIn: true,
              dashboardData: {
                  ...action.payload.walletData
              },
              walletTrackerTransactionData: {
                ...action.payload.transactionData
            },
            walletTrackerFuturesData: {
                ...action.payload.futureData
            },
            theme: action.payload.theme
    
            }
        case UserActionTypes.SIGN_FAILURE:
            return {
                ...state,
                currentUser: '',
                logedIn: false,
            }
        case UserActionTypes.UPDATE_USER_WALLET:
            return {
                ...state,
                tradeStatus: null,
                currentUser: action.payload.currentUser,
                dashboardData: {
                    ...action.payload.walletData
                },
            }
        case UserActionTypes.UPDATE_USER_SPOT: 
            return {
                ...state,
                currentUser: action.payload.currentUser,
                walletTrackerTransactionData: {
                    ...action.payload.transactionData
                }
            }
        case UserActionTypes.UPDATE_USER_FUTURE:
            return {
                ...state,
                currentUser: action.payload.currentUser,
                walletTrackerFuturesData: { 
                    ...action.payload.futureData
                },
            }
        case UserActionTypes.SET_TABLE_LOADING:
            return {
                ...state,
                tableLoading: true
            }
        case UserActionTypes.UNSET_TABLE_LOADING:
            return {
                ...state,
                tableLoading: false
            }

        case UserActionTypes.SET_SPOT_TABLE_LOADING:
            return {
                ...state,
                spotTableLoading: true
            }
        case UserActionTypes.UNSET_SPOT_TABLE_LOADING:
            return {
                ...state,
                spotTableLoading: false
            }
        case UserActionTypes.SET_FUTURES_TABLE_LOADING:
            return {
                ...state,
                futuresTableLoading: true
            }
        case UserActionTypes.UNSET_FUTURES_TABLE_LOADING:
            return {
                ...state,
                futuresTableLoading: false
            }
        case UserActionTypes.CHANGE_THEME:
            return {
                ...state,
                theme: action.payload
            }
        case UserActionTypes.ACTIVE_SPINNERLOADER:
            return {
                ...state,
                spinnerLoader: true
            }
        case UserActionTypes.DISACTIVE_SPINNERLOADER: 
            return {
                ...state,
                spinnerLoader: false
            }

        default:
            return state;
    }
};

export default userReducer;