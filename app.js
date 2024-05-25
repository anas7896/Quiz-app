  var firebaseConfig = {
    apiKey: "AIzaSyDgyShyCAhPSBl1DiOzJbUWVgaXPMGew60",
    authDomain: "quiz-app-4adc7.firebaseapp.com",
    databaseURL: "https://quiz-app-4adc7-default-rtdb.firebaseio.com",
    projectId: "quiz-app-4adc7",
    storageBucket: "quiz-app-4adc7.appspot.com",
    messagingSenderId: "275398641239",
    appId: "1:275398641239:web:db3561b1019dbe32520512"
  };

  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);
  var db = firebase.database();
//   console.log(db);

var questions = [
  {
    question: "HTML Stands for",
    option1: "Hyper Text Markup Language",
    option2: "Hyper Tech Markup Language",
    option3: "Hyper Touch Markup Language",
    corrAnswer: "Hyper Text Markup Language",
  },
  {
    question: "CSS Stands for",
    option1: "Cascoding Style Sheets",
    option2: "Cascading Style Sheets",
    option3: "Cascating Style Sheets",
    corrAnswer: "Cascading Style Sheets",
  },
  {
    question: "Which tag is used for most large heading",
    option1: "<h6>",
    option2: "<h2>",
    option3: "<h1>",
    corrAnswer: "<h1>",
  },
  {
    question: "Which tag is used to make element unique ",
    option1: "id",
    option2: "class  ",
    option3: "label",
    corrAnswer: "id",
  },
  {
    question: "Any element assigned with id, can be get in css ",
    option1: "by # tag",
    option2: "by @ tag",
    option3: "by & tag",
    corrAnswer: "by # tag",
  },
  {
    question: "CSS can be used with ______ methods ",
    option1: "8",
    option2: "3",
    option3: "4",
    corrAnswer: "3",
  },
  {
    question: "In JS variable types are ____________ ",
    option1: "6",
    option2: "3",
    option3: "8",
    corrAnswer: "8",
  },
  {
    question: "In array we can use key name and value ",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
  {
    question: "toFixed() is used to define length of decimal ",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "True",
  },
  {
    question: "push() method is used to add element in the start of array ",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
];

var ques = document.getElementById("ques");
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var btn = document.getElementById("btn");
var timer = document.getElementById("timer");
var index = 0;
var score = 0;
var min = 1;
var sec = 29;
var interval; // Global scope

// Call displayQuestion function when the page loads
window.onload = function() {
    displayQuestion(index);
};

// Display the question
function displayQuestion(index) {
    ques.innerText = questions[index].question;
    opt1.innerText = questions[index].option1;
    opt2.innerText = questions[index].option2;
    opt3.innerText = questions[index].option3;
    min = 1;
    sec = 29;
    btn.disabled = true;  // Disable button initially

    // Start timer
    clearInterval(interval);
    startTimer();
}

// Start the timer
function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = `${min}:${sec}`;
        sec--;
        if (sec < 0) {
            min--;
            sec = 59;
            if (min < 0) {
                clearInterval(interval);
                nextQuestion(); // Call nextQuestion function when timer ends
            }
        }
    }, 1000);
}

// Go to the next question
function nextQuestion() {
    var getOptions = document.getElementsByName("option");
    var selectedOpt;
    for (var i = 0; i < getOptions.length; i++) {
        if (getOptions[i].checked) {
            selectedAns = getOptions[i].value;
            // Get the selected option text
            selectedOpt = questions[index][`option${selectedAns}`];
            var correctAns = questions[index]["corrAnswer"];
            
            // Check if the answer is correct
            if (selectedOpt === correctAns) {
                score++;
            }
            
            // Store the selected answer in Firebase
            var answerData = {
                question: questions[index].question,
                selectedAnswer: selectedOpt,
                correctAnswer: correctAns,
                isCorrect: selectedOpt === correctAns
            };
            
            db.ref("userAnswers").push(answerData);
        }
        getOptions[i].checked = false;
    }

    index++;

    if (index >= questions.length) {
        clearInterval(interval);
        Swal.fire({
            title: "Good job!",
            text: `Your score is ${(score / questions.length) * 100}%`,
            icon: "success",
        }).then(function () {
            index = 0; // Reset index to 0 after OK button click
            displayQuestion(index); // Display first question again
        });
    } else {
        displayQuestion(index);
    }
}

// Enable the button when an option is selected
function enableButton() {
    btn.disabled = false;
}

// Check if the timer has ended
function checkTimerEnd() {
    if (sec === 0 && min === 0) {
        nextQuestion(); // Call nextQuestion function when timer ends
    }
}

// Call checkTimerEnd every second
setInterval(checkTimerEnd, 1000);