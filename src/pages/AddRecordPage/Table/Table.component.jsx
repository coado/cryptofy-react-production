import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// COMPONENTS
import Row from './Row.component';
import Spinner from '../../../components/Spinner/Spinner.component';
import TableHeader from '../../../components/TableHeader/TableHeader.component';

const Table = ({ theme, trades, setNodeArr, setHiddenUploadEdit, setEditData, tableLoading }) => {

    useEffect(() => {
        const checkbox = document.querySelectorAll('.table__checkbox');
        setNodeArr(Array.from(checkbox));
    }, [trades]);

    // after submit loop wich checkbox is actually true 
    // if true pass his row id to the array

    
return (
<div className={`table-${theme} table`}>
    <TableHeader 
        theme={theme}
        gap={true}
        headers={['Type', 'Buy', 'Amount', 'Sell', 'Amount', 'Comment', 'Date']}  
    />
    
    <div className='table__content'>
    {
      tableLoading ?  <Spinner /> : null
    }

    
        <table className='table__table'>
            <tbody>
                {
                    trades ? 
                    trades.map((el, i) => <Row
                        typeOfTrade={el.typeOfTrade}
                        buyCurrency={el.buy.currency}
                        buyAmount={el.buy.amount}
                        sellCurrency={el.sell.currency}
                        sellAmount={el.sell.amount}
                        comment={el.comment}
                        date={el.date}
                        id={el._id}
                        key={i}
                        setHiddenUploadEdit={setHiddenUploadEdit}
                        setEditData={setEditData}
                        style={tableLoading ? {display: "none"} : null}
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
    trades: state.user.currentUser.trades,
    tableLoading: state.user.tableLoading
});

export default connect(mapStateToProps)(Table);