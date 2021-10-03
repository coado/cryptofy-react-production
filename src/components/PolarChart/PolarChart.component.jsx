import React from 'react';
import {PolarArea, defaults} from 'react-chartjs-2';

const PolarChart = ({ theme, wallet }) => {
    let themeChartColor;
    switch(theme) {
        case 'light':
            themeChartColor= [   
                '#b217ff',
                '#a621e9',
                '#961fd1',
                '#7a1aaa',
                '#691692'
            ]
            break;
        case 'matrix':
            themeChartColor= [   
                '#00ff5e',
                '#32ff7e',
                '#30d86e',
                '#1dc059',
                '#099e40'
            ]
            break;
        default: 
        themeChartColor = [
            '#D65DB1',
            '#FF6F91',
            '#FF9671',
            '#FFC75F',
            '#F9F871'
            
            ];
            break;
    }


    defaults.plugins.legend.display = false;
    let walletData = Object.entries(wallet);
    
    return (
        <div className={`polarChart-${theme} polarChart`}>
            <h1 className='polarChart__header'>WALLET CHART</h1>
            <PolarArea 
                data={{
                    labels: walletData.map(el => el[0] + ' in %'),
                    datasets: [{
                        label: 'My First Dataset',
                        data: walletData.map(el => el[1].percentage),
                        backgroundColor: themeChartColor,
                        borderWidth: 0
                    }]
                }}
                options={{
                    scales: {
                        r: {
                            ticks: {
                                backdropColor: 'transparent'
                            }
                        }

                    }
                }}
                height={400}
                width={400}
            
            />
    </div>
)};

export default React.memo(PolarChart);