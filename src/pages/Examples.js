import React, {useState} from 'react';
import examples from '../data/examples.json'



function Examples({setCurrentPage, saveData}) {
    const [prevExample, setPrevExample] = useState(-1)
    const [currentExample, setCurrentExample] = useState(0)
    const [currentAnswered, setCurrentAnswered] = useState(false)
    const [testData, setTestData] = useState([])
    const max_examples = 6

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
        setCurrentAnswered(false);
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

    const evaluateSubmit = () => {
        console.log("mpcState " + mpcState);
        console.log("mpcFixState " + mpcFixState);
        console.log("correctState " + correctState);
        const mpcEval = mpcFixState.map((item, mpcIndex) => {
            if (item === examples[currentExample].parts[mpcIndex].correct_id) {
                return true;
            } else {
                return false;
            }
        });
        return mpcEval.every((val) => val);
    }

    var next_button;
    if (!validSubmit()) {
        next_button = "Disabled. Complete your selection."
    } else if (!currentAnswered) {
        next_button = "Submit Answer"
    } else if (currentExample+1 < max_examples) {
        next_button = "Next Example"
    } else {
        next_button = "Next Stage"
    }

    const mpcHandleOnChange = (position) => {
        if (!currentAnswered) {
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
        }
    };

    const correctHandleOnChange = () => {
        if (!currentAnswered) {
            setMpcState(new Array(examples[currentExample].parts.length).fill(false));
            const updatedFixState = mpcFixState.map(() => -1);
            setMpcFixState(updatedFixState);
            setCorrectState(!correctState);
        }
    };

    
    const explain_str = () => {
        const exp_parts = examples[currentExample].parts.map((part, index) => {
            if (part.correct_id !== -1 && part.correct_id !== mpcFixState[index]) {
                return (
                    <div className="form-check" key={"exp_"+part.idx}>
                        <li className="form-check-label">
                            {"Part " + (parseInt(part.idx)+1) + ", \"" + part.str.split(',').join(' ') + "\", is False. Instead \"" + part.corrections[part.correct_id].split(',').join(' ') + "\" is True."}
                        </li>
                    </div>
                );
            } else {
                return (false);
            }
        })
        if (exp_parts.every((val) => val === false)) {
            return (
                <div className="form-check" key="exp">
                    <label className="form-check-label">
                        The fist answer is correct because the VA's guess and each part of the reasoning are correct.
                    </label>
                </div>
            );
        } else {
            return exp_parts;
        }
    }

    const handleOnChange = (event) => {
        if (!currentAnswered) {
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
        }
    };

    const explanation = () => {
        if (currentAnswered) {
            if (evaluateSubmit()) {
                return (
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8">
                            <div className="card mb-5" style={{backgroundColor:'#ff6433 '}}>
                                <div className="card-body">
                                    <h5 className="card-title"><b>Your answer is correct!</b><br/><br/> </h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                )
            } else {
                return (
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8">
                            <div className="card mb-5" style={{backgroundColor:'#ff6433 '}}>
                                <div className="card-body">
                                    <h5 className="card-title"><b>Your answer is incorrect!</b><br/><br/>Answer Explanation: </h5>
                                    <div className="card-text">
                                        {explain_str()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                )
            }
        } else {
            return (<br/>)
        }
    }

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
                        <h5 className="card-title">Displaying Example {currentExample+1} out of {max_examples} </h5>
                        <div className="card-text">
                            Evaluate the VA’s <b>guess</b> and <b>reasoning</b> below. After submitting your answer, you will be provided the correct answer with an explanation. Note that <b>more than one fact may be wrong</b>.<br/><br/>
                            
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
                        {examples[currentExample].parts.map((part, index1) => (
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
                                                <div className="form-check" key={"check" + part.idx + "_radio_" + index2}>
                                                    <input 
                                                        className="form-check-input" 
                                                        type="radio" 
                                                        value={index2} 
                                                        name={part.idx}
                                                        checked={mpcFixState[index1] === index2}
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
                                                <div className="form-check" key={"check" + part.idx + "_radio_" + index2}>
                                                    <input 
                                                        className="form-check-input" 
                                                        type="radio" 
                                                        value={index2} 
                                                        name={part.idx}
                                                        checked={mpcFixState[index1] === index2}
                                                        onChange={(event) => handleOnChange(event)}>
                                                    </input>
                                                    <label className="form-check-label">
                                                        Instead, "{correction.split(',').join(' ')}" is true.
                                                    </label>
                                                </div>
                                            );
                                        }
                                    } else {
                                        return (<div key={"check_" + part.idx + "_radio_" + index2}></div>)
                                    }
                                })}
                                {and_or(index1, examples[currentExample].parts.length)}
                            </div>
                        ))}
                        <hr></hr><p><br></br></p>
                        {explanation()}
                        <button 
                            type="button" 
                            disabled={!validSubmit()} 
                            className="btn btn-outline-primary d-block mx-auto"  
                            onClick={ () => {
                                if (!currentAnswered) {
                                    setCurrentAnswered(!currentAnswered);
                                    testData.push(mpcFixState);
                                    setTestData(testData);
                                } else if (currentExample+1 < max_examples) {
                                    setMpcState(new Array(examples[currentExample+1].parts.length).fill(false));
                                    setMpcFixState(new Array(examples[currentExample+1].parts.length).fill(-1));
                                    setCorrectState(false);
                                    setCurrentExample(currentExample+1);
                                } else {
                                    saveData(testData);
                                    setCurrentPage("PreTest")
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

export default Examples