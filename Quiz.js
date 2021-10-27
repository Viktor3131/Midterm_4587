
  let finish = false;
  
  window.onload = function () {
  
    var seconds = 00; 
    var tens = 00; 
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var Interval;
      
      clearInterval(Interval);
       Interval = setInterval(startTimer, 10);
      const submitButton = document.getElementById('submit');
      submitButton.onclick = function() {
        clearInterval(Interval);
      }
    
    
     
    
    function startTimer () {
      tens++; 
      
      if(tens <= 9){
        appendTens.innerHTML = "0" + tens;
      }
      
      if (tens > 9){
        appendTens.innerHTML = tens;
        
      } 
      
      if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
      }
      
      if (seconds > 9){
        appendSeconds.innerHTML = seconds;
      }
    
    }
    startTimer();
  
  }

  

  function buildQuiz(){
    // variable to store the HTML output
    const output = [];


    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];
        // and for each available answer...
        /*
        
        */
        if(currentQuestion.multi) {
        for(letter in currentQuestion.answers){

          answers.push(
            `<label>
              <input type="checkbox" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
        } else {

        for(letter in currentQuestion.answers){
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
      }



        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function stopTimer(){
    window.stop();
  }

  function showResults(){
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    stopTimer();
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');

  const myQuestions = [
    {
      question: " Inside which HTML element do we put the JavaScript? (choose one)",
      multi: false,
      answers: {
        a: "scripting",
        b: "js",
        c: "javascript",
        d: "script"
        
      },
      correctAnswer: "d",
    },
    {
      question: " The external JavaScript file must contain the 'script' tag (check all that apply)",
      multi: true,
      answers: {
        a: "true",
        b: "false",
        c: "none",
        d: "both"
      },
      correctAnswer: "c",  
      },
      {
        question: " How do you write 'Hello World' in an alert box? (Select option)",
        multi: false,
        answers: {
          a: "Alert('Hello World')e",
          b: "alertBox('Hello World')",
          c: "msg('Hello World')",
          d: "msgBox('Hello World')"
        },
        correctAnswer: "a",  
        },
      
  ];

  // Kick things off
  buildQuiz();

  

  // Event listeners
  submitButton.addEventListener('click', showResults);
  
