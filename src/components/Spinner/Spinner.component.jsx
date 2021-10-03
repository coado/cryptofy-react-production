import React from 'react';
import { connect } from 'react-redux';

const Spinner = ({ theme, color }) => (
    <div className="spinner">
        <div style={{backgroundColor: color}} className={`spinner-${theme} spinner__bounce1 spinner__animation`}></div>
        <div style={{backgroundColor: color}} className={`spinner-${theme} spinner__bounce2 spinner__animation`}></div>
        <div style={{backgroundColor: color}} className={`spinner-${theme} spinner__animation`}></div>
    </div>
);

const mapStateToProps = state => ({
    theme: state.user.theme
});

export default connect(mapStateToProps)(Spinner);