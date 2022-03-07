import React, { useState, useEffect } from 'react';

import Welcome1 from "./pages/Welcome1"
import Welcome2 from "./pages/Welcome2"
import Rules1 from "./pages/Rules1"
import Rules2 from "./pages/Rules2"
import Examples from "./pages/Examples"
import PreTest from "./pages/PreTest"
import Test1 from "./pages/Test1"
import Test2 from "./pages/Test2"
import Questionnaire from "./pages/Questionnaire"
import Finish from "./pages/Finish"

import './static/css/App.css'
import "./static/css/bootstrap.min.css"

var Dropbox = require('dropbox').Dropbox;

function App() {
  const [currentPage, setCurrentPage] = useState('Welcome');
  const [userData, setUserData] = useState(
    {
      "verificationCode": Math.floor(100000 + Math.random() * 900000)
    }
  );
  const queryParams = new URLSearchParams(window.location.search);
  var expId = queryParams.get('id');
  var studyId = queryParams.get('study');
  const maxTestExamples = 15;

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage]);

  function handleFinish(data) {
    let finalObj = {...userData, "testId": expId, "studyId": studyId};
    finalObj["questionnaireData"] = data;

    let dataStr = JSON.stringify(finalObj);
    let fileName = ""
    if (studyId === "2") {
      fileName = "/study2_v1/study" + studyId + "_exp" + expId + "_" + userData.turkId  +".json";
    } else {
      fileName = "/study1_v1/study" + studyId + "_exp" + expId + "_" + userData.turkId  +".json";
    }
    
    let dbx = new Dropbox({ accessToken: 'PUT YOURS' }); // you will need to update this, no longer validd
    dbx.filesUpload({path: fileName, contents: dataStr})
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.error(error)
    });
  }

  return (
    studyId === "2" && currentPage === 'Welcome' ? (
      <Welcome2 setCurrentPage={(value) => setCurrentPage(value)} saveTurkId={(value) => setUserData({...userData, "turkId": value})} maxExamples={maxTestExamples}/>
    ) : studyId === "2" && currentPage === 'Rules' ? (
      <Rules2 setCurrentPage={(value) => setCurrentPage(value)}/>
    ) : studyId === "2" && currentPage === 'Examples' ? (
      <Examples setCurrentPage={(value) => setCurrentPage(value)} saveData={(data) => setUserData({...userData, "examples": data})}/>
    ) : studyId === "2" && currentPage === 'PreTest' ? (
      <PreTest setCurrentPage={(value) => setCurrentPage(value)} maxExamples={maxTestExamples}/>
    ) : studyId === "2" && currentPage === 'Test' ? (
      <Test2 setCurrentPage={(value) => setCurrentPage(value)} saveData={(data) => setUserData({...userData, "test": data})} maxExamples={maxTestExamples} firstExample={expId * maxTestExamples}/>
    ) : studyId === "2" && currentPage === 'Questionnaire' ? (
      <Questionnaire setCurrentPage={(value) => setCurrentPage(value)} saveData={(data) => handleFinish(data)}/>
    ) : studyId === "2" && currentPage === 'Finish' ? (
      <Finish verificationCode={userData.verificationCode}/>
    ) : studyId === "1" && currentPage === 'Welcome' ? (
      <Welcome1 setCurrentPage={(value) => setCurrentPage(value)} saveTurkId={(value) => setUserData({...userData, "turkId": value})} maxExamples={maxTestExamples}/>
    ) : studyId === "1" && currentPage === 'Rules' ? (
      <Rules1 setCurrentPage={(value) => setCurrentPage(value)}/>
    ) : studyId === "1" && currentPage === 'Test' ? (
      <Test1 setCurrentPage={(value) => setCurrentPage(value)} saveData={(data) => setUserData({...userData, "test": data})}/>
    ) : studyId === "1" && currentPage === 'Questionnaire' ? (
      <Questionnaire setCurrentPage={(value) => setCurrentPage(value)} saveData={(data) => handleFinish(data)}/>
    ) : studyId === "1" && currentPage === 'Finish' && (
      <Finish verificationCode={userData.verificationCode}/>
    )
  );
}

export default App;
