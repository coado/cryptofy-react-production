import ErrorActionTypes from "./error.types";


export const setLoginLabel = data => ({
    type: ErrorActionTypes.SET_SIGN_LABEL,
    payload: data
});

export const setTradeLabel = data => ({
    type: ErrorActionTypes.SET_TRADE_LABEL,
    payload: data
});

export const setWalletTrackerLabel = data => ({
    type: ErrorActionTypes.SET_WALLETTRACKER_LABEL,
    payload: data
});