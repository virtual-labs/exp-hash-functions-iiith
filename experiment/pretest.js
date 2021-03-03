 /////////////////////////////////////////////////////////////////////////////

 /////////////////////// Do not modify the below code ////////////////////////

 /////////////////////////////////////////////////////////////////////////////

 (function() {
     function buildQuiz() {
         // we'll need a place to store the HTML output
         const output = [];

         // for each question...
         myQuestions.forEach((currentQuestion, questionNumber) => {
             // we'll want to store the list of answer choices
             const answers = [];

             // and for each available answer...
             for (letter in currentQuestion.answers) {
                 // ...add an HTML radio button
                 answers.push(
                     `<label>
           <input type="radio" name="question${questionNumber}" value="${letter}">
           ${letter} :
           ${currentQuestion.answers[letter]}
         </label>`
                 );
             }

             // add this question and its answers to the output
             output.push(
                 `<div class="question"> ${currentQuestion.question} </div>
       <div class="answers"> ${answers.join("")} </div>`
             );
         });

         // finally combine our output list into one string of HTML and put it on the page
         quizContainer.innerHTML = output.join("");
     }

     function showResults() {
         // gather answer containers from our quiz
         const answerContainers = quizContainer.querySelectorAll(".answers");

         // keep track of user's answers
         let numCorrect = 0;

         // for each question...
         myQuestions.forEach((currentQuestion, questionNumber) => {
             // find selected answer
             const answerContainer = answerContainers[questionNumber];
             const selector = `input[name=question${questionNumber}]:checked`;
             const userAnswer = (answerContainer.querySelector(selector) || {}).value;

             // if answer is correct
             if (userAnswer === currentQuestion.correctAnswer) {
                 // add to the number of correct answers
                 numCorrect++;

                 // color the answers green
                 //answerContainers[questionNumber].style.color = "lightgreen";
             } else {
                 // if answer is wrong or blank
                 // color the answers red
                 answerContainers[questionNumber].style.color = "red";
             }
         });

         // show number of correct answers out of total
         resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
     }

     const quizContainer = document.getElementById("quiz");
     const resultsContainer = document.getElementById("results");
     const submitButton = document.getElementById("submit");


     /////////////////////////////////////////////////////////////////////////////

     /////////////////////// Do not modify the above code ////////////////////////

     /////////////////////////////////////////////////////////////////////////////






     /////////////// Write the MCQ below in the exactly same described format ///////////////


     const myQuestions = [{
            question: "1. Which criterion ensures that we can’t find two messages that hash to the same digest?", ///// Write the question inside double quotes
            answers: {
                a: "One-wayness", ///// Write the option 1 inside double quotes
                b: "Weak-collision-resistance", ///// Write the option 2 inside double quotes
	        c: "Strong-collision-resistance", ///// Write the option 1 inside double quotes
                d: "None", ///// Write the option 2 inside double quotes
            },
            correctAnswer: "a" ///// Write the correct option inside double quotes
        },


            question: "2. Which criterion Ensures that it must be extremely difficult or impossible to create the message if the message digest is given.", ///// Write the question inside double quotes
            answers: {
                a: "One-wayness", ///// Write the option 1 inside double quotes
                b: "Weak-collision-resistance", ///// Write the option 2 inside double quotes
	        c: "Strong-collision-resistance", ///// Write the option 1 inside double quotes
                d: "None", ///// Write the option 2 inside double quotes
            },
            correctAnswer: "a" ///// Write the correct option inside double quotes
        },

            question: "3. Consider the function h: {0,1}8 -> {0,1}4. Suppose h(x) = x xmod 5 mod 16, x in [0, 255]. The collision in h occurs for.", ///// Write the question inside double quotes
            answers: {
                a: "(1, 17)", ///// Write the option 1 inside double quotes
                b: "(2, 16)", ///// Write the option 2 inside double quotes
	        c: "(1, 16)", ///// Write the option 1 inside double quotes
                d: "(2, 17)", ///// Write the option 2 inside double quotes
            },
            correctAnswer: "a" ///// Write the correct option inside double quotes
        },
	   

            question: "4. The Merkle-Damgard Transform is mainly useful for", ///// Write the question inside double quotes
            answers: {
                a: "Converting any fixed-length collision resistant hash function to an arbitrary length collision resistant hash functionConverting any fixed-length collision resistant hash function to an arbitrary length collision resistant hash function", ///// Write the option 1 inside double quotes
                b: "Converting arbitrary length hash function to a fixed length hash function ", ///// Write the option 2 inside double quotes
	        c: "Constructing hash function from random function", ///// Write the option 1 inside double quotes
                d: "None", ///// Write the option 2 inside double quotes
            },
            correctAnswer: "a" ///// Write the correct option inside double quotes
        },


     ];




     /////////////////////////////////////////////////////////////////////////////

     /////////////////////// Do not modify the below code ////////////////////////

     /////////////////////////////////////////////////////////////////////////////


     // display quiz right away
     buildQuiz();

     // on submit, show results
     submitButton.addEventListener("click", showResults);
 })();


 /////////////////////////////////////////////////////////////////////////////

 /////////////////////// Do not modify the above code ////////////////////////

 /////////////////////////////////////////////////////////////////////////////
