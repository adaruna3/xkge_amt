import React, { useState } from 'react';

function Welcome({setCurrentPage, saveTurkId}) {
    const [TURKID, setTURKID] = useState(false)

    const [id, setId] = useState('')

    return (
        <div className="container-rules">

        <div className="container">
            <div className="card mb-5 mt-5" style={{backgroundColor:'#e9f7ef '}}>
                <div className="card-body">
                    <h5 className="card-title">Introduction</h5>
                    <p className="card-text">
                    A virtual assistant, Maeve, has been tasked with predicting whether common-sense facts are true or false. 
                    Along with predictions, Maeve must provide justifications of each prediction.
                    <br/><br/>
                    <b>Your task is to identify why Maeve makes incorrect predictions and fix incorrect parts of Maeve's justifications to improve its knowledge.</b>
                    <br/><br/>
                    This HIT consists of 3 stages.  In this first stage, we will show examples of Maeve making correct and incorrect 
                    predictions, along with the corresponding justification. In the second stage, we will ask you to idenify what 
                    parts of Maeve's justifications are wrong and how to correct them. In the final stage, you will answer an exit 
                    questionnaire.
                    <br/><br/>

                    Please <i>carefully</i> read Maeve's justifications so you can identify incorrect parts and imporve its knowledge!

                    </p>
                    <br/><hr/>  
                    <button 
                        type="button" 
                        className="btn btn-outline-primary d-block mx-auto" 
                        onClick={()=>setTURKID(true)} 
                    >
                        Continue
                    </button>
                </div>
            </div>

        {TURKID === true && (
            <div className="form-group">
                <div className="row text-center">
                    <div className="col-12">
                    <label>TURK ID</label>
                    <input type="text" className="form-control mx-auto" id="inputTurkID" onChange={(e) => setId(e.target.value)} style={{width:"50%"}}/>
                    </div>
                </div>
                <div className="row text-center mt-3">
                    <div className="col-12">
                        <button 
                            type="button" 
                            className="btn btn-outline-primary"
                            onClick={()=> {
                                setCurrentPage('Rules')
                                saveTurkId(id)
                            }} 
                            disabled={!id}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
</div>
)}

export default Welcome