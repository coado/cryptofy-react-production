import React, { useState } from 'react';
import { connect } from 'react-redux';
// ACTIONS
import { userTradeDelete, setTableLoading } from '../../redux/user/user.actions';
import { setTradeLabel } from '../../redux/error/error.actions';
// SPECIFIED COMPONENTS
import Table from './Table/Table.component';
import AddRecordForm from './AddRecordForm/AddRecordForm.component';
import EditRecordForm from './EditRecordForm/EditRecordForm.component';
// OTHER COMPONENTS
import Button from '../../components/button/Button.component';
import AlertWindow from '../../components/AlertWindow/AlertWindow.component'
import Label from '../../components/Label/Label.component';


const AddRecordPage = ({ theme, userTradeDelete, id, label, setTradeLabel, setTableLoading }) => {
    const [hiddenUploadForm, setHiddenUploadForm] = useState(true);
    const [hiddenUploadEdit, setHiddenUploadEdit] = useState(true);
    const [hiddenAlertWindow, setHiddenAlertWindow] = useState(true);
    const [nodeArr, setNodeArr] = useState([]);
    const [editData, setEditData] = useState({
        objectID: null,
        typeOfTrade: '',
        buyCurrency: '',
        buyAmount: null,
        sellCurrency: '',
        sellAmount: null,
        comment: '',
        date: null
    })


    const deleteRecords = () => {
        const deleteArr = nodeArr.filter(el => el.checked === true).map(el => el.dataset.id);
        if (deleteArr.length === 0) return;
        setTableLoading();
        userTradeDelete({
            id,
            records: deleteArr
        });
        nodeArr.forEach(el => el.checked = false)
    }
    
    return (
    <div className={`addRecordPage-${theme} addRecordPage`}>
        {
            label.status ? <Label status='error' message={label.message} hideLabel={() => setTradeLabel({status: false, message: ''})} /> : null
        }
        {
            hiddenUploadForm ? null : <AddRecordForm setTableLoading={setTableLoading} setTradeLabel={setTradeLabel} setHiddenUploadForm={setHiddenUploadForm} /> 
        }
        {
            hiddenUploadEdit ? null :  <EditRecordForm setTableLoading={setTableLoading} setTradeLabel={setTradeLabel} setHiddenUploadEdit={setHiddenUploadEdit} editData={editData} setEditData={setEditData} />
        }
        {
            hiddenAlertWindow ? null :  <AlertWindow onClick={deleteRecords} hideWindow={setHiddenAlertWindow} text={'Are you sure, that you want to delete this records? '} />
        }

        <div className='addRecordPage__buttons'>
            <Button onClick={() => setHiddenUploadForm(false)} text='Add new record' />    
            <Button onClick={() => setHiddenAlertWindow(false)} text='Delete records' /> 
        </div>
            <Table theme={theme} setNodeArr={setNodeArr} setHiddenUploadEdit={setHiddenUploadEdit} setEditData={setEditData} id={id}/>
             
    </div>    
)};

const mapDispatchToProps = dispatch => ({
    userTradeDelete: data => dispatch(userTradeDelete(data)),
    setTradeLabel: data => dispatch(setTradeLabel(data)),
    setTableLoading: () => dispatch(setTableLoading()) 
});

const mapStateToProps = state => ({
    id: state.user.currentUser._id,
    theme: state.user.theme,
    label: state.error.tradeLabel
})

export default connect(mapStateToProps, mapDispatchToProps)(AddRecordPage);