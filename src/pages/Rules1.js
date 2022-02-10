import React from 'react';

function Rules1({setCurrentPage}) {
    return (
        <div className="container-rules">
            <div className="container">
                <div className="card mb-5" style={{backgroundColor:'#F0F0F0'}}>
                    <div className="card-body">
                        <h5 className="card-title">Stage 1 - Robot Interaction</h5>
                        <p className="card-text">
                        In each question that follows, the robot will give multiple responses to a <b>"why" question</b> it was asked.<br/><br/>
                        
                        Your job is to select which of the robot's responses best answer the <b>"why" question</b>.<br/><br/>

                        For extra context, you will also be shown what the robot was doing in a video and the plan it was following when it was asked the <b>why question</b>.
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

export default Rules1