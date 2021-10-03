import React from 'react';

const TableHeader = ({ headers, theme, gap }) => (
    <div className={` tableHeader tableHeader-${theme}`}>
        <table className= 'tableHeader__table'>
            <thead>
                <tr>
                    {
                        gap && <th></th>
                    }
                    {
                        headers && headers.map((el, i) => <th key={i} >{ el }</th>)
                    }
                </tr>
            </thead>
        </table>    
    </div>
)

export default TableHeader;