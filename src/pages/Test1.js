import React, {useState} from 'react';
import ReactPlayer from 'react-player'
import why_qs from '../data/user_preferences_amt_explanations.json'



function Test1({setCurrentPage, saveData}) {
    function shuffleArray(array) {
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    var questions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
    {/*var questions_need_data = [4,5,8,11]
    var questions_done = [0,2,9,13]*/}

    const [currentExampleNum, setCurrentExampleNum] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [testData, setTestData] = useState([]);
    const [questionShuffled, setQuestionShuffled] = useState(false);
    const [questionOrder, setQuestionOrder] = useState(questions);
    const [questionType, setQuestionType] = useState(null);
    {/*const [questionsDoneOrder, setQuestionsDoneOrder] = useState(questions_done);
    const [goldFixed, setGoldFixed] = useState(false);*/}
    const max_examples = 15;

    if (!questionShuffled) {
        setQuestionOrder(shuffleArray(questions));
        {/*setQuestionsDoneOrder(shuffleArray(questions_done));*/}
        setQuestionShuffled(!questionShuffled);
    }
    {/*if (questionShuffled && !goldFixed) {
        {/* following done so "gold" questions are ones we no longer need data for
        const temp_questions = [...questionOrder]
        var no_fix = true;
        if (questions_need_data.includes(temp_questions[1])) {
            let temp = temp_questions[1];
            let swap_idx = temp_questions.indexOf(questionsDoneOrder[0]);
            temp_questions[1] = temp_questions[swap_idx];
            temp_questions[swap_idx] = temp;
            no_fix = false;
        }
        if (questions_need_data.includes(temp_questions[5])) {
            let temp = temp_questions[5];
            let swap_idx = temp_questions.indexOf(questionsDoneOrder[1]);
            temp_questions[5] = temp_questions[swap_idx];
            temp_questions[swap_idx] = temp;
            no_fix = false;
        }
        if (questions_need_data.includes(temp_questions[9])) {
            let temp = temp_questions[9];
            let swap_idx = temp_questions.indexOf(questionsDoneOrder[2]);
            temp_questions[9] = temp_questions[swap_idx];
            temp_questions[swap_idx] = temp;
            no_fix = false;
        }
        if (questions_need_data.includes(temp_questions[13])) {
            let temp = temp_questions[13];
            let swap_idx = temp_questions.indexOf(questionsDoneOrder[3]);
            temp_questions[13] = temp_questions[swap_idx];
            temp_questions[swap_idx] = temp;
            no_fix = false;
        }
        setQuestionOrder(temp_questions);
        if (no_fix) {
            setGoldFixed(!goldFixed);
            console.log(temp_questions);
        }
    }*/}
    const [currentExample, setCurrentExample] = useState(why_qs[questionOrder[currentExampleNum]]);
    
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
        next_button = "Next Why Question"
    } else {
        next_button = "Next Stage"
    }

    const handleOnChange = (event) => {
        setCurrentAnswer(parseInt(event.target.value));
    };
    
    const selectWhyQ = (q1, q2) => {
        if (questionType == null) {
            currentExample["responses"] = shuffleArray(currentExample["responses"]);
            if (getRandomInt(2)) {
                setQuestionType(true);
            } else {
                setQuestionType(false);
            }
        }
        if (questionType) {
            const q = q1.slice(4,q1.length-1)
            return (<span>Robot, why <span style={{color:"red"}}>{q}</span>?</span>);
        } else {
            const q = q2.slice(4,q2.length-1)
            return (<span>Robot, why <span style={{color:"red"}}>{q}</span>?</span>);
        }
    }

    const setVideo = (video_name) => {
        return (<ReactPlayer 
            url = {video_name} 
            controls={true} 
            width="100%" 
            height= "100%"
            playing={true}
        />)
    }
    
    return (
        <div className="container-rules">
            <div className="container">
                <br/>
                <div className="card mb-5" style={{backgroundColor:'#F0F0F0'}}>
                    <div className="card-body">
                        <h5 className="card-title">Question {currentExampleNum+1} out of {max_examples} </h5>
                        <div className="card-text">
                            <div className="row align-items-center">
                                {/*<div className="col-3 text-left">
                                    Robot Plan:
                                    <ul class="list-group">
                                        {currentExample["plan"].map((step) => {
                                            if (step[1] === "Interrupted Action") {
                                                return (<li class="list-group-item list-group-item-success">{step[0]}</li>);
                                            } else if (step[1] === "Next Action") {
                                                return (<li class="list-group-item list-group-item-warning">{step[0]}</li>);
                                            } else {
                                                return (<li class="list-group-item list-group-item-dark">{step[0]}</li>);
                                            }
                                            
                                        })}
                                    </ul>
                                </div>
                                <div className="col-2 text-left">
                                    Status:
                                    <ul class="list-group">
                                        {currentExample["plan"].map((step) => {
                                                if (step[1] === "Interrupted Action") {
                                                    return (<li class="list-group-item list-group-item-success">{step[1]}</li>);
                                                } else if (step[1] === "Next Action") {
                                                    return (<li class="list-group-item list-group-item-warning">{step[1]}</li>);
                                                } else {
                                                    return (<li class="list-group-item list-group-item-dark">{step[1]}</li>);
                                                }
                                                
                                        })}
                                    </ul>
                                </div>*/}
                                <div className="col-2">
                                </div>
                                <div className="col-8">
                                    Video of Robot Before Asking Why Question:
                                    {setVideo(currentExample["video"])}
                                </div>
                                <div className="col-2">
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-4 text-right"><b>"Why"</b> Question:</div>
                                <div className="col-8">
                                    {selectWhyQ(currentExample["why_q1"],currentExample["why_q2"])}<br/><br/>
                                </div>
                            </div>
                             
                            Select the best robot response to the <b>"why" question</b> in red below:<br/>

                        </div><hr/>
                        {currentExample["responses"].map((ex, index) => {
                            if (currentExampleNum !== 1 && currentExampleNum !== 5 && currentExampleNum !== 9 && currentExampleNum !== 13) {
                                return (
                                    <div className="form-check" key={"radio_" + index}>
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            value={index}
                                            name={currentExampleNum + "_" + index} 
                                            checked={currentAnswer === index}
                                            onChange={(event) => handleOnChange(event)}>
                                        </input>
                                        <label className="form-check-label">
                                            {ex[1]}<br/><br/>
                                        </label>
                                    </div>
                                );
                            } else {
                                var ex_str = "";
                                if (questionType) {
                                    if (ex[0] === "causal") {
                                        if (currentExample["relation"] === "ObjInLoc" || currentExample["relation"] === "ObjOnLoc") {
                                            ex_str = ex[1].slice(0,ex[1].indexOf("to later")+9)
                                            if (currentExampleNum === 1) {
                                                ex_str += " jump into a swimming pool filled with pickle juice."
                                            } else if (currentExampleNum === 5) {
                                                ex_str += " fly into outer space on a magical flying unicorn."
                                            } else if (currentExampleNum === 9) {
                                                ex_str += " dive to the bottom of the ocean on a giant starfish."
                                            } else {
                                                ex_str += " fly into the clouds on a magic school bus."
                                            }
                                        } else if (currentExample["relation"] === "ObjUsedTo") {
                                            ex_str = ex[1].slice(0,ex[1].indexOf("to later")+9)
                                            if (currentExampleNum === 1) {
                                                ex_str += " slay a fire breathing dragon and save a trapped toad."
                                            } else if (currentExampleNum === 5){
                                                ex_str += " find bigfoot in a candy forest and eat chocolate together."
                                            } else if (currentExampleNum === 9){
                                                ex_str += " climb an ice cream mountain covered in chocolate syrup."
                                            } else {
                                                ex_str += " live in a gingerbread house made of candy and frosting."
                                            }
                                        } else if (currentExample["relation"] === "HasEffect") {
                                            ex_str = ex[1].slice(0,ex[1].indexOf("to fulfill")+11)
                                            if (currentExampleNum === 1) {
                                                ex_str += " my life dream of growing two legs."
                                            } else if (currentExampleNum === 5){
                                                ex_str += " the task Santa Claus gave me yesterday."
                                            } else if (currentExampleNum === 9){
                                                ex_str += " my goal of becoming a lead singer in a band."
                                            } else {
                                                ex_str += " the job the tooth fairy told me to do."
                                            }
                                        }
                                    } else {
                                        ex_str = ex[1]
                                    }
                                } else {
                                    if (ex[0] === "xkge") {
                                        if (currentExample["relation"] === "ObjInLoc" || currentExample["relation"] === "ObjOnLoc") {
                                            ex_str = ex[1].slice(0,11)
                                            if (currentExampleNum === 1) {
                                                ex_str += " fairy tales were made for cows and goats to make them listen to their parents."
                                                ex_str += " Sometime they are happy."
                                            } else if (currentExampleNum === 5) {
                                                ex_str += " there is a whale with a large spoon in the middle of the ocean stirring it and causing all the waves."
                                                ex_str += " That is why the ocean is blue."
                                            } else if (currentExampleNum === 9) {
                                                ex_str += " there once lived many different types of unicorns that roamed the earth but they are now extinct."
                                                ex_str += " The flew away to another planet."
                                            } else {
                                                ex_str += " there are little blue people that make computers work. They live inside the comupter to make it run."
                                                ex_str += " When the battery runs out they are tired."
                                            }
                                        } else if (currentExample["relation"] === "ObjUsedTo") {
                                            ex_str = ex[1].slice(0,11)
                                            if (currentExampleNum === 1) {
                                                ex_str += " other monkeys like watching a movie, thinking about the things you wrote on your computer, and reading a book."
                                                ex_str += " And, I am willing to go all the way to prove it."
                                            } else if (currentExampleNum === 5){
                                                ex_str += " unicorns and all the other forms of life are different in every one of them."
                                                ex_str += " So, I try my best to bring the most appropriate unicorns up front."
                                            } else if (currentExampleNum === 9){
                                                ex_str += " fairys like to play games and jump inside lakes or rivers. When the do it that gets their wings way."
                                                ex_str += " Not all fairys have wings to some do not care."
                                            } else {
                                                ex_str += " Santa Claus has elves that work in the north pole. They work all year to make children's toys."
                                                ex_str += " The elves like making the toys for the good children."
                                            }
                                        } else if (currentExample["relation"] === "HasEffect") {
                                            ex_str = ex[1].slice(0,11)
                                            if (currentExampleNum === 1) {
                                                ex_str += " fairys have a bad habit of coming back from the past. We want to look back and reevaluate them."
                                                ex_str += " We want to look at whether they are good enough, whether they have enough talent that we really want to think beyond them."
                                            } else if (currentExampleNum === 5){
                                                ex_str += " dragons can breathe fire and love to gather gold, gems, and precious things. This makes them greedy."
                                                ex_str += " But greedy dragons are funny because sleep on it. Everyone needs a dragon."
                                            } else if (currentExampleNum === 9){
                                                ex_str += " some magical dolphins can grow wings and fly over mountains. They even like to race plans when they fly."
                                                ex_str += " We want to look at whether they are good enough, whether they have enough talent that we really want to think beyond them."
                                            } else {
                                                ex_str += " other monkeys like watching a movie, thinking about the things you wrote on your computer, and reading a book."
                                                ex_str += " Not all fairys have wings to some do not care."
                                            }
                                        }
                                    } else {
                                        ex_str = ex[1]
                                    }
                                }
                                return (
                                    <div className="form-check" key={"radio_" + index}>
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            value={index}
                                            name={currentExampleNum + "_" + index} 
                                            checked={currentAnswer === index}
                                            onChange={(event) => handleOnChange(event)}>
                                        </input>
                                        <label className="form-check-label">
                                            {ex_str}<br/><br/>
                                        </label>
                                    </div>
                                );

                            }
                        })}
                        <hr></hr><p><br></br></p>
                        <button 
                            type="button" 
                            disabled={!validSubmit()} 
                            className="btn btn-outline-primary d-block mx-auto"  
                            onClick={ () => {
                                if (currentExampleNum+1 < max_examples) {
                                    // save data
                                    let ans_order = currentExample["responses"][0][0][0] + currentExample["responses"][1][0][0]
                                    testData.push([questionOrder[currentExampleNum],questionType,currentAnswer,ans_order]);
                                    setTestData(testData);
                                    // move to next and reset
                                    setCurrentExampleNum(currentExampleNum+1);
                                    setCurrentExample(why_qs[questionOrder[currentExampleNum+1]]);
                                    setCurrentAnswer(null);
                                    setQuestionType(null);
                                    setVideo(currentExample["video"])
                                } else {
                                    // save data
                                    let ans_order = currentExample["responses"][0][0][0] + currentExample["responses"][1][0][0]
                                    testData.push([questionOrder[currentExampleNum],questionType,currentAnswer,ans_order]);
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

export default Test1