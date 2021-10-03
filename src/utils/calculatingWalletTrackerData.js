/* eslint-disable no-unused-expressions */


export const calculatingFutureData = data => {
    if (data.length === 0) return {

        totalTransactionsAmount: '-',
        averageProfitPerOneTransaction: 0,
        lowestProfit: 0,
        highestProfit: 0,
        totalProfit: 0,
        highestTransactionsAmountInMonth: '-',
        highestTransactionsDate: '-',
        averageTransactionsPerMonth: '-',
        firstTrade: '-',
        lastTrade:'-',
        worstMonth: '-',
        bestMonth: '-',
        cashFlow: 0

    };
    const profitData = calculatingProfitData(data.map(el => el.profit));
    const transactionsPerMonthData = calculatingAverageTransactionsPerMonth(data.map(el => el.date));
    const monthData = calculatingProfitsBasedOnMonths(data.map(el => {
        return {
            profit: el.profit,
            date: el.date
        }
    }))

    let cashFlow = 0;
    data.forEach(el => cashFlow += el.entry)

    return {
        totalTransactionsAmount: data.length,
        averageProfitPerOneTransaction: profitData.average,
        lowestProfit: profitData.lowestProfit,
        highestProfit: profitData.highestProfit,
        totalProfit: profitData.totalProfit,
        highestTransactionsAmountInMonth: transactionsPerMonthData.highestTransactionsAmount,
        highestTransactionsDate: transactionsPerMonthData.date,
        averageTransactionsPerMonth: transactionsPerMonthData.averageTransactionPerMonth,
        firstTrade: transactionsPerMonthData.firstTrade,
        lastTrade: transactionsPerMonthData.lastTrade,
        worstMonth: monthData.worstMonth,
        bestMonth: monthData.bestMonth,
        cashFlow,
        monthlyProfitChartdata: {
            ...monthData.chartData
        }
    }
    
}

export const calculatingTransactionData = data => {
    if (data.length === 0) return {
        totalTransactionsAmount: '-',
        averageProfitPerOneTransaction: 0,
        lowestProfit: 0,
        highestProfit: 0,
        totalProfit: 0,
        highestTransactionsAmountInMonth: '-',
        highestTransactionsDate: '-',
        averageTransactionsPerMonth: '-',
        firstTrade: '-',
        lastTrade:'-',
        worstMonth: '-',
        bestMonth: '-',
        cashFlow: 0
    }
    const transactionsPerMonthData = calculatingAverageTransactionsPerMonth(data.map(el => el.buyDate));
    const profitData = calculatingProfitData(data.map(el => el.profit));
    const monthData = calculatingProfitsBasedOnMonths(data.map(el => {
        return {
            profit: el.profit,
            date: el.sellDate
        }
    }))

    let cashFlow = 0;
    data.forEach(el => cashFlow += el.buyAmount*el.buyCourse);

    return {
        totalTransactionsAmount: data.length,
        highestTransactionsAmountInMonth: transactionsPerMonthData.highestTransactionsAmount,
        highestTransactionsDate: transactionsPerMonthData.date,
        averageTransactionsPerMonth: transactionsPerMonthData.averageTransactionPerMonth,
        firstTrade: transactionsPerMonthData.firstTrade,
        lastTrade: transactionsPerMonthData.lastTrade,
        averageProfitPerOneTransaction: profitData.average,
        lowestProfit: profitData.lowestProfit,
        highestProfit: profitData.highestProfit,
        totalProfit: profitData.totalProfit,
        worstMonth: monthData.worstMonth,
        bestMonth: monthData.bestMonth,
        cashFlow: (Math.round(cashFlow*100)) / 100,
        monthlyProfitChartdata: {
            ...monthData.chartData
        }

        }
};

