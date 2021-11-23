import React, { useState } from 'react';

function Questionnaire({setCurrentPage, saveData}) {
    const [q1, setQ1] = useState(null)
    const [q2, setQ2] = useState(null)
    const [q3, setQ3] = useState(null)
    const [q4, setQ4] = useState(null)
 
    function handleContinue() {
        let data = {
            "age": q1,
            "gender": q2,
            "exposure": q3,
            "classify_understanding": q4 
        }
        saveData(data)
        setCurrentPage('Finish')
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-info my-4 px-5 pb-5">
                        <div className="card-body text-info">
                            <h2 className="card-title text-center">Stage 3: Wrap Up Survey</h2>
                            <p className="text-center" style={{color:"#000000"}}>   
                                Great job, you are almost done! Please answer a few final questions to help us with our study.
                            </p>
                        </div>            
                        <p className="card-text"> <b>Question 1.</b> Please select your age range: </p>
                        <div className="mb-4">
                            <div className="custom-control custom-radio">
                                <input type="radio" id="18-24" name="Question 1" className="custom-control-input" onChange={(e) => setQ1(e.target.id)}/>
                                <label className="custom-control-label" for="18-24">18-24</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" id="25-34"  name="Question 1" className="custom-control-input" onChange={(e) => setQ1(e.target.id)}/>
                                <label className="custom-control-label" for="25-34" >25-34</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" id="35-44"  name="Question 1" className="custom-control-input" onChange={(e) => setQ1(e.target.id)}/>
                                <label className="custom-control-label" for="35-44">35-44</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" id="45-54"  name="Question 1" className="custom-control-input" onChange={(e) => setQ1(e.target.id)}/>
                                <label className="custom-control-label" for="45-54">45-54</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" id="55 and older" name="Question 1" className="custom-control-input" onChange={(e) => setQ1(e.target.id)}/>
                                <label className="custom-control-label" for="55 and older" >55 and older</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" id="Prefer not to say" name="Question 1" className="custom-control-input" onChange={(e) => setQ1(e.target.id)}/>
                                <label className="custom-control-label" for="Prefer not to say" >Prefer not to say</label>
                            </div>
                        </div>
                        <p className="card-text"> <b>Question 2.</b> Please select your gender: </p>
                        <div className="mb-4">
                            <div className="custom-control custom-radio">
                                <input type="radio" id="Male" name="Question 2" className="custom-control-input" onChange={(e) => setQ2(e.target.id)}/>
                                <label className="custom-control-label" for="Male">Male</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" id="Female"  name="Question 2" className="custom-control-input" onChange={(e) => setQ2(e.target.id)}/>
                                <label className="custom-control-label" for="Female" >Female</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" id="Other"  name="Question 2" className="custom-control-input" onChange={(e) => setQ2(e.target.id)}/>
                                <label className="custom-control-label" for="Other">Other</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" id="Prefer not to say gender" name="Question 2" className="custom-control-input" onChange={(e) => setQ2(e.target.id)}/>
                                <label className="custom-control-label" for="Prefer not to say gender" >Prefer not to say</label>
                            </div>
                        </div>
                        <p className="card-text"> <b>Question 3.</b> Please indicate your level of exposure to robots: </p>
                        <div className="mb-4">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td className="p-0 text-left" style={{width:'25%'}}><i>Never</i></td>
                                        <td className="py-0 pl-5 text-left" style={{width:'25%'}}><i>Rarely </i></td>
                                        <td className="py-0 pr-5 text-right" style={{width:'25%'}}><i>Sometimes </i></td>
                                        <td className="p-0 text-right" style={{width:'25%'}}><i>Often </i></td>
                                    </tr> 
                                </tbody>
                            </table>
                            <input type="range" className="custom-range" value={q3 || 1} min="1" max="4" id="customRange2" onChange={(e) => setQ3(e.target.value)}/>
                        </div>
                        <p className="card-text"> <b>Question 4.</b> After today's interaction with the robot, how would you classify your understanding of robot abilities? </p>
                        <div className="mb-4">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td className="p-0 text-left" style={{width:'20%'}}><i>A lot worse</i></td>
                                        <td className="py-0 pl-4 text-left" style={{width:'20%'}}><i>Somewhat worse</i></td>
                                        <td className="p-0 text-center" style={{width:'20%'}}><i>No change</i></td>
                                        <td className="py-0 pr-5 text-right" style={{width:'20%'}}><i>Somewhat better</i></td>
                                        <td className="p-0 text-right" style={{width:'20%'}}><i>A lot better</i></td>
                                    </tr>    
                                </tbody>
                            </table>
                            <input type="range" className="custom-range" value={q4 || 0} min="1" max="5" id="customRange2" onChange={(e) => setQ4(e.target.value)}/>
                        </div>
                        <button 
                            type="button" 
                            className="btn btn-outline-primary d-block mx-auto" 
                            onClick={() => {
                                handleContinue()
                            }} 
                            disabled={!(q1 && q2)}
                        >
                            Continue to Finish 
                        
                        </button> 
                    </div>       
                </div>
            </div>
        </div>
    )
}

export default Questionnaire