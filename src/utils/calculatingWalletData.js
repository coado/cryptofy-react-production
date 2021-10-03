import fetchingData from './fetchingData';


 const calculatingWalletData = async (data) => {
    if(data.length === 0) return {
        wallet: null,
        totalValue: null
    };

    // 1) Calculate wallet value base on type of trade
    let wallet = {};
    let previousWalletValue = 0;

    const btcCourseFetching = await fetchingData('bitcoin', 'usd')
    const btcCourse = btcCourseFetching.bitcoin.usd

    data.forEach(el => {
        let sellCurrency = el.sell.currency;
        let sellAmount = el.sell.amount;
        let buyCurrency = el.buy.currency;
        let buyAmount = el.buy.amount;
        
        if (el.typeOfTrade === 'Trade') {
            // checking if wallet contain selling currency, if yes substract its value.
            if (wallet[sellCurrency] && sellCurrency !== 'bitcoin') { 
                wallet[sellCurrency].prevValue -= wallet[sellCurrency].prevValue *(sellAmount / wallet[sellCurrency].amount) 
                wallet[sellCurrency].amount -=  sellAmount;

                if (wallet[sellCurrency].amount <= 0) {
                    delete wallet[sellCurrency]
                } 
            } else if (sellCurrency === 'bitcoin') {
                if (wallet[sellCurrency]) {
                    wallet[sellCurrency].prevValue -= wallet[sellCurrency].prevValue *(sellAmount / wallet[sellCurrency].amount) 
                    wallet[sellCurrency].amount -=  sellAmount;
                } else {
                    previousWalletValue +=  sellAmount*btcCourse
                }
            } 
            
            else { 

                // if selling currency doesnt already exist in wallet
                // adding its value to previousWalletValue
                // and trade profit
                // in case that sell currency is already in wallet,
                // do nothing, because trade profit is caunting automaticly by 
                // sybstracking totalValue - previousWalletValue
                previousWalletValue += buyAmount*el.course;
                previousWalletValue -= el.tradeProfit;
            }

            // checking if bought currency is already in wallet, if yes -> increase its value
            // if not -> adding new position in wallet
            // checking if selling curency either btc or usdt to divide into two cases
            if(sellCurrency === 'bitcoin') {
                    if (wallet[`${buyCurrency}/btc`]) {

                        wallet[`${buyCurrency}/btc`].prevCourse =  (wallet[`${buyCurrency}/btc`].amount*wallet[`${buyCurrency}/btc`].prevCourse + buyAmount*el.course) / (wallet[`${buyCurrency}/btc`].amount + buyAmount)
                        wallet[`${buyCurrency}/btc`].amount += buyAmount;
                        wallet[`${buyCurrency}/btc`].prevValue += buyAmount*el.course; 

                    } else {
                        wallet[`${buyCurrency}/btc`] = {
                            amount: buyAmount,
                            prevValue: buyAmount*el.course,
                            prevCourse: el.course,
                            to: 'btc'
                        }
                    }

            } else {
                if (wallet[buyCurrency]) { 
                    // calculating average prevCourse
                    
                    wallet[buyCurrency].prevCourse =  (wallet[buyCurrency].amount*wallet[buyCurrency].prevCourse + buyAmount*el.course) / (wallet[buyCurrency].amount + buyAmount)
                    wallet[buyCurrency].amount += buyAmount;
                    wallet[buyCurrency].prevValue += buyAmount*el.course; 
                    wallet[buyCurrency].tradeProfit += el.tradeProfit
    
                
                } else {
                    wallet[buyCurrency] = {
                        amount: buyAmount,
                        prevValue: buyAmount*el.course,
                        prevCourse: el.course,
                        tradeProfit: el.tradeProfit,
                        to: 'usd'
                    };
            }

           

                
            }
        
           // previousWalletValue += el.tradeProfit;
        }

        


        // checking if adding coin is already in wallet 
        // if not -> adding new position in wallet
        // if yes -> increase its value
        if (el.typeOfTrade === 'Deposit' || el.typeOfTrade === 'Mining') {
            if (wallet[buyCurrency]) {
                // calculating average previous course
                wallet[buyCurrency].prevCourse =  (wallet[buyCurrency].amount*wallet[buyCurrency].prevCourse + buyAmount*el.course) / (wallet[buyCurrency].amount + buyAmount)
                wallet[buyCurrency].amount += buyAmount;
                wallet[buyCurrency].prevValue += buyAmount*el.course;
            } else {
                wallet[buyCurrency] = {
                    amount: buyAmount,
                    prevValue: buyAmount*el.course,
                    prevCourse: el.course,
                    tradeProfit: 0,
                    to: 'usd'

                };
            }
            previousWalletValue += buyAmount*el.course;
        }

        // deacresing withdrawal coin value
        if (el.typeOfTrade === 'Withdrawal') {
            // leaving for now, maybe withdrawal only dolars is good option?
            // ...
    
            if ( wallet[sellCurrency]){
                wallet[sellCurrency].amount -= sellAmount
                if (wallet[sellCurrency].amount ===  0){
                    delete wallet[sellCurrency]
                } 
            } else {
                wallet[sellCurrency] = {amount: -(sellAmount)} 
            }
            previousWalletValue -= sellAmount*el.course;
        } 
    });
    if (Object.keys(wallet).length === 0) {
        return {
            wallet: null,
            totalValue: 0,
            profit: 0,
            percentageWalletChange: 0,
            chartData: null};
    } 
    let fetchArrayUSD = []
    let fetchArrayBTC = []

    Object.entries(wallet).forEach(el => {
        if (el[1].to === 'btc') {
            fetchArrayBTC.push(el[0].slice(0,-4))
        } else {
            fetchArrayUSD.push(el[0])
        }
    })

    // 2) Fetching data based on the wallet currencies 
    if (fetchArrayUSD.length > 0) {
        const fetchStringUSD = fetchArrayUSD.join(',')
        const coursesUSD = await fetchingData(fetchStringUSD, 'usd');
        // adding current course to wallet
        Object.entries(coursesUSD).forEach(el => wallet[el[0]].course = el[1].usd);
    }

    if (fetchArrayBTC.length > 0) {
        const fetchStringBTC = fetchArrayBTC.join(',')
        const coursesBTC = await fetchingData(fetchStringBTC, 'btc');
        // adding current course to wallet
        Object.entries(coursesBTC).forEach(el => wallet[`${el[0]}/btc`].course = el[1].btc);
    }
   

    // Calculating current value
    Object.entries(wallet).forEach(el => {

        let value = el[1].amount * el[1].course;

        if (value >= 1) {
            wallet[el[0]].value = (Math.round(value*100)) / 100
        } else if (value >= 0.01 && value < 1) {
            wallet[el[0]].value = (Math.round(value*10**4)) / 10**4
        } else {
            wallet[el[0]].value = (Math.round(value*10**8)) / 10**8
        }
    
    });
  
    const totalValue = (Math.floor((Object.values(wallet).reduce((acc, curr) => {
        if (curr.to === 'usd') {
            return acc + curr.value;
        } else {
            // adding to total value only profit of trade on btc
            return acc + curr.value*btcCourse
        }
    }, 0))*100)) / 100;
   
    const profit = (Math.round((totalValue - previousWalletValue)*100)) / 100;
    const percentageWalletChange = (Math.round((((totalValue / previousWalletValue)*100) - 100)*100)) / 100;
    // calculating percentage value of coin vs totalValue (wallet value), and then rounding result to two decimenial places
    Object.entries(wallet).forEach(el => {
        let coinPercentage;
        if (el[1].to === 'usd') {
            coinPercentage = (el[1].value / totalValue)*100
        } else {
            coinPercentage = el[1].value*btcCourse / totalValue *100
        }
        wallet[el[0]].percentage = ((Math.floor(coinPercentage*1000)) / 1000)

    
    });
    
    let reference = Object.entries(wallet);
    
  
    let currentHighestValue = reference[0][1].percentage;
    if (reference.length > 1) {
        for (let i = 1; i < reference.length; i++) {
            if (!(currentHighestValue > reference[i][1].percentage)) {
                currentHighestValue = reference[i][1].percentage
            }
       

        }
    };


    let popularCurrency;
    reference.forEach(el => {
       if (el[1].percentage === currentHighestValue) {
        el[1].to === 'btc' ? 
        popularCurrency = el[0].slice(0, -4)
        : 
        popularCurrency = el[0]
       }
    });

   
    
    const fetchChartData = await fetch(`https://api.coingecko.com/api/v3/coins/${popularCurrency}/market_chart?vs_currency=usd&days=2`);
    const chartDataJSON = await fetchChartData.json();
    const chartData = chartDataJSON.prices.slice(24,);
    const chartMarketCapsData = chartDataJSON.market_caps.slice(24,);
    const chartValues = chartData.map(el => (Math.round(el[1] * 100)) / 100);
    const chartMarketCapValues = chartMarketCapsData.map(el => (Math.round(el[1] * 100)) / 100) 
    const chartTimes = chartData.map(el => {
        let hours = String((new Date(el[0])).getHours());
        let minutes = String((new Date(el[0])).getMinutes());
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
      
    });

  
    data.reverse();
    return {
            wallet,
            totalValue,
            profit,
            percentageWalletChange,
            chartData: {
                chartTimes,
                chartValues,
                popularCurrency,
                chartMarketCapValues
            }};
};

export default calculatingWalletData;