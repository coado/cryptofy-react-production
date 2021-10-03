import React from 'react';
import LineChart from '../../components/LineChart/LineChart.component';
import { Link } from 'react-router-dom';

const HomePage = () => {
    
    let times = new Array(24).fill('')

    let values = [0, 1, 2, 3, 4, 8, 10, 15, 30, 19, 10, 20, 40, 20, 45, 14, 15, 9, 12, 30, 40, 50, 60, 100]
    
    return (
    <div className='Homepage'>

        <div className='Homepage__wrapper'>
            <div className='Homepage__textContainer'>
                <div className='Homepage__header'>
                    <h1 className='Homepage__title'> Cryptofy </h1>
                    <div className='Homepage__header--imageWrapper'>
                        <img alt='ether' src='../images/ether.png' />
                    </div>
                </div>

                <h1 className='Homepage__slogan'>Cryptocurrency wallet tracking tool for traders </h1> 


                <Link to='/signUpSignIn' ><button className='Homepage__button' > Sign up </button></Link>

            </div>
            <div className='Homepage__chartContainer'>
                <div className='Homepage__chart'>
                    <div className='Homepage__chartWrapper'>
                        <LineChart tickMark='%' height={180} times={times} values={values} chartColor='#32ff7e'  />
                    </div>
                </div>
            </div>
        </div>
        
        {
            // <div>Icons made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> 
        }
    </div>
)};

export default HomePage;