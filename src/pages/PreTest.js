import React from 'react';

function PreTest({setCurrentPage, maxExamples}) {
    return (
        <div className="container-rules">
            <div className="container">
                <div className="card mb-5" style={{backgroundColor:'#F0F0F0'}}>
                    <div className="card-body">
                        <h5 className="card-title">Stage 2 - Test</h5>
                        <p className="card-text">
                        In each test question that follows, the robot will give <b>reasoning</b> to support a <b>guess</b> it has made.<br/><br/>

                        Your job is to fix the parts of the robot's <b>reasoning</b> and <b>guess</b> that are wrong.<br/><br/>

                        In this stage the correct answers will <b>NOT</b> be provided.<br/><br/>

                        Do your <b>best</b> to answer each question. The top scorers in this stage will be provided <b>extra rewards!</b>
                        </p>
                        <hr/>
                        <button 
                            type="button" 
                            className="btn btn-outline-primary d-block mx-auto"  
                            onClick={()=>{
                                setCurrentPage('Test')
                            }} 
                        >
                            Continue
                        </button>
                    </div>
                </div>   
            </div>
        </div>      
    )
}

export default PreTest