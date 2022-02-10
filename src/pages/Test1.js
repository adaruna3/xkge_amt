import React, {useState} from 'react';
import ReactPlayer from 'react-player'
import why_qs from '../data/rq1_amt_data.json'



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

    const [currentExampleNum, setCurrentExampleNum] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [testData, setTestData] = useState([]);
    const [questionShuffled, setQuestionShuffled] = useState(false);
    const [questionOrder, setQuestionOrder] = useState(questions);
    const [questionType, setQuestionType] = useState(null);
    const max_examples = 15;

    if (!questionShuffled) {
        setQuestionOrder(shuffleArray(questions));
        setQuestionShuffled(!questionShuffled);
    }
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
            return q1;
        } else {
            return q2;
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
                <div className="card mb-5" style={{backgroundColor:'#F0F0F0'}}>
                    <div className="card-body">
                        <h5 className="card-title">Question {currentExampleNum+1} out of {max_examples} </h5>
                        <div className="card-text">
                            <br/>
                            <div className="row align-items-center">
                                <div className="col-3 text-left">
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
                                </div>
                                <div className="col-7">
                                    Video of Robot Before Interruption:
                                    {setVideo(currentExample["video"])}
                                </div>
                            </div>
                            <br/><br/>
                            <div className="row">
                                <div className="col-4 text-right"><b>"Why"</b> Question:</div>
                                <div className="col-8">
                                    {selectWhyQ(currentExample["why_q1"],currentExample["why_q2"])}<br/><br/>
                                </div>
                            </div>
                             
                            Select the best robot response to the <b>"why" question</b> below:<br/>

                        </div><hr/>
                        {currentExample["responses"].map((ex, index) => {
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
                        })}
                        <hr></hr><p><br></br></p>
                        <button 
                            type="button" 
                            disabled={!validSubmit()} 
                            className="btn btn-outline-primary d-block mx-auto"  
                            onClick={ () => {
                                if (currentExampleNum+1 < max_examples) {
                                    // save data
                                    let ans_order = currentExample["responses"][0][0][0] + currentExample["responses"][1][0][0] + currentExample["responses"][2][0][0]
                                    testData.push([questionOrder[currentExampleNum],questionType,currentAnswer,ans_order]);
                                    setTestData(testData);
                                    console.log(testData);
                                    // move to next and reset
                                    setCurrentExampleNum(currentExampleNum+1);
                                    setCurrentExample(why_qs[questionOrder[currentExampleNum+1]]);
                                    setCurrentAnswer(null);
                                    setQuestionType(null);
                                    setVideo(currentExample["video"])
                                } else {
                                    // save data
                                    let ans_order = currentExample["responses"][0][0][0] + currentExample["responses"][1][0][0] + currentExample["responses"][2][0][0]
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