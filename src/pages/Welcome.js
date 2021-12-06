import React, { useState } from 'react'
import examples from '../data/explanations_decision_tree_local3_best.json'

function Welcome({setCurrentPage, saveTurkId, setExpId, maxExamples}) {
    const [TURKID, setTURKID] = useState(false)

    const [turkId, setTurkId] = useState(false)
    const [testId, setTestId] = useState(false)
    
    const maxTestId = parseInt(examples.length / maxExamples) + 1

    var next_button;
    if (!(turkId && testId)) {
        next_button = "Disabled. Complete your selection.";
    } else {
        next_button = "Continue";
    }

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
                    This HIT consists of 3 stages. Instructions will be provided in each stage.
                    </p>
                    <ul>
                        <li>Practice Stage</li>
                        <li>Test Stage</li>
                        <li>Exit Questionnaire</li>
                    </ul>
                    <hr/>  
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
                    <label>Enter TURK ID</label>
                    <input type="text" className="form-control mx-auto" id="inputTurkID" onChange={(e) => setTurkId(e.target.value)} style={{width:"50%"}}/><br/>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-12">
                    <label>Enter TEST ID (number between 1 and {maxTestId})</label>
                    <input type="text" className="form-control mx-auto" id="inputTestID" onChange={(e) => setTestId(e.target.value)} style={{width:"25%"}}/>
                    </div>
                </div>
                <div className="row text-center mt-3">
                    <div className="col-12">
                        <button 
                            type="button" 
                            className="btn btn-outline-primary"
                            onClick={()=> {
                                saveTurkId(turkId);
                                setExpId(testId);
                                setCurrentPage('Rules');
                            }} 
                            disabled={!(turkId && testId)}
                        >
                        {next_button}
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
</div>
)}

export default Welcome