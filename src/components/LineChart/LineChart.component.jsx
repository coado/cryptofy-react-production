import React from 'react';
import {Line, defaults} from 'react-chartjs-2';
import { connect } from 'react-redux';

const LineChart = ({ theme, tickMark, beginAtZero, times, values, header, chartColor, height  }) => {
    let themeChartColor;
    let themeTicksColor;
    let themeBorderColor;
    let headerColor;
    switch(theme) {
        case 'light':
            themeChartColor = '#b217ff';
            themeTicksColor = '#b217ff';
            themeBorderColor = '#b217ff3f';
            headerColor = '#b217ff';
            break;
        case 'matrix' :
            themeChartColor = '#32ff7e';
            themeTicksColor = '#32ff7e';
            themeBorderColor = '#32ff7d46';
            headerColor = '#32ff7e';  
            break;
        default:
            themeChartColor = chartColor;
            themeTicksColor = 'rgba(255,255,255, 0.5)';
            themeBorderColor = 'rgba(255,255,255, 0.03)' ;
            headerColor = '#ffffff';
            break;
    }
        

    defaults.borderColor = themeBorderColor;
    defaults.elements.point.pointStyle = 'star';
    defaults.color = 'rgba(255,255,255, 0.5)';
    defaults.plugins.legend.display = false
    
    

return (
    <div className='lineChart'>
    <h1 style={{color: headerColor}} className='lineChart__header'>{header}</h1>
    <Line 
        data={{
            labels: times,
            datasets: [{
                pointBackgroundColor: themeChartColor,
                data: values,
               //  backgroundColor: '#f1c40f8a',
                borderColor: themeChartColor,
                borderWidth: 2,
               //  fill: true,
                tension: 0.3,
    
            }]
        }}
        options={{
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        color: themeTicksColor
                    }
                },
                y: {
                    beginAtZero: beginAtZero ? true : false,
                    ticks: {
                        
                        callback: function(value, index, values) {
                            return (Math.round(value*100) / 100) + tickMark
                        },
                        color: themeTicksColor,
                        
                    }
                }
            }
        }}
        height={height}
        width={300}
    />
    </div>
)};

const mapStateToProps = state => ({
    theme: state.user.theme
})

export default connect(mapStateToProps)(React.memo(LineChart));