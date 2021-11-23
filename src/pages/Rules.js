import React from 'react';

function Rules({setCurrentPage}) {
    return (
        <div className="container-rules">
            <div className="container">
                <div className="card mb-5" style={{backgroundColor:'#e6f7ff'}}>
                    <div className="card-body">
                        <h5 className="card-title">Stage 1</h5>
                        <p className="card-text">
                        In this stage, we will show you 2 examples where Maeve makes the correct prediction, and 2
                        examples where Maeve makes the incorrect prediction. <br/> <br/> 

                        Pay close attention to each example to understand when justifications are incorrect and why.
                        </p>
                        <br/><hr/>
                        <button 
                            type="button" 
                            className="btn btn-outline-primary d-block mx-auto"  
                            onClick={()=>{
                                setCurrentPage('Examples')
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

export default Rules