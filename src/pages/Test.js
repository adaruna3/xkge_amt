import React, {useState} from 'react';
import examples from '../data/explanations_decision_tree_local3_best.json'
import golden from '../data/examples.json'



function Test({setCurrentPage, saveData, maxExamples, firstExample}) {
    const [prevExample, setPrevExample] = useState(firstExample-1);
    const [currentExampleNum, setCurrentExampleNum] = useState(firstExample);
    const [currentExample, setCurrentExample] = useState(examples[currentExampleNum]);
    const [testData, setTestData] = useState([]);

    var max_examples = firstExample + maxExamples + 1;
    if (firstExample + maxExamples > examples.length){
        max_examples = examples.length + 1;
    }
    
    const [mpcState, setMpcState] = useState(
        new Array(currentExample.parts.length).fill(false)
    );
    const [mpcFixState, setMpcFixState] = useState(
        new Array(currentExample.parts.length).fill(-1)
    );
    const [correctState, setCorrectState] = useState(false);
    
    if (prevExample !== currentExampleNum) {
        setMpcState(new Array(currentExample.parts.length).fill(false));
        setMpcFixState(new Array(currentExample.parts.length).fill(-1));
        setCorrectState(false);
        setPrevExample(currentExampleNum);
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
    } else if (currentExampleNum+1 < max_examples) {
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
        setMpcState(new Array(currentExample.parts.length).fill(false));
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
                        <h5 className="card-title">Displaying Question {currentExampleNum-firstExample+1} out of {max_examples-firstExample} </h5>
                        <div className="card-text">
                            Evaluate the VA’s <b>guess</b> and <b>reasoning</b> below. Note that <b>more than one fact may be wrong</b>.<br/><br/>

                            The VA’s <b>guess</b>:<br/>
                            <div className="form-check">
                                <label className="form-check-label">
                                    "{currentExample.triple}"
                                </label>
                            </div>
                            The VA's <b>reasoning</b>:<br/> {
                                currentExample.parts.map((part, index) => {
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
                                id={currentExample.parts.length} 
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
                        {currentExample.parts.map((part, index1) => (
                            <div className="form-check" key={"check_" + part.idx}>
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    value="" 
                                    id={part.idx} 
                                    checked={mpcState[index1]}
                                    onChange={() => mpcHandleOnChange(index1)}>
                                </input>
                                <label className="form-check-label">
                                    <b>Part {parseInt(part.idx)+1}</b> of the VA's reasoning is <b>wrong</b>,  "{part.str.split(',').join(' ')}" is false.
                                </label>
                                {part.corrections.map((correction, index2) => {
                                    if (mpcState[part.idx]) {
                                        if (index2+1 === part.corrections.length) {
                                            return (
                                                <div className="form-check" key={"check_" + part.idx + "_radio_" + index2}>
                                                    <input 
                                                        className="form-check-input" 
                                                        type="radio" 
                                                        value={index2} 
                                                        name={part.idx} 
                                                        onChange={(event) => handleOnChange(event)}>
                                                    </input>
                                                    <label className="form-check-label">
                                                        Instead, "{correction.split(',').join(' ')}" is true.
                                                    </label>
                                                    <br/>
                                                    <input 
                                                        className="form-check-input" 
                                                        type="radio" 
                                                        value={3} 
                                                        name={part.idx} 
                                                        onChange={(event) => handleOnChange(event)}>
                                                    </input>
                                                    <label className="form-check-label">
                                                        None of the above are true.
                                                    </label>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div className="form-check" key={"check_" + part.idx + "_radio_" + index2}>
                                                    <input 
                                                        className="form-check-input" 
                                                        type="radio" 
                                                        value={index2} 
                                                        name={part.idx} 
                                                        onChange={(event) => handleOnChange(event)}>
                                                    </input>
                                                    <label className="form-check-label">
                                                        Instead, "{correction.split(',').join(' ')}" is true.
                                                    </label>
                                                </div>
                                            );
                                        }
                                    } else {
                                        return (<div key={"check_" + part.idx + "_radio_" + index2}></div>);
                                    }
                                })}
                                {and_or(index1, currentExample.parts.length)}
                            </div>
                        ))}
                        <hr></hr><p><br></br></p>
                        <button 
                            type="button" 
                            disabled={!validSubmit()} 
                            className="btn btn-outline-primary d-block mx-auto"  
                            onClick={ () => {
                                if (currentExampleNum+2 < max_examples) {
                                    testData.push(mpcFixState);
                                    setTestData(testData);
                                    setMpcState(new Array(examples[currentExampleNum+1].parts.length).fill(false));
                                    setMpcFixState(new Array(examples[currentExampleNum+1].parts.length).fill(-1));
                                    setCorrectState(false);
                                    setCurrentExampleNum(currentExampleNum+1);
                                    setCurrentExample(examples[currentExampleNum+1]);
                                } else if (currentExampleNum+1 < max_examples) {
                                    testData.push(mpcFixState);
                                    setTestData(testData);
                                    setMpcState(new Array(golden[1].parts.length).fill(false));
                                    setMpcFixState(new Array(golden[1].parts.length).fill(-1));
                                    setCorrectState(false);
                                    setCurrentExample(golden[1]);
                                    setCurrentExampleNum(currentExampleNum+1);
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