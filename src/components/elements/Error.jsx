import React from 'react'
import LineIcon from 'react-lineicons';

function Error({ error, onClick }) {
    return <div className="error" onClick={() => onClick()}>{error.message}
        <span className="error-icon-close">
            <LineIcon name="close" />
        </span>
    </div>

}

export default Error
