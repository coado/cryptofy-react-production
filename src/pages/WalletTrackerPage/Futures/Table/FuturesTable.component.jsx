import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import FuturesTableRow from './FuturesTableRow.component';
import Spinner from '../../../../components/Spinner/Spinner.component';
import TableHeader from '../../../../components/TableHeader/TableHeader.component';

const FuturesTable = ({ theme, averageProfit, setHiddenUpdateForm, setEditData, futures, futuresTableLoading, setNodeArr }) => {

    useEffect(() => {
        const checkbox = document.querySelectorAll('.futuresTable__checkbox');
        setNodeArr(Array.from(checkbox))
    }, [futures])

    let rocketsReference = Math.round(((averageProfit + (averageProfit / 3)) / 3));

    return (
    <div className={`futuresTable-${theme} futuresTable`}>
        <TableHeader 
            theme={theme} 
            gap={true}
            headers={['Type', 'Contract', 'Entry', 'Laverage', 'Profit', 'Date', 'Rockets']} 
        />
        
        <div className='futuresTable__content'>
        {
            futuresTableLoading ? <Spinner /> : null
        }
        
        <table className='futuresTable__table'>
            <tbody   >
                {
                    futures ? 
                    futures.map((el, i) => <FuturesTableRow 
                        id={el._id}
                        typeOfFuture={el.typeOfFuture}
                        contract={el.contract}
                        date={el.date}
                        profit={el.profit}
                        entry={el.entry}
                        laverage={el.laverage}
                        key={i}
                        style={futuresTableLoading ? {display: "none"} : null}
                        setEditData={setEditData}
                        setHiddenUpdateForm={setHiddenUpdateForm}
                        rocketsNumber={ Math.floor(el.profit / rocketsReference) > 3 ? 3 : Math.floor(el.profit / rocketsReference)}
                        />)
                    :
                        null
                }
            </tbody>
        </table>
    </div>
    </div>
)};

const mapStateToProps = state => ({
    futures: state.user.currentUser.futures,
    futuresTableLoading: state.user.futuresTableLoading
});

export default connect(mapStateToProps)(FuturesTable);