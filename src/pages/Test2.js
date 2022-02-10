import React, {useState} from 'react';
import examples from '../data/explanations_decision_tree_local3_best_clean_filtered.json'
import golden from '../data/examples.json'



function Test2({setCurrentPage, saveData, maxExamples, firstExample}) {
    const [currentExampleNum, setCurrentExampleNum] = useState(firstExample);
    const [currentExamplePart, setCurrentExamplePart] = useState(0);
    const [currentExample, setCurrentExample] = useState(examples[currentExampleNum]);
    const [questionAnswer, setQuestionAnswer] = useState([]);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [testData, setTestData] = useState([]);
    const [goldenExample, setGoldenExample] = useState(false);

    var max_examples = firstExample + maxExamples + 1;
    if (firstExample + maxExamples > examples.length){
        max_examples = examples.length + 1;
    }
    
    const validSubmit = () => {
        if (currentAnswer === null) {
            return false;
        } else {
            return true;
        }
    }

    var next_button;
    if (!validSubmit()) {
        next_button = "Disabled. Complete your selection."
    } else if (currentExampleNum+1 < max_examples) {
        next_button = "Next Example"
    } else {
        next_button = "Next Stage"
    }

    const handleOnChange = (event) => {
        setCurrentAnswer(parseInt(event.target.value));
    };

    const formatReasoning = (exampleNum, partNum) => {
        const reasoning = currentExample.parts.map((part, index) => {
            if (index === partNum) {
                return (<b>{part.str.charAt(0).toUpperCase() + part.str.slice(1) + " "}</b>);
            } else {
                return (part.str.charAt(0).toUpperCase() + part.str.slice(1) + " ");
            }
        });
        var guess;
        if (partNum === currentExample.parts.length) {
            guess = <b>{currentExample.str}</b>;
        } else {
            guess = currentExample.str;
        }
        return (
            <span>
                {reasoning} Therefore, {guess}
            </span>
        );
    }

    const formatMPC = (exampleNum, partNum) => {
        if (partNum < currentExample.parts.length) {
            return (
                currentExample.parts[partNum].corrections.map((correction, index2) => {
                    if (index2 === 0) {
                        let head = currentExample.parts[partNum].str_list[0];
                        let rel = currentExample.parts[partNum].str_list[1];
                        let tail = currentExample.parts[partNum].str_list[2];
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
                        if (currentExample.parts[partNum].colors.reduce(color_redux) === "rbb") {
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
                        if (currentExample.parts[partNum].colors.reduce(color_redux) === "rbb") {
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
                    } else if (index2+1 === currentExample.parts[partNum].corrections.length) {
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
                        if (currentExample.parts[partNum].colors.reduce(color_redux) === "rbb") {
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
                        if (currentExample.parts[partNum].colors.reduce(color_redux) === "rbb") {
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
                        "{currentExample.str.charAt(0).toUpperCase() + currentExample.str.slice(1)}" is <span style={{color:"red"}}>True</span>.
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
                    
                        "{currentExample.str.charAt(0).toUpperCase() + currentExample.str.slice(1)}" is <span style={{color:"red"}}>False</span>.
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
                        <h5 className="card-title">Displaying Example {(currentExampleNum-firstExample)+1} out of {max_examples-firstExample} </h5>
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
                        <button 
                            type="button" 
                            disabled={!validSubmit()} 
                            className="btn btn-outline-primary d-block mx-auto"  
                            onClick={ () => {
                                if (currentExamplePart+1 < examples[currentExampleNum].parts.length+1 & !goldenExample) {
                                    // save data
                                    questionAnswer.push(currentAnswer);
                                    setQuestionAnswer(questionAnswer);
                                    // move to next and reset
                                    setCurrentExamplePart(currentExamplePart+1);
                                    setCurrentAnswer(null);
                                } else if (currentExamplePart+1 < golden[1].parts.length+1 & goldenExample) {
                                    // save data
                                    questionAnswer.push(currentAnswer);
                                    setQuestionAnswer(questionAnswer);
                                    // move to next and reset
                                    setCurrentExamplePart(currentExamplePart+1);
                                    setCurrentAnswer(null);
                                } else if (currentExampleNum+2 < max_examples) {
                                    // save data
                                    questionAnswer.push(currentAnswer);
                                    setQuestionAnswer(questionAnswer);
                                    testData.push(questionAnswer);
                                    setTestData(testData);
                                    // move to next and reset
                                    setCurrentExamplePart(0);
                                    setCurrentExampleNum(currentExampleNum+1);
                                    setCurrentExample(examples[currentExampleNum+1]);
                                    setCurrentAnswer(null);
                                    setQuestionAnswer([]);
                                } else if (currentExampleNum+1 < max_examples) {
                                    // save data
                                    questionAnswer.push(currentAnswer);
                                    setQuestionAnswer(questionAnswer);
                                    testData.push(questionAnswer);
                                    setTestData(testData);
                                    // move to next and reset
                                    setCurrentExamplePart(0);
                                    setCurrentExampleNum(currentExampleNum+1);
                                    setCurrentExample(golden[1]);
                                    setCurrentAnswer(null);
                                    setQuestionAnswer([]);
                                    setGoldenExample(true);
                                } else {
                                    // save data
                                    questionAnswer.push(currentAnswer);
                                    setQuestionAnswer(questionAnswer);
                                    testData.push(questionAnswer);
                                    setTestData(testData);
                                    saveData(testData);
                                    // move to next
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

export default Test2