import React, { useState } from 'react'
import examples from '../data/explanations_decision_tree_local3_best_clean_filtered.json'
// import { Dropdown, DropdownButton } from 'react-bootstrap';

function Welcome({setCurrentPage, saveTurkId, maxExamples}) {
    const [TURKID, setTURKID] = useState(false)

    const [turkId, setTurkId] = useState(false)
    // const [testId, setTestId] = useState(false)
    
    const maxTestId = parseInt(examples.length / maxExamples) + 1

    var next_button;
    if (!turkId) {
        next_button = "Disabled. Complete your selection.";
    } else {
        next_button = "Continue";
    }

    var testids = [];
    for (var i=1; i < maxTestId; i++) {
        testids.push(i);
    }

    // const testid_prompt = () => {
    //     if (testId) {
    //         return ("Selected TEST ID: " + testId + " ")
    //     } else {
    //         return ("Select TEST ID")
    //     }
    // }

    return (
        <div className="container-rules">

        <div className="container">
            {!TURKID && (<div className="card mb-5 mt-5" style={{backgroundColor:'#F0F0F0'}}>
                <div className="card-body">
                    <h5 className="card-title">Introduction</h5>
                    <p className="card-text">
                    A robot has been tasked with cleaning a household. While performing different parts of cleaning tasks, the robot
                    must provide responses to <b>"why" questions</b> it gets asked.<br/><br/>
                    For example, <i>"Why do you think a broom can be used to sweep?"</i> or <i>"Why will you grab the vacuum?"</i>.
                    <br/><br/>
                    <b>Your task is to select the best robot response to each <b>"why" question</b> the robot responds to.</b>
                    <br/><br/>
                    This HIT consists of 2 stages. Instructions will be provided in each stage.
                    </p>
                    <ul>
                        <li>Robot Interaction Stage</li>
                        <li>Exit Questionnaire</li>
                    </ul>
                    <hr/>  
                    <button type="button" className="btn btn-outline-primary d-block mx-auto" onClick={()=>setTURKID(true)} >
                        Continue
                    </button>
                </div>
            </div>)}

            {TURKID && (<div className="card mb-5 mt-5" style={{backgroundColor:'#F0F0F0'}}>
                <div className="card-body">
                    <h5 className="card-title">Introduction</h5>
                    <p className="card-text">
                    A robot has been tasked with cleaning a household. While performing different parts of cleaning tasks, the robot
                    must provide responses to <b>"why" questions</b> it gets asked.<br/><br/>
                    For example, <i>"Why do you think a broom can be used to sweep?"</i> or <i>"Why will you grab the vacuum?"</i>.
                    <br/><br/>
                    <b>Your task is to select the best robot response to each <b>"why" question</b> the robot responds to.</b>
                    <br/><br/>
                    This HIT consists of 2 stages. Instructions will be provided in each stage.
                    </p>
                    <ul>
                        <li>Robot Interaction Stage</li>
                        <li>Exit Questionnaire</li>
                    </ul>
                </div>
            </div>)}

            {TURKID && (
                <div className="form-group">
                    <div className="row text-center">
                        <div className="col-12">
                        <label>Enter TURK ID</label>
                        <input type="text" className="form-control mx-auto" id="inputTurkID" onChange={(e) => setTurkId(e.target.value)} style={{width:"30%"}}/><br/>
                        </div>
                    </div>
                    {/* <div className="row text-center">
                        <div className="col-12">
                            <DropdownButton id="dropdown-basic-button" title={testid_prompt()} onSelect={(e) => setTestId(e)}>
                                {testids.map((id) => {
                                    return (<Dropdown.Item eventKey={id}>{id}</Dropdown.Item>)
                                })}
                            </DropdownButton><br/>
                        </div>
                    </div> */}
                    <div className="row text-center mt-3">
                        <div className="col-12">
                            <button 
                                type="button" 
                                className="btn btn-outline-primary"
                                onClick={()=> {
                                    saveTurkId(turkId);
                                    // setExpId(testId);
                                    setCurrentPage('Rules');
                                }} 
                                disabled={!turkId}
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