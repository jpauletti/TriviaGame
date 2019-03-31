// using JavaScript for the logic and jQuery to manipulate HTML.Be sure to layout this app with valid HTML and stylish CSS.


// click start button to begin

// timer at top - like class exervise - set interval with count function, also need converter to show it on the page

// change page content to the ? and 4 answers to choose from - selected answer is marked
    // user can only select one answer
    // if wrong, say wrong and show correct answer for about 5 seconds
    // if right, say right 
    // if time runs out, say so - similar to if wrong
    // automatically goes to next question after 5 seconds

// each question gets 30 sec or whatever time

// at end - shows time remaining
    // shows how you did - correct answers, incorrect answers, and unanswered
    // start over button - resets game


var app = {
    $startBtn: $("#start-btn"),
    $timerSection: $("#timer-section"),
    $timer: $("#timer"),
    $questionSection: $("#question-section"),
    $question: $("#question"),
    $possibleAnswers: $(".possible-answer"),
    $chosenAnswer: "",

    $message: $(".message"),
    $rwMessage: $("#right-wrong-message"),
    $rightAnswer: $("#right-answer-is"),
    $imgMessage: $("#img-message"),

    time: 30,
    intervalTimer: "",

    currentQuestion: "",
    currentChoices: "",
    currentAnswer: "",
    usedQuestions: [],

    trivia: [
        {
            question: "Which creatures pull the carriages that take students from the Hogwarts Express to the Castle?",
            choices: ["Hippogriffs", "Thestrals", "Centaurs", "Manticores"],
            answer: "Thestrals"
        },
        {
            question: "Where is the Slytherin common room located?",
            choices: ["Next to the kitchens", "In the west tower", "Below the Great Hall", "In the dungeons"],
            answer: "In the dungeons"
        },
        {
            question: "Who was the headmaster of Hogwarts when the Chamber of Secrets was opened for the first time?",
            choices: ["Armando Dippet", "Phineas Nigellus Black", "Albus Dumbledore", "Brutus Scrimgeour"],
            answer: "Armando Dippet"
        },
        {
            question: "Who is the Hufflepuff house ghost?",
            choices: ["The Fat Friar", "Cuthbert Binns", "The Grey Lady", "Sir Patrick Delaney-Podmore"],
            answer: "The Fat Friar"
        },
        {
            question: "Who posed as Mad-Eye Moody during Harry's 4th year?",
            choices: ["Peter Pettigrew", "Barty Crouch Jr.", "Sirius Black", "Voldemort"],
            answer: "Barty Crouch Jr."
        },
        {
            question: "How does Harry breathe underwater for the second task of the Triwizard Tournament?",
            choices: ["He transfigures himself", "He used the bubble-head charm", "He eats gillyweed", "He asks the mermen for help"],
            answer: "He eats gillyweed"
        },
        {
            question: "What does O.W.L. stand for?",
            choices: ["Official Wizarding Levels", "Outstanding Wizard Learning", "Outstanding Wonderful Luck", "Ordinary Wizarding Level"],
            answer: "Ordinary Wizarding Level"
        },
        {
            question: "What is the name of Filch's cat?",
            choices: ["Buttercup", "Mrs. Filch", "Mrs. Norris", "Ser Pounce"],
            answer: "Ordinary Wizarding Level"
        },
        {
            question: 'Which other boy might have ended up as the "Chosen One?"',
            choices: ["Cedric Diggory", "Draco Malfoy", "Ernie Macmillan", "Neville Longbottom"],
            answer: "Neville Longbottom"
        },
        {
            question: "What do Hermione's parents do for a living?",
            choices: ["Dentists", "Healers", "Teachers", "Librarians"],
            answer: "Dentists"
        }
    ],

    convertTime: function (t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - minutes;

        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return minutes + ":" + seconds;
    },

    count: function () {
        // subtract 1 second
        app.time--;
        // console.log(app.time);

        // update time on page
        app.$timer.text(app.convertTime(app.time));
        // update time on page
        app.$timer.text(app.convertTime(app.time));

        // stop interval at 00:00
        if (app.time === 0) {
            clearInterval(intervalTimer);
            console.log("clear interval");
        }
    },

    startGame: function () {
        intervalTimer = setInterval(app.count, 1000); // counts every second
        console.log("game started");

        app.loadQuestion();

    },

    loadQuestion: function () {
        var randomNumber = Math.floor(Math.random() * app.trivia.length);
        console.log(randomNumber);

        // get random question & answers
        app.currentQuestion = app.trivia[randomNumber].question;
        app.currentChoices = app.trivia[randomNumber].choices;
        app.currentAnswer = app.trivia[randomNumber].answer;
        console.log(app.currentQuestion);
        console.log(app.currentChoices);
        console.log(app.currentAnswer);

        // add question to new array of asked questions
        app.usedQuestions = app.trivia.slice(randomNumber, randomNumber + 1);

        // remove that question from the array (at index of randomNumber, 1 item to remove)
        app.trivia.splice(randomNumber, 1);

        // add question to page
        app.$question.text(app.currentQuestion);

        // add each possible answer to page
        $.each(app.$possibleAnswers, function(index, value) {
            console.log(index);
            console.log(value);
            value.textContent = app.currentChoices[index];            
        })

    },


};


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


$(document).ready(function () {

    // start button
    app.$startBtn.on("click", function() {
        console.log("clicked");
        app.startGame();
        // show questions, answers, and timer - hide start button
        app.$timerSection.removeClass("hide");
        app.$questionSection.removeClass("hide");
        $(this).addClass("hide");

        console.log(app.currentAnswer);


    });





    // click answer
    app.$possibleAnswers.on("click", function () {
        console.log("clicked answer");
        app.$chosenAnswer = $(this);

        // add selected class
        // $(this).addClass("selected");

        // stop timer
        clearInterval(intervalTimer);
        console.log("clear interval");

        // hide question area
        app.$questionSection.addClass("hide");

        // show message area
        app.$message.removeClass("hide");

        // show correct answer
        app.$rightAnswer.text("The correct answer was: " + app.currentAnswer);

        // check if that was the right answer
        if ($(this).text() === app.currentAnswer) {
            // if right
            console.log("that's right");

            // follow up screen display
            app.$rwMessage.text("Brilliant!");
            app.$imgMessage.attr("src", "https://media.giphy.com/media/qLHzYjlA2FW8g/giphy.gif");

        } else {
            // if wrong
            console.log("that's wrong");

            // follow up screen display
            app.$rwMessage.text("Bollocks!");
            app.$imgMessage.attr("src", "https://media.giphy.com/media/14gESmcGjeqSZO/giphy.gif");
        }

    });




}); // document.ready end


