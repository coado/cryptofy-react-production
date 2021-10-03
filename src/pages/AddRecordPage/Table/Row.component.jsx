import React from 'react';
import { connect } from 'react-redux';

const Row = ({typeOfTrade, buyCurrency, buyAmount, sellCurrency, sellAmount, comment, date, id, setHiddenUploadEdit, setEditData, userID, style}) => {
    
    const getData = e => {
        const nodeArr = Array.from(e.target.parentNode.childNodes);
        // const objectID = nodeArr[0].lastChild.dataset.id;
        const arr = nodeArr.slice(1).map(el => el.innerHTML);
        setEditData({
            id: userID,
            objectID: id,
            typeOfTrade: arr[0],
            buyCurrency: arr[1],
            buyAmount: arr[2],
            sellCurrency: arr[3],
            sellAmount: arr[4],
            comment: arr[5],
            date: arr[6]
        })
        setHiddenUploadEdit(false);
    };
    
    return (
        <tr style={style}>
        <td> <input data-id={id} className='table__checkbox' type='checkbox'/></td>
            <td onClick={getData}>{typeOfTrade}</td>
            <td onClick={getData}>{buyCurrency}</td>
            <td onClick={getData}>{buyAmount}</td>
            <td onClick={getData}>{sellCurrency}</td>
            <td onClick={getData}>{sellAmount}</td>
            <td onClick={getData}>{comment}</td>
            <td onClick={getData}>{date}</td>
        </tr>
)};

const mapStateToProps = state => ({
    userID: state.user.currentUser._id
});

export default connect(mapStateToProps)(Row);