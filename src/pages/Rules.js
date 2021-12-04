import React from 'react';

function Rules({setCurrentPage}) {
    return (
        <div className="container-rules">
            <div className="container">
                <div className="card mb-5" style={{backgroundColor:'#e6f7ff'}}>
                    <div className="card-body">
                        <h5 className="card-title">Stage 1 - Practice</h5>
                        <p className="card-text">
                        In this stage, we will show you 2 examples where Maeve makes correct predictions that were justified using true facts, and 4
                        examples where Maeve makes incorrect predictions that were justified using false facts.<br/><br/>

                        In each example, you will evaluate Maeve's predictions and correct any false facts in its justifications.<br/><br/>

                        After answering each example, you will be given the correct answer and an explanation.<br/><br/>

                        Pay close attention to each example and the correct answer to <b>learn to identify which facts in a justification are incorrect</b>.
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