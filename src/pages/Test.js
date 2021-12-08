import React, {useState} from 'react';
import examples from '../data/explanations_decision_tree_local3_best.json'



function Test({setCurrentPage, saveData, maxExamples, firstExample}) {
    const [prevExample, setPrevExample] = useState(firstExample-1);
    const [currentExample, setCurrentExample] = useState(firstExample);
    const [testData, setTestData] = useState([]);

    var max_examples = firstExample + maxExamples;
    if (firstExample + maxExamples > examples.length){
        max_examples = examples.length;
    }
        

    const [mpcState, setMpcState] = useState(
        new Array(examples[currentExample].parts.length).fill(false)
    );
    const [mpcFixState, setMpcFixState] = useState(
        new Array(examples[currentExample].parts.length).fill(-1)
    );
    const [correctState, setCorrectState] = useState(false);
    
    if (prevExample !== currentExample) {
        setMpcState(new Array(examples[currentExample].parts.length).fill(false));
        setMpcFixState(new Array(examples[currentExample].parts.length).fill(-1));
        setCorrectState(false);
        setPrevExample(currentExample);
    }

    const validSubmit = () => {
        const mpcEval = mpcState.map((item, mpcIndex) => {
            if (item) {
                if (mpcFixState[mpcIndex] === -1) {
                    return -1;
                } else {
                    return 1;
                }
            } else {
                return 0;
            }
        });
        const mpcEvalRedux = mpcEval.every((val) => val !== -1) && mpcEval.some((val) => val === 1);
        return mpcEvalRedux || correctState;
    }

    var next_button;
    if (!validSubmit()) {
        next_button = "Disabled. Complete your selection."
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
        const updatedFixState = mpcFixState.map((item, index) =>
            mpcState[index] ? item : -1
        );
        setMpcFixState(updatedFixState);
    };

    const correctHandleOnChange = () => {
        setMpcState(new Array(examples[currentExample].parts.length).fill(false));
        const updatedFixState = mpcFixState.map((item, index) =>
            mpcState[index] ? item : -1
        );
        setMpcFixState(updatedFixState);
        setCorrectState(!correctState);
    };

    const handleOnChange = (event) => {
        if (mpcState[parseInt(event.target.name)]) {
            const updatedFixState = mpcFixState.map((item, index) =>
                index === parseInt(event.target.name) ? parseInt(event.target.value) : item
            );
            setMpcFixState(updatedFixState);
        } else {
            const updatedFixState = mpcFixState.map((item, index) =>
                index === parseInt(event.target.name) ? -1 : item
            );
            setMpcFixState(updatedFixState);
        }
    };

    const and_or = (part_idx, parts_length) => {
        if (part_idx + 1 < parts_length){
            return (<div>and/or</div>)
        } else {
            return (<div></div>)
        }
    }
    
    return (
        <div className="container-rules">
            <div className="container">
                <div className="card mb-5" style={{backgroundColor:'#e6f7ff'}}>
                    <div className="card-body">
                        <h5 className="card-title">Displaying Question {currentExample-firstExample+1} out of {max_examples-firstExample} </h5>
                        <div className="card-text">
                            Evaluate the VA’s <b>guess</b> and <b>reasoning</b> below. Note that <b>more than one fact may be wrong</b>.<br/><br/>

                            The VA’s <b>guess</b>:<br/>
                            <div className="form-check">
                                <label className="form-check-label">
                                    "{examples[currentExample].triple}"
                                </label>
                            </div>
                            The VA's <b>reasoning</b>:<br/> {
                                examples[currentExample].parts.map((part, index) => {
                                    return (<div className="form-check" key={"justi_"+part.idx}>
                                        <label className="form-check-label">
                                        Part {index+1} of the VA's reasoning is, "{part.str.split(',').join(' ')}"
                                        </label>
                                    </div>)
                                })
                            }
                        </div><hr/>
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                value="" 
                                id={examples[currentExample].parts.length} 
                                checked={correctState}
                                onChange={() => correctHandleOnChange()}>
                            </input>
                            <label className="form-check-label">
                                The VA's guess is <b>correct</b>.<br/><br/>
                            </label>
                        </div>
                        <div className="form-check">
                            The VA's guess is <b>wrong</b> because...
                        </div>
                        {examples[currentExample].parts.map((part, index) => (
                            <div className="form-check" key={"check_" + part.idx}>
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    value="" 
                                    id={part.idx} 
                                    checked={mpcState[index]}
                                    onChange={() => mpcHandleOnChange(index)}>
                                </input>
                                <label className="form-check-label">
                                    <b>Part {parseInt(part.idx)+1}</b> of the VA's reasoning is <b>wrong</b>,  "{part.str.split(',').join(' ')}" is false.
                                </label>
                                {part.corrections.map((correction, index) => {
                                    if (mpcState[part.idx]) {
                                        return (
                                            <div className="form-check" key={"check_" + part.idx + "_radio_" + index}>
                                                <input 
                                                    className="form-check-input" 
                                                    type="radio" 
                                                    value={index} 
                                                    name={part.idx} 
                                                    onChange={(event) => handleOnChange(event)}>
                                                </input>
                                                <label className="form-check-label">
                                                    Instead, "{correction.split(',').join(' ')}" is true.
                                                </label>
                                            </div>
                                        );
                                    } else {
                                        return (<div key={"check_" + part.idx + "_radio_" + index}></div>)
                                    }
                                })}
                                {and_or(index, examples[currentExample].parts.length)}
                            </div>
                        ))}
                        <hr></hr><p><br></br></p>
                        <button 
                            type="button" 
                            disabled={!validSubmit()} 
                            className="btn btn-outline-primary d-block mx-auto"  
                            onClick={ () => {
                                if (currentExample+1 < max_examples) {
                                    testData.push(mpcFixState);
                                    setTestData(testData);
                                    setMpcState(new Array(examples[currentExample+1].parts.length).fill(false));
                                    setMpcFixState(new Array(examples[currentExample+1].parts.length).fill(-1));
                                    setCorrectState(false);
                                    setCurrentExample(currentExample+1);
                                } else {
                                    testData.push(mpcFixState);
                                    saveData(testData);
                                    setCurrentPage("Questionnaire")
                                }
                            }}>
                        {next_button}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test