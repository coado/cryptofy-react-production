import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../../../components/Spinner/Spinner.component';
import SpotTableRow from './SpotTableRow.component';
import TableHeader from '../../../../components/TableHeader/TableHeader.component';


const SpotTable = ({ theme, averageProfit, spotTableLoading, setEditData, setHiddenUpdateForm, spot, setNodeArr }) => {
    
    useEffect(() => {
        const checkbox = document.querySelectorAll('.spotTable__checkbox');
        setNodeArr(Array.from(checkbox))
    }, [spot])
    
    let rocketsReference = Math.round(((averageProfit + (averageProfit / 3)) / 3));
    
    return (
        <div className={`spotTable-${theme} spotTable`}>
        <TableHeader 
            theme={theme} 
            gap={true}
            headers={['Currency', 'Amount', 'Course', 'Date', 'Course', 'Profit', 'Date', 'Rockets']} 
        />

        <div className='spotTable__content'>
        {
            spotTableLoading ? <Spinner /> : null
        }    
        
        <table className='spotTable__table'>
            <tbody>
            {
                spot ? 
                spot.map((el, i) => <SpotTableRow 
                                        id={el._id}
                                        buyAmount={el.buyAmount}
                                        buyCourse={el.buyCourse}
                                        buyCurrency={el.buyCurrency}
                                        buyDate={el.buyDate}
                                        profit={el.profit}
                                        sellCourse={el.sellCourse}
                                        percentageCourseChange={el.percentageCourseChange}
                                        sellDate={el.sellDate}
                                        key={i}
                                        setHiddenUpdateForm={setHiddenUpdateForm}
                                        setEditData={setEditData}
                                        theme={theme}
                                        style={spotTableLoading ? {display: "none"} : null}
                                        rocketsNumber={ Math.floor(el.profit / rocketsReference) > 3 ? 3 : Math.floor(el.profit / rocketsReference)}
                                        />)
                : null
            }
            </tbody>
        </table>
    </div>
    </div>
)};

const mapStateToProps = state => ({
    spot: state.user.currentUser.transactions,
    spotTableLoading: state.user.spotTableLoading
});

export default connect(mapStateToProps)(SpotTable);