const calculatingAverageTransactionsPerMonth = data => {
     // calculating number of transactions / numer of months
     let prepareData = data[0].split('-')
     let lowestYear = prepareData[0]*1;
     let lowestMonth = prepareData[1]*1;
     let highestYear = prepareData[0]*1;
     let highestMonth = prepareData[1]*1;
     let lowestDay = prepareData[2]*1;
     let highestDay = prepareData[2]*1;

     let transactionsObject = {};
     
     data.forEach(el => {
         let date = el.split('-').slice(0, 2);
         let day = el.split('-').slice(-1);

         if (transactionsObject[date.join('-')]) {
            transactionsObject[date.join('-')]++
        } else {
            transactionsObject[date.join('-')] = 1
        }



         date[0] *= 1;
         date[1] *= 1;
         day *= 1;
         if (lowestYear > date[0]) {
             lowestYear = date[0]
             lowestMonth = date[1]
             lowestDay = day
         } else if (lowestYear === date[0]) {
             if (lowestMonth > date[1]) {
                lowestMonth = date[1]
                lowestDay = day
                
             } else if (lowestMonth === date[1]) {
                lowestDay > day ? lowestDay = day : null
            }
         }
 
         if (highestYear < date[0]) {
             highestYear = date[0]
             highestMonth = date[1]
             highestDay = day

         } else if (highestYear === date[0]) {
             if (highestMonth < date[1]) {
                highestMonth = date[1]
                highestDay = day
             } else if (highestMonth === date[1]) {
                highestDay < day ? highestDay = day : null;
            }
             
         }
     })
            // 13 (12 - lowestMonth + 1), because we want include lowest Month too 
             const months = (13 - lowestMonth) + highestMonth + 12*(highestYear - lowestYear - 1);
            
             let totalTransactions;
             let totalTransactionsDate;
          
              
              let ref = Object.entries(transactionsObject);
              if (ref.length === 1) {
                totalTransactions = ref[0][1]
                totalTransactionsDate = ref[0][0]
              } else if (ref.length === 0) { 
                totalTransactions = '-'
                totalTransactionsDate = '-'
              } 
              
              else {

                    ref.reduce((acc, curr) => {
                    if (acc[1] > curr[1]) {
                        totalTransactions = acc[1]
                        totalTransactionsDate = acc[0]
                        return acc;
                    } else {
                        totalTransactions = curr[1]
                        totalTransactionsDate = curr[0]
                        return curr;
                    }
                })
              }
              
            
     
             return {
                 averageTransactionPerMonth: (Math.round(data.length / months * 100)) / 100,
                 highestTransactionsAmount: totalTransactions,
                 date: totalTransactionsDate,
                 firstTrade: `${lowestYear}-${lowestMonth}-${lowestDay}`,
                 lastTrade: `${highestYear}-${highestMonth}-${highestDay}`
             }
};

const calculatingProfitData = data => {
    const filterArr = data.filter(el => el !== null)
    if (filterArr.length === 0 ) return {
        average: 0,
        totalProfit: 0,
        lowestProfit: 0,
        highestProfit: 0
    };

    const totalProfit = filterArr.reduce((acc, curr) => {
        return acc + curr
    }, 0)

    function compareNumbers(a, b) {
        return a - b
     }

  
    filterArr.sort(compareNumbers);
    
    return {
        average: (Math.round(totalProfit / filterArr.length * 100)) / 100,
        totalProfit: (Math.round(totalProfit*100)) / 100,
        lowestProfit: filterArr[0],
        highestProfit: filterArr[filterArr.length-1]
    }
    
}

const calculatingProfitsBasedOnMonths = data => {
let obj = {};
const filterArr = data.filter(el => {
    if (el.profit && el.date) return el
});

filterArr.forEach(el => {
    let date = el.date.split('-').slice(0,2).join('-');
    if (obj[date]) {
        obj[date].profit += el.profit;
        obj[date].efficiency += el.profit >= 0 ? 1 : 0;
        obj[date].count += 1;
    } else {
        obj[date] = {
            profit: el.profit,
            efficiency: el.profit >= 0 ? 1 : 0,
            count: 1
        }
    }
});
    
let ref = Object.entries(obj);

let bestMonth;
let worstMonth;
 if (ref.length === 1) {
    bestMonth = ref[0][0];
    worstMonth = ref[0][0]
 } else if (ref.length === 0) {
    bestMonth = '-'
    worstMonth = '-'
 } else {
        // finding the best month
        ref.reduce((acc, curr) => {
        if (acc[1].profit > curr[1].profit) {
            bestMonth = acc[0]
            return acc;
        } else {
            bestMonth = curr[0]
            return curr;
        }

        })
        // finding the worst month
        ref.reduce((acc, curr) => {
            if (acc[1].profit < curr[1].profit) {
                worstMonth = acc[0]
                return acc;
            } else {
                worstMonth = curr[0]
                return curr;
            }
        })
};
ref.sort();

const profitTimes = ref.map(el => el[0]);
const profitValues = ref.map(el => el[1].profit)
const efficiencyTimes = ref.map(el => el[0]);
const efficiencyValues = ref.map(el => (Math.round((el[1].efficiency / el[1].count)*10000)) / 100)

return {
    worstMonth,
    bestMonth,
    chartData: {
        profitTimes,
        profitValues,
        efficiencyTimes,
        efficiencyValues
    }
}

}



