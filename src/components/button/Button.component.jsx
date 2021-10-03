import React from 'react';
import { connect } from 'react-redux';


const Button = ({theme, onClick, text, styles}) => (
    <button style={styles} onClick={onClick} className={`button-${theme} button`}> {text} </button>
);

const mapStateToProps = state => ({
    theme: state.user.theme
});

export default connect(mapStateToProps)(Button);