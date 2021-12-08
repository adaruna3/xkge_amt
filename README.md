
Important pages to follow the code:

1) App.js serves just like a "main" function, where you will see the different pages 'currentPage' is set to and the order in which pages get set. 
- From the pages for 'currentPage' you can click on the the corresponding pages in the pages folder. For example: Welcome.js, CorrectVids.js, etc
- Also in App.js, you see the handleFinish() function, this basically how I send all recorded data to dropbox. Please don't do something bad with my access token which is very much visible in this code :) 

2) CorrectVids.js is an example file if you need to reference how to load in videos

3) Explanations.js is an example file for how I loaded in explanations from the data folder based on study condition

4) LearningVideos.js and PostTestVideos.js are very similar. They are examples of how I display questions for the user to answer based on a displayed video or image on the screen. In these files I reference Explanations.js to display the corresponding explanations as well.

5) Questionnare.js is example file for survey style questions 



To run the code with localhost

1) Install node -  https://nodejs.org/en/ 
2) Within the project folder, run 'npm install'
3) Then run 'npm start'
4) Build 'npm run build'
5) Publish with firebase 'firebase deploy'
