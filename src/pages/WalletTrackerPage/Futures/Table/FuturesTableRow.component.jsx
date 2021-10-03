import React from 'react';
import { ReactComponent as Rocket} from '../../../../svg/rocket-outline.svg';
import { removeDolarSign } from '../../../../utils/form.funtions';


const FuturesTableRow = ({ entry, laverage, rocketsNumber, setHiddenUpdateForm, setEditData, id, typeOfFuture, contract, date, profit, style}) => {

    let rockets = [];

    for (let i = 0; i < rocketsNumber; i++) {
        rockets.push(<Rocket key={i} className='futuresTable--rocketIcon' />)
    }

    const getData = e => {
        let nodeArr = Array.from(e.target.parentNode.childNodes);
        if (nodeArr.length < 4) nodeArr = Array.from(e.target.parentNode.parentNode.childNodes)
        if (nodeArr.length < 4) nodeArr = Array.from(e.target.parentNode.parentNode.parentNode.childNodes)
        if (nodeArr.length < 4) nodeArr = Array.from(e.target.parentNode.parentNode.parentNode.parentNode.childNodes)
    

        const arr = nodeArr.slice(1,7).map(el => el.innerHTML);
        setEditData(prevStatus => ({
            ...prevStatus,
            objectID: id,
            typeOfFuture: arr[0],
            contract: arr[1],
            entry: removeDolarSign(arr[2]),
            laverage: arr[3],
            profit: removeDolarSign(arr[4]),
            date: arr[5]
        }))

        setHiddenUpdateForm(false);

    }
        
    return (  
    <tr style={style}>
        <td> <input data-id={id} className='futuresTable__checkbox' type='checkbox'/></td>
        <td style={{color: typeOfFuture === 'long' ? '#32ff7e' : '#ff3838', fontWeight: '700', fontSize: '1.1rem' }} onClick={getData} >{typeOfFuture}</td>
        <td onClick={getData}>{contract}</td>
        <td onClick={getData}>{entry}$</td>
        <td onClick={getData}>{laverage}</td>
        <td style={{color: profit >= 0 ? '#32ff7e' : '#ff3838'}} onClick={getData}>{
            profit ? 
            `${profit}$`
            :
            null
        }</td>
        <td onClick={getData}>{date}</td>
        <td onClick={getData}>
        <div className='futuresTable--rocketContainer'>
            {
                rockets.map(el => el)
            }
            </div>
        </td>
</tr>
)};


export default FuturesTableRow;