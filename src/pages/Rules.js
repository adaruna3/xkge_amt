import React from 'react';

function Rules({setCurrentPage}) {
    return (
        <div className="container-rules">
            <div className="container">
                <div className="card mb-5" style={{backgroundColor:'#F0F0F0'}}>
                    <div className="card-body">
                        <h5 className="card-title">Stage 1 - Practice</h5>
                        <p className="card-text">
                        In each practice question that follows, the robot will give <b>reasoning</b> to support a <b>guess</b> it has made.<br/><br/>
                        
                        Your job is to fix the parts of the robot's <b>reasoning</b> and <b>guess</b> that are wrong.<br/><br/>

                        After answering each question, you will be given the correct answer.<br/><br/>

                        <b>Pay close attention</b> to learn from each correct answer provided. The top scorers in "Stage 2 - Test" will be provided <b>extra rewards!</b>
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