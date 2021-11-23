import React from 'react'

function Finish({verificationCode}) {
    return (
        <div className="container-rules">
            <h2>Thank You!</h2>
            <p>You've successfully completed the study. Enter the following code in Amazon Turk to get paid.</p>
            <h3 className="verification-code">{verificationCode}</h3>
        </div>
    )
}

export default Finish