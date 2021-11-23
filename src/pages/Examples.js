import React, {useState} from 'react';
import examples from '../data/examples.json'



function Examples({setCurrentPage}) {
    const [currentExample, setCurrentExample] = useState(0)
    var next_button;
    if (currentExample+1 < examples.length) {
        next_button = "Next Example"
    } else {
        next_button = "Next Stage"
    }
    var checkboxes = [false, false, true];
    var radios = []
    var explain_str = "Since Maeve's prediction and each part of the justification are correct, we select the last answer."
    if (currentExample === 2) {
        checkboxes = [false, true, false];
        radios = [[],[false, true, false]];
        explain_str = "Since 'the cooked state' is not the oppossite of the 'the full state', we select fact 2 as false. "
        explain_str = explain_str + "Instead 'the full state is the opposite state of the empty state' is true."
    } else if (currentExample === 3) {
        checkboxes = [false, true, false, true, false];
        radios = [[], [true, false, false], [], [false, false, true]];
        explain_str = "Since 'a plate' cannot be used to perform 'the wash action', we select part 2 as incorrect. "
        explain_str = explain_str + "Instead 'the wash action can be done with a dishwasher' is true. "
        explain_str = explain_str + "Since 'a bellpepper' cannot be used to perform 'the vacuum action', we select part 4 as incorrect. "
        explain_str = explain_str + "Instead 'a vacuum is used to perform the vacuum action' is true."
    }
    const handleOnChange = () => {
        return;
    };
    
    return (
        <div className="container-rules">
            <div className="container">
                <div className="card mb-5" style={{backgroundColor:'#e6f7ff'}}>
                    <div className="card-body">
                        <h5 className="card-title">Displaying Example {currentExample+1} out of {examples.length} </h5>
                        <p className="card-text">
                            Maeve predicted that "{examples[currentExample].triple}". <br/><br/>
                            Maeve's justfication for the prediction is "{examples[currentExample].str}". <br/><br/>

                            Below we have selected the appropriate response and provided an explanation.
                        </p><hr/>
                        {examples[currentExample].parts.map(part => (
                            <div className="form-check" key={part.idx}>
                                <input className="form-check-input" type="checkbox" value="" id={part.idx} checked={checkboxes[part.idx]} onChange={() => handleOnChange()}></input>
                                <label className="form-check-label">
                                    Fact {parseInt(part.idx)+1}:  "{part.str.split(',').join(' ')}" is false
                                </label>
                                {part.corrections.map((correction, index) => (
                                    <div className="form-check" key={index}>
                                        <input className="form-check-input" type="radio" value="" name={part.idx} checked={radios[part.idx][index]} onChange={() => handleOnChange()}></input>
                                        <label className="form-check-label">
                                            "{correction.split(',').join(' ')}" is true
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id={examples[currentExample].parts.length} checked={checkboxes[examples[currentExample].parts.length]} onChange={() => handleOnChange()}></input>
                            <label className="form-check-label">
                                Maeve's prediction is correct.
                            </label>
                        </div>
                        <hr></hr><p><br></br></p>
                        <div className="row">
                            <div className="col-2"></div>
                            <div className="col-8">
                                <div className="card mb-5" style={{backgroundColor:'#ff6433 '}}>
                                    <div className="card-body">
                                        <h5 className="card-title">Answer Explanation </h5>
                                        <p className="card-text">
                                            {explain_str}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2"></div>
                        </div>
                        <button type="button" className="btn btn-outline-primary d-block mx-auto"  
                            onClick={()=>{
                                if (currentExample+1 < examples.length) {
                                    setCurrentExample(currentExample+1);
                                } else {
                                    setCurrentPage("PreTest")
                                }
                            }}
                        >
                        {next_button}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Examples