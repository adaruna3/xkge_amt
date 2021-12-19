import React, { useState, useEffect } from 'react';

import Welcome from "./pages/Welcome"
import Rules from "./pages/Rules"
import Examples from "./pages/Examples"
import PreTest from "./pages/PreTest"
import Test from "./pages/Test"
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
  // var [expId, setExpId] = useState(0);
  const maxTestExamples = 15

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage]);

  function handleFinish(data) {
    let finalObj = {...userData, "testId": expId};
    finalObj["questionnaireData"] = data;

    let dataStr = JSON.stringify(finalObj);

    let fileName = '/study_v0/' + userData.turkId + "_" + expId + '.json';
    let dbx = new Dropbox({ accessToken: 'qRrgLr4BefkAAAAAAAAAAcNrexQ29MnpdcvChi6P3-dIg9iAOWNR1Jth5-lJFN7Q' });
    dbx.filesUpload({path: fileName, contents: dataStr})
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.error(error)
    });
  }

  return (
    currentPage === 'Welcome' ? (
      // <Welcome setCurrentPage={(value) => setCurrentPage(value)} saveTurkId={(value) => setUserData({...userData, "turkId": value})} setExpId={(value) => setExpId(value-1)} maxExamples={maxTestExamples}/>
      <Welcome setCurrentPage={(value) => setCurrentPage(value)} saveTurkId={(value) => setUserData({...userData, "turkId": value})} maxExamples={maxTestExamples}/>
    ) : currentPage === 'Rules' ? (
      <Rules setCurrentPage={(value) => setCurrentPage(value)}/>
    ) : currentPage === 'Examples' ? (
      <Examples setCurrentPage={(value) => setCurrentPage(value)} saveData={(data) => setUserData({...userData, "examples": data})}/>
    ) : currentPage === 'PreTest' ? (
      <PreTest setCurrentPage={(value) => setCurrentPage(value)} maxExamples={maxTestExamples}/>
    ) : currentPage === 'Test' ? (
      <Test setCurrentPage={(value) => setCurrentPage(value)} saveData={(data) => setUserData({...userData, "test": data})} maxExamples={maxTestExamples} firstExample={expId * maxTestExamples}/>
    ) : currentPage === 'Questionnaire' ? (
      <Questionnaire setCurrentPage={(value) => setCurrentPage(value)} saveData={(data) => handleFinish(data)}/>
    ) : currentPage === 'Finish' && (
      <Finish verificationCode={userData.verificationCode}/>
    )
  );
}

export default App;
