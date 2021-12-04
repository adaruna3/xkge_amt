import React from 'react';

function PreTest({setCurrentPage, maxExamples}) {
    return (
        <div className="container-rules">
            <div className="container">
                <div className="card mb-5" style={{backgroundColor:'#e6f7ff'}}>
                    <div className="card-body">
                        <h5 className="card-title">Stage 2 - Test</h5>
                        <p className="card-text">
                        Like the Practice Stage, in this stage you will evaluate {maxExamples} predictions Maeve has made, along 
                        with corresponding justifications.<br/><br/>

                        However, the correct answers will <i>NOT</i> be provided. Do your <i>best</i> to answer each question.<br/><br/>

                        Please <i>carefully</i> read Maeve's justifications so you can identify incorrect parts and imporve its knowledge!<br/><br/>

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