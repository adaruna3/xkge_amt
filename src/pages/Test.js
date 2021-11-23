import React, {useState} from 'react';
import examples from '../data/explanations_decision_tree_global_21.json'



function Test({setCurrentPage, saveData}) {
    const [currentExample, setCurrentExample] = useState(0)

    const [testData, setTestData] = useState([])

    const max_examples = 3

    const [mpcState, setMpcState] = useState(
        new Array(examples[currentExample].parts.length).fill(false)
    );

    const [correctState, setCorrectState] = useState(false);
    
    if (examples[currentExample].parts.length !== mpcState.length) {
        setMpcState(new Array(examples[currentExample].parts.length).fill(false));
        setCorrectState(false);
    }

    var next_button;
    if (!correctState && mpcState.every((val) => val === false)) {
        next_button = "Disabled. Make a selection."
    } else if (currentExample+1 < max_examples) {
        next_button = "Next Example"
    } else {
        next_button = "Next Stage"
    }

    const mpcHandleOnChange = (position) => {
        if (correctState) {
            setCorrectState(!correctState)
        }
        const updatedCheckedState = mpcState.map((item, index) =>
            index === position ? !item : item
        );
        setMpcState(updatedCheckedState);
    };

    const correctHandleOnChange = () => {
        setMpcState(new Array(examples[currentExample].parts.length).fill(false));
        setCorrectState(!correctState);
    };

    return (
        <div className="container-rules">
            <div className="container">
                <div className="card mb-5" style={{backgroundColor:'#e6f7ff'}}>
                    <div className="card-body">
                        <h5 className="card-title">Displaying Prediction {currentExample+1} out of {max_examples} </h5>
                        <p className="card-text">
                            Maeve predicted that "{examples[currentExample].triple}". <br/><br/>
                            Maeve's justfication for the prediction is "{examples[currentExample].str}". <br/><br/>

                            Below we have selected the appropriate response and provided an explanation.
                        </p><hr/>
                        {examples[currentExample].parts.map((part, index) => (
                            <div className="form-check" key={part.idx}>
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    value={mpcState[index]}
                                    id={part.idx}
                                    checked={mpcState[index]}
                                    onChange={() => mpcHandleOnChange(index)}
                                />
                                <label className="form-check-label">
                                    Part {parseInt(part.idx)+1}:  "{part.str.split(',').join(' ')}" is incorrect
                                </label>
                            </div>
                        ))}
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                value="correct" 
                                id={examples[currentExample].parts.length}
                                checked={correctState}
                                onChange={() => correctHandleOnChange()}
                            />
                            <label className="form-check-label">
                                Maeve's prediction is correct.
                            </label>
                        </div>
                        <button type="button" disabled={!correctState && mpcState.every((val) => val === false)} className="btn btn-outline-primary d-block mx-auto"  
                            onClick={()=>{
                                if (currentExample+1 < max_examples) {
                                    testData.push([mpcState.concat(correctState)]);
                                    setTestData(testData);
                                    setCurrentExample(currentExample+1);
                                } else {
                                    setCurrentPage("Questionnaire");
                                    testData.push([mpcState.concat(correctState)]);
                                    setTestData(testData);
                                    saveData(testData);
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

export default Test