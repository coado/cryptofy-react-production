import ErrorActionTypes from './error.types';

const INITIAL_STATE = {
    tradeLabel: {
        status: false,
        message: ''
    },
    loginResult: {
        status: '',
        message: ''
    },
    walletTrackerLabel: {
        status: false,
        message: ''
    }
};

const errorReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ErrorActionTypes.SET_SIGN_LABEL: 
            return {
                ...state,
                loginResult: {
                    status: action.payload.status,
                    message: action.payload.message
                }
            }
        case ErrorActionTypes.SET_TRADE_LABEL:
            return {
                ...state,
                tradeLabel: {
                    status: action.payload.status,
                    message: action.payload.message
                }
            }
        case ErrorActionTypes.SET_WALLETTRACKER_LABEL:
            return {
                ...state,
                walletTrackerLabel: {
                    status: action.payload.status,
                    message: action.payload.message
                }
            }

        default:
            return state
    }
};

export default errorReducer;