import React from 'react';

function PreTest({setCurrentPage}) {
    return (
        <div className="container-rules">
            <div className="container">
                <div className="card mb-5" style={{backgroundColor:'#e6f7ff'}}>
                    <div className="card-body">
                        <h5 className="card-title">Stage 2</h5>
                        <p className="card-text">
                        In this stage, you will evaluate 15 predictions Maeve has made, along 
                        with corresponding justifications.
                        <br/><br/> 

                        </p>
                        <br/><hr/>
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