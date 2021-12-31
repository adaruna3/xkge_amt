import React, {useState} from 'react';
import {format} from 'react-string-format';
import examples from '../data/examples.json';



function Examples({setCurrentPage, saveData}) {
    const [currentExampleNum, setCurrentExampleNum] = useState(0);
    const [currentExamplePart, setCurrentExamplePart] = useState(0);
    const [currentAnswered, setCurrentAnswered] = useState(false);
    const [questionAnswer, setQuestionAnswer] = useState([]);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [testData, setTestData] = useState([]);
    const max_examples = 4;

    const validSubmit = () => {
        if (currentAnswer === null) {
            return false;
        } else {
            return true;
        }
    }

    const evaluateSubmit = () => {
        var mpcEval;
        if (currentExamplePart < examples[currentExampleNum].parts.length) {
            mpcEval = examples[currentExampleNum].parts[currentExamplePart].correct_id === currentAnswer;
        } else {
            const correctEval = examples[currentExampleNum].parts.map((part) =>
                part.correct_id
            );
            mpcEval = (correctEval.every((val) => val === -1) && currentAnswer) || (!correctEval.every((val) => val === -1) && !currentAnswer);
        }
        return mpcEval;
    }

    var next_button;
    if (!validSubmit()) {
        next_button = "Disabled. Complete your selection."
    } else if (!currentAnswered) {
        next_button = "Submit Answer"
    } else if (currentExampleNum+1 < max_examples) {
        next_button = "Next Example"
    } else {
        next_button = "Next Stage"
    }
    
    const explain_str = () => {
        var rel2str = {
            "HasEffect": "The act of {0} an object will make it {1}.",
            "_HasEffect": "An object is {0} after {1} it.",
            "InverseActionOf": "{0} an object is the opposite of {1} an object.",
            "_InverseActionOf": "{0} an object is the opposite of {1} an object.",
            "InverseStateOf": "An object being {0} is the opposite of being {1}.",
            "_InverseStateOf": "An object being {0} is the opposite of being {1}.",
            "LocInRoom": "{0} can often be found in {1}.",
            "_LocInRoom": "{0} often can contain {1}.",
            "ObjCanBe": "{0} can be {1}.",
            "_ObjCanBe": "{0} can be {1}.",
            "ObjInLoc": "{0} is often in {1}.",
            "_ObjInLoc": "{0} often can contain {1}.",
            "ObjInRoom": "{0} can often be found in {1}.",
            "_ObjInRoom": "{0} often can contain {1}.",
            "ObjOnLoc": "{0} is often in {1}.",
            "_ObjOnLoc": "{0} often can contain {1}.",
            "ObjUsedTo": "{0} is used to {1}.",
            "_ObjUsedTo": "{0} can be done using {1}.",
            "ObjhasState": "{0} can be {1}.",
            "_ObjhasState": "{0} can be {1}.",
            "OperatesOn": "{0} is usually used on {1}.",
            "_OperatesOn": "{0} is usually used on {1}.",
        };
        if (currentExamplePart < examples[currentExampleNum].parts.length) {
            if (examples[currentExampleNum].parts[currentExamplePart].correct_id === -1) {
                let str1 = examples[currentExampleNum].parts[currentExamplePart].str;
                return (
                    <div className="form-check">
                        <li className="form-check-label">
                            "{str1.charAt(0).toUpperCase() + str1.slice(1)}" is most correct.
                        </li>
                    </div>
                );
            } else {
                let head = examples[currentExampleNum].parts[currentExamplePart].corrections[examples[currentExampleNum].parts[currentExamplePart].correct_id][0]
                let rel = examples[currentExampleNum].parts[currentExamplePart].corrections[examples[currentExampleNum].parts[currentExamplePart].correct_id][1]
                let tail = examples[currentExampleNum].parts[currentExamplePart].corrections[examples[currentExampleNum].parts[currentExamplePart].correct_id][2]
                let str1 = format(rel2str[rel], head, tail);
                return (
                    <div className="form-check">
                        <li className="form-check-label">
                            "{str1.charAt(0).toUpperCase() + str1.slice(1)}", is most correct.
                        </li>
                    </div>
                );
            }
        } else {
            const correctEval = examples[currentExampleNum].parts.map((part) =>
                part.correct_id
            );
            if (correctEval.every((val) => val === -1)) {
                let str1 = examples[currentExampleNum].str
                return (
                    <div className="form-check">
                        <li className="form-check-label">
                            "{str1.charAt(0).toUpperCase() + str1.slice(1)}" is True.
                        </li>
                    </div>
                );
            } else {
                let str1 = examples[currentExampleNum].str
                return (
                    <div className="form-check">
                        <li className="form-check-label">
                        "{str1.charAt(0).toUpperCase() + str1.slice(1)}" is False.
                        </li>
                    </div>
                );
            }
        }
    }

    const handleOnChange = (event) => {
        if (!currentAnswered) {
            setCurrentAnswer(parseInt(event.target.value));
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

    const formatReasoning = (exampleNum, partNum) => {
        const reasoning = examples[exampleNum].parts.map((part, index) => {
            if (index === partNum) {
                return (<b>{part.str.charAt(0).toUpperCase() + part.str.slice(1) + " "}</b>);
            } else {
                return (part.str.charAt(0).toUpperCase() + part.str.slice(1) + " ");
            }
        });
        var guess;
        if (partNum === examples[exampleNum].parts.length) {
            guess = <b>{examples[exampleNum].str}</b>;
        } else {
            guess = examples[exampleNum].str;
        }
        return (
            <span>
                {reasoning} Therefore, {guess}
            </span>
        );
    }

    const formatMPC = (exampleNum, partNum) => {
        if (partNum < examples[exampleNum].parts.length) {
            return (
                examples[exampleNum].parts[partNum].corrections.map((correction, index2) => {
                    if (index2 === 0) {
                        let head = examples[exampleNum].parts[partNum].str_list[0];
                        let rel = examples[exampleNum].parts[partNum].str_list[1];
                        let tail = examples[exampleNum].parts[partNum].str_list[2];
                        let rbb_rel2str = {
                            "HasEffect": <span>"The act of <span style={{color:"red"}}>{head}</span> an object<span style={{color:"blue"}}> will make it {tail}</span>."</span>,
                            "_HasEffect": <span>"An object is <span style={{color:"red"}}>{head}</span><span style={{color:"blue"}}> after {tail}</span> it."</span>,
                            "InverseActionOf": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> an object is the opposite of {tail}</span> an object."</span>,
                            "_InverseActionOf": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> an object is the opposite of {tail}</span> an object."</span>,
                            "InverseStateOf": <span>"An object being <span style={{color:"red"}}>{head}</span><span style={{color:"blue"}}> is the opposite of being {tail}</span>."</span>,
                            "_InverseStateOf": <span>"An object being <span style={{color:"red"}}>{head}</span><span style={{color:"blue"}}> is the opposite of being {tail}</span>."</span>,
                            "LocInRoom": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can often be found in {tail}</span>."</span>,
                            "_LocInRoom": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> often can contain {tail}</span>."</span>,
                            "ObjCanBe": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be {tail}</span>."</span>,
                            "_ObjCanBe": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be {tail}</span>."</span>,
                            "ObjInLoc": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is often in {tail}</span>."</span>,
                            "_ObjInLoc": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> often can contain {tail}</span>."</span>,
                            "ObjInRoom": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can often be found in {tail}</span>."</span>,
                            "_ObjInRoom": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> often can contain {tail}</span>."</span>,
                            "ObjOnLoc": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is often in {tail}</span>."</span>,
                            "_ObjOnLoc": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> often can contain {tail}</span>."</span>,
                            "ObjUsedTo": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is used to {tail}</span>."</span>,
                            "_ObjUsedTo": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be done using {tail}</span>."</span>,
                            "ObjhasState": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be {tail}</span>."</span>,
                            "_ObjhasState": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be {tail}</span>."</span>,
                            "OperatesOn": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is usually used on {tail}</span>."</span>,
                            "_OperatesOn": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is usually used on {tail}</span>."</span>,
                        };
                        let bbr_rel2str = {
                            "HasEffect": <span>"The act of <span style={{color:"blue"}}>{head} an object will make it </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_HasEffect": <span>"An object is <span style={{color:"blue"}}>{head} after </span><span style={{color:"red"}}>{tail}</span> it."</span>,
                            "InverseActionOf": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} an object is the opposite of </span><span style={{color:"red"}}>{tail}</span> an object."</span>,
                            "_InverseActionOf": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} an object is the opposite of </span><span style={{color:"red"}}>{tail}</span> an object."</span>,
                            "InverseStateOf": <span>"An object being <span style={{color:"blue"}}>{head} is the opposite of being </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_InverseStateOf": <span>"An object being <span style={{color:"blue"}}>{head} is the opposite of being </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "LocInRoom": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can often be found in </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_LocInRoom": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} often can contain </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjCanBe": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjCanBe": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjInLoc": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is often in </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjInLoc": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} often can contain </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjInRoom": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can often be found in </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjInRoom": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} often can contain </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjOnLoc": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is often in </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjOnLoc": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} often can contain </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjUsedTo": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is used to </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjUsedTo": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be done using </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjhasState": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjhasState": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "OperatesOn": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is usually used on </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_OperatesOn": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is usually used on </span><span style={{color:"red"}}>{tail}</span>."</span>,
                        };
                        var part_str;
                        let color_redux = (prev, curr) => prev + curr;
                        if (examples[exampleNum].parts[partNum].colors.reduce(color_redux) === "rbb") {
                            part_str = rbb_rel2str[rel];
                        } else {
                            part_str = bbr_rel2str[rel];
                        }
                        head = correction[0];
                        rel = correction[1];
                        tail = correction[2];
                        rbb_rel2str = {
                            "HasEffect": <span>"The act of <span styles={{color:"red"}}>{head}</span> an object<span style={{color:"blue"}}> will make it {tail}</span>."</span>,
                            "_HasEffect": <span>"An object is <span style={{color:"red"}}>{head}</span><span style={{color:"blue"}}> after {tail}</span> it."</span>,
                            "InverseActionOf": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> an object is the opposite of {tail}</span> an object."</span>,
                            "_InverseActionOf": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> an object is the opposite of {tail}</span> an object."</span>,
                            "InverseStateOf": <span>"An object being <span style={{color:"red"}}>{head}</span><span style={{color:"blue"}}> is the opposite of being {tail}</span>."</span>,
                            "_InverseStateOf": <span>"An object being <span style={{color:"red"}}>{head}</span><span style={{color:"blue"}}> is the opposite of being {tail}</span>."</span>,
                            "LocInRoom": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can often be found in {tail}</span>."</span>,
                            "_LocInRoom": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> often can contain {tail}</span>."</span>,
                            "ObjCanBe": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be {tail}</span>."</span>,
                            "_ObjCanBe": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be {tail}</span>."</span>,
                            "ObjInLoc": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is often in {tail}</span>."</span>,
                            "_ObjInLoc": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> often can contain {tail}</span>."</span>,
                            "ObjInRoom": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can often be found in {tail}</span>."</span>,
                            "_ObjInRoom": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> often can contain {tail}</span>."</span>,
                            "ObjOnLoc": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is often in {tail}</span>."</span>,
                            "_ObjOnLoc": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> often can contain {tail}</span>."</span>,
                            "ObjUsedTo": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is used to {tail}</span>."</span>,
                            "_ObjUsedTo": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be done using {tail}</span>."</span>,
                            "ObjhasState": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be {tail}</span>."</span>,
                            "_ObjhasState": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be {tail}</span>."</span>,
                            "OperatesOn": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is usually used on {tail}</span>."</span>,
                            "_OperatesOn": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is usually used on {tail}</span>."</span>,
                        };
                        bbr_rel2str = {
                            "HasEffect": <span>"The act of <span style={{color:"blue"}}>{head} an object will make it </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_HasEffect": <span>"An object is <span style={{color:"blue"}}>{head} after </span><span style={{color:"red"}}>{tail}</span> it."</span>,
                            "InverseActionOf": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} an object is the opposite of </span><span style={{color:"red"}}>{tail}</span> an object."</span>,
                            "_InverseActionOf": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} an object is the opposite of </span><span style={{color:"red"}}>{tail}</span> an object."</span>,
                            "InverseStateOf": <span>"An object being <span style={{color:"blue"}}>{head} is the opposite of being </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_InverseStateOf": <span>"An object being <span style={{color:"blue"}}>{head} is the opposite of being </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "LocInRoom": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can often be found in </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_LocInRoom": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} often can contain </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjCanBe": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjCanBe": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjInLoc": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is often in </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjInLoc": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} often can contain </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjInRoom": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can often be found in </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjInRoom": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} often can contain </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjOnLoc": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is often in </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjOnLoc": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} often can contain </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjUsedTo": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is used to </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjUsedTo": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be done using </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjhasState": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjhasState": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "OperatesOn": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is usually used on </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_OperatesOn": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is usually used on </span><span style={{color:"red"}}>{tail}</span>."</span>,
                        };
                        var correction_str;
                        if (examples[exampleNum].parts[partNum].colors.reduce(color_redux) === "rbb") {
                            correction_str = rbb_rel2str[rel];
                        } else {
                            correction_str = bbr_rel2str[rel];
                        }
                        return (
                            <div className="form-check" key={"radio_" + index2}>
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    value={-1} 
                                    name={exampleNum + "_" + partNum} 
                                    checked={currentAnswer === -1}
                                    onChange={(event) => handleOnChange(event)}>
                                </input>
                                <label className="form-check-label">
                                    {part_str}
                                </label>
                                <br/>
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    value={index2}
                                    name={exampleNum + "_" + partNum} 
                                    checked={currentAnswer === index2}
                                    onChange={(event) => handleOnChange(event)}>
                                </input>
                                <label className="form-check-label">
                                    {correction_str}
                                </label>
                            </div>
                        );
                    } else if (index2+1 === examples[exampleNum].parts[partNum].corrections.length) {
                        let head = correction[0];
                        let rel = correction[1];
                        let tail = correction[2];
                        let rbb_rel2str = {
                            "HasEffect": <span>"The act of <span style={{color:"red"}}>{head}</span> an object<span style={{color:"blue"}}> will make it {tail}</span>."</span>,
                            "_HasEffect": <span>"An object is <span style={{color:"red"}}>{head}</span><span style={{color:"blue"}}> after {tail}</span> it."</span>,
                            "InverseActionOf": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> an object is the opposite of {tail}</span> an object."</span>,
                            "_InverseActionOf": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> an object is the opposite of {tail}</span> an object."</span>,
                            "InverseStateOf": <span>"An object being <span style={{color:"red"}}>{head}</span><span style={{color:"blue"}}> is the opposite of being {tail}</span>."</span>,
                            "_InverseStateOf": <span>"An object being <span style={{color:"red"}}>{head}</span><span style={{color:"blue"}}> is the opposite of being {tail}</span>."</span>,
                            "LocInRoom": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can often be found in {tail}</span>."</span>,
                            "_LocInRoom": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> often can contain {tail}</span>."</span>,
                            "ObjCanBe": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be {tail}</span>."</span>,
                            "_ObjCanBe": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be {tail}</span>."</span>,
                            "ObjInLoc": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is often in {tail}</span>."</span>,
                            "_ObjInLoc": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> often can contain {tail}</span>."</span>,
                            "ObjInRoom": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can often be found in {tail}</span>."</span>,
                            "_ObjInRoom": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> often can contain {tail}</span>."</span>,
                            "ObjOnLoc": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is often in {tail}</span>."</span>,
                            "_ObjOnLoc": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> often can contain {tail}</span>."</span>,
                            "ObjUsedTo": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is used to {tail}</span>."</span>,
                            "_ObjUsedTo": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be done using {tail}</span>."</span>,
                            "ObjhasState": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be {tail}</span>."</span>,
                            "_ObjhasState": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be {tail}</span>."</span>,
                            "OperatesOn": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is usually used on {tail}</span>."</span>,
                            "_OperatesOn": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is usually used on {tail}</span>."</span>,
                        };
                        let bbr_rel2str = {
                            "HasEffect": <span>"The act of <span style={{color:"blue"}}>{head} an object will make it </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_HasEffect": <span>"An object is <span style={{color:"blue"}}>{head} after </span><span style={{color:"red"}}>{tail}</span> it."</span>,
                            "InverseActionOf": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} an object is the opposite of </span><span style={{color:"red"}}>{tail}</span> an object."</span>,
                            "_InverseActionOf": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} an object is the opposite of </span><span style={{color:"red"}}>{tail}</span> an object."</span>,
                            "InverseStateOf": <span>"An object being <span style={{color:"blue"}}>{head} is the opposite of being </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_InverseStateOf": <span>"An object being <span style={{color:"blue"}}>{head} is the opposite of being </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "LocInRoom": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can often be found in </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_LocInRoom": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} often can contain </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjCanBe": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjCanBe": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjInLoc": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is often in </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjInLoc": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} often can contain </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjInRoom": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can often be found in </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjInRoom": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} often can contain </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjOnLoc": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is often in </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjOnLoc": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} often can contain </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjUsedTo": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is used to </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjUsedTo": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be done using </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjhasState": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjhasState": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "OperatesOn": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is usually used on </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_OperatesOn": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is usually used on </span><span style={{color:"red"}}>{tail}</span>."</span>,
                        };
                        let correction_str;
                        let color_redux = (prev, curr) => prev + curr;
                        if (examples[exampleNum].parts[partNum].colors.reduce(color_redux) === "rbb") {
                            correction_str = rbb_rel2str[rel];
                        } else {
                            correction_str = bbr_rel2str[rel];
                        }
                        return (
                            <div className="form-check" key={"radio_" + index2}>
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    value={index2}
                                    name={exampleNum + "_" + partNum} 
                                    checked={currentAnswer === index2}
                                    onChange={(event) => handleOnChange(event)}>
                                </input>
                                <label className="form-check-label">
                                    {correction_str}
                                </label>
                                <br/>
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    value={3} 
                                    name={exampleNum + "_" + partNum} 
                                    checked={currentAnswer === 3}
                                    onChange={(event) => handleOnChange(event)}>
                                </input>
                                <label className="form-check-label">
                                    None of the above are True.
                                </label>
                            </div>
                        );
                    } else {
                        let head = correction[0];
                        let rel = correction[1];
                        let tail = correction[2];
                        let rbb_rel2str = {
                            "HasEffect": <span>"The act of <span style={{color:"red"}}>{head}</span> an object<span style={{color:"blue"}}> will make it {tail}</span>."</span>,
                            "_HasEffect": <span>"An object is <span style={{color:"red"}}>{head}</span><span style={{color:"blue"}}> after {tail}</span> it."</span>,
                            "InverseActionOf": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> an object is the opposite of {tail}</span> an object."</span>,
                            "_InverseActionOf": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> an object is the opposite of {tail}</span> an object."</span>,
                            "InverseStateOf": <span>"An object being <span style={{color:"red"}}>{head}</span><span style={{color:"blue"}}> is the opposite of being {tail}</span>."</span>,
                            "_InverseStateOf": <span>"An object being <span style={{color:"red"}}>{head}</span><span style={{color:"blue"}}> is the opposite of being {tail}</span>."</span>,
                            "LocInRoom": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can often be found in {tail}</span>."</span>,
                            "_LocInRoom": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> often can contain {tail}</span>."</span>,
                            "ObjCanBe": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be {tail}</span>."</span>,
                            "_ObjCanBe": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be {tail}</span>."</span>,
                            "ObjInLoc": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is often in {tail}</span>."</span>,
                            "_ObjInLoc": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> often can contain {tail}</span>."</span>,
                            "ObjInRoom": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can often be found in {tail}</span>."</span>,
                            "_ObjInRoom": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> often can contain {tail}</span>."</span>,
                            "ObjOnLoc": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is often in {tail}</span>."</span>,
                            "_ObjOnLoc": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> often can contain {tail}</span>."</span>,
                            "ObjUsedTo": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is used to {tail}</span>."</span>,
                            "_ObjUsedTo": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be done using {tail}</span>."</span>,
                            "ObjhasState": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be {tail}</span>."</span>,
                            "_ObjhasState": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> can be {tail}</span>."</span>,
                            "OperatesOn": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is usually used on {tail}</span>."</span>,
                            "_OperatesOn": <span>"<span style={{color:"red"}}>{head.charAt(0).toUpperCase() + head.slice(1)}</span><span style={{color:"blue"}}> is usually used on {tail}</span>."</span>,
                        };
                        let bbr_rel2str = {
                            "HasEffect": <span>"The act of <span style={{color:"blue"}}>{head} an object will make it </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_HasEffect": <span>"An object is <span style={{color:"blue"}}>{head} after </span><span style={{color:"red"}}>{tail}</span> it."</span>,
                            "InverseActionOf": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} an object is the opposite of </span><span style={{color:"red"}}>{tail}</span> an object."</span>,
                            "_InverseActionOf": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} an object is the opposite of </span><span style={{color:"red"}}>{tail}</span> an object."</span>,
                            "InverseStateOf": <span>"An object being <span style={{color:"blue"}}>{head} is the opposite of being </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_InverseStateOf": <span>"An object being <span style={{color:"blue"}}>{head} is the opposite of being </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "LocInRoom": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can often be found in </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_LocInRoom": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} often can contain </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjCanBe": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjCanBe": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjInLoc": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is often in </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjInLoc": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} often can contain </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjInRoom": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can often be found in </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjInRoom": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} often can contain </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjOnLoc": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is often in </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjOnLoc": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} often can contain </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjUsedTo": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is used to </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjUsedTo": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be done using </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "ObjhasState": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_ObjhasState": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} can be </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "OperatesOn": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is usually used on </span><span style={{color:"red"}}>{tail}</span>."</span>,
                            "_OperatesOn": <span>"<span style={{color:"blue"}}>{head.charAt(0).toUpperCase() + head.slice(1)} is usually used on </span><span style={{color:"red"}}>{tail}</span>."</span>,
                        };
                        let correction_str;
                        let color_redux = (prev, curr) => prev + curr;
                        if (examples[exampleNum].parts[partNum].colors.reduce(color_redux) === "rbb") {
                            correction_str = rbb_rel2str[rel];
                        } else {
                            correction_str = bbr_rel2str[rel];
                        }
                        return (
                            <div className="form-check" key={"radio_" + index2}>
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    value={index2} 
                                    name={exampleNum + "_" + partNum} 
                                    checked={currentAnswer === index2}
                                    onChange={(event) => handleOnChange(event)}>
                                </input>
                                <label className="form-check-label">
                                    {correction_str}
                                </label>
                            </div>
                        );
                    }
                })
            );
        } else {
            return (
                <div className="form-check" key={"radio"}>
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        value={1} 
                        name={exampleNum + "_" + partNum} 
                        checked={currentAnswer === 1}
                        onChange={(event) => handleOnChange(event)}>
                    </input>
                    <label className="form-check-label">
                        "{examples[exampleNum].str.charAt(0).toUpperCase() + examples[exampleNum].str.slice(1)}" is <span style={{color:"red"}}>True</span>.
                    </label>
                    <br/>
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        value={0} 
                        name={exampleNum + "_" + partNum} 
                        checked={currentAnswer === 0}
                        onChange={(event) => handleOnChange(event)}>
                    </input>
                    <label className="form-check-label">
                    
                        "{examples[exampleNum].str.charAt(0).toUpperCase() + examples[exampleNum].str.slice(1)}" is <span style={{color:"red"}}>False</span>.
                    </label>
                </div>
            );
        }
    }
    
    return (
        <div className="container-rules">
            <div className="container">
                <div className="card mb-5" style={{backgroundColor:'#F0F0F0'}}>
                    <div className="card-body">
                        <h5 className="card-title">Displaying Example {currentExampleNum+1} out of {max_examples} </h5>
                        <div className="card-text">
                            <br/>
                            <div className="row">
                                <div className="col-3 text-right">The robot’s reasoning:</div>
                                <div className="col-9">
                                    {formatReasoning(currentExampleNum, currentExamplePart)}<br/><br/>
                                </div>
                            </div>
                             
                            Evaluate the <b>bold</b> part of the robot's reasoning by selecting the <i>most correct</i> choice below.<br/>
                        </div><hr/>
                        {formatMPC(currentExampleNum, currentExamplePart)}
                        <hr></hr><p><br></br></p>
                        {explanation()}
                        <button 
                            type="button" 
                            disabled={!validSubmit()} 
                            className="btn btn-outline-primary d-block mx-auto"  
                            onClick={ () => {
                                if (!currentAnswered) {
                                    setCurrentAnswered(!currentAnswered);
                                    questionAnswer.push(currentAnswer)
                                    setQuestionAnswer(questionAnswer);
                                } else if (currentExamplePart+1 < examples[currentExampleNum].parts.length+1) {
                                    setCurrentExamplePart(currentExamplePart+1);
                                    setCurrentAnswer(null);
                                    setCurrentAnswered(!currentAnswered);
                                } else if (currentExampleNum+1 < max_examples) {
                                    setCurrentExamplePart(0);
                                    setCurrentExampleNum(currentExampleNum+1);
                                    setCurrentAnswer(null);
                                    setCurrentAnswered(!currentAnswered);
                                    testData.push(questionAnswer);
                                    setTestData(testData);
                                    setQuestionAnswer([]);
                                }else {
                                    testData.push(questionAnswer);
                                    setTestData(testData);
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