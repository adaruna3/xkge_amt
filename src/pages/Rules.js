import React from 'react';

function Rules({setCurrentPage}) {
    return (
        <div className="container-rules">
            <div className="container">
                <div className="card mb-5" style={{backgroundColor:'#e6f7ff'}}>
                    <div className="card-body">
                        <h5 className="card-title">Stage 1 - Practice</h5>
                        <p className="card-text">
                        In each question that follows, the VA will try to make a (correct or incorrect) <b>guess</b> about something 
                        it does not know, and then justify its guess based on (correct or incorrect) <b>reasoning</b>.<br/><br/> 
                        
                        Your job is to identify which <b>guesses</b> and <b>reasons</b> are correct and incorrect.<br/><br/>

                        After answering each question, you will be given the correct answer and an explanation.<br/><br/>

                        Pay close attention to each correct answer provided to <b>learn to identify which guesses and reasons are incorrect</b>.
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