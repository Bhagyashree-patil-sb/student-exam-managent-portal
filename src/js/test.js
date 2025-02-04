// Retrieve the student's data from localStorage
const studentData = JSON.parse(localStorage.getItem('loggedInStudent'));

if (studentData) {
    document.getElementById('student-name').textContent = studentData.name;
    document.getElementById('usn').textContent = studentData.usn;
    document.getElementById('father-name').textContent = studentData.fatherName;
} else {
    window.location.href = 'login.html'; // Redirect if not logged in
}

// Simulated question data (part A and part B)
const questions = {
    easy: [
        {
            question: "What is the default value of a boolean variable in Java?",
            options: ["A) true", "B) false", "C) null", "D) 0"],
            answer: "B) false"
        },
        {
            question: "Which of the following is a valid way to declare a method in Java that does not return any value?",
            options: ["A) public void myMethod() {}", "B) public return void myMethod() {}", "C) public void return myMethod() {}", "D) void public myMethod() {}"],
            answer: "A) public void myMethod() {}"
        },
        {
            question: "Which of the following is NOT a valid primitive data type in Java?",
            options: ["A) int", "B) double", "C) string", "D) char"],
            answer: "C) string"
        },
        {
            question: "Which of the following methods can be used to read input from the user in Java?",
            options: ["A) Scanner.nextInt()", "B) Scanner.next()", "C) BufferedReader.readLine()", "D) All of the above"],
            answer: "D) All of the above"
        },
        {
            question: "Which of the following is true about method overloading in Java?",
            options: ["A) It allows two methods with the same name to have different return types.", "B) It allows two methods with the same name and parameters.", "C) It allows two methods with the same name but different parameter types.", "D) It allows two methods with the same name but different access modifiers."],
            answer: "C) It allows two methods with the same name but different parameter types."
        },
        {
            question: "What will be the output of the following code?\nint a = 10;\nint b = 5;\nSystem.out.println(a / b);",
            options: ["A) 2.0", "B) 2", "C) 10", "D) 0"],
            answer: "B) 2"
        },
        {
            question: "Which of the following statements about the HashMap class in Java is true?",
            options: ["A) It allows duplicate keys.", "B) It maintains the order of keys in the map.", "C) It allows only one null key.", "D) It is synchronized by default."],
            answer: "C) It allows only one null key."
        },
        {
            question: "In Java, what is the purpose of the volatile keyword?",
            options: ["A) To ensure that a variable can only be modified by one thread at a time.", "B) To guarantee that the value of a variable is always updated in all threads.", "C) To prevent the value of a variable from being cached.", "D) To ensure that a variable cannot be assigned a null value."],
            answer: "B) To guarantee that the value of a variable is always updated in all threads."
        },
        {
            question: "What is the time complexity of accessing an element from a HashMap in the average case?",
            options: ["A) O(n)", "B) O(log n)", "C) O(1)", "D) O(n^2)"],
            answer: "C) O(1)"
        },
        {
            question: "Which method is used to print output to the console in Java?",
            options: ["A) printf()", "B) println()", "C) print()", "D) printConsole()"],
            answer: "B) println()"
        },
    ],
    
    // Part B programming questions
    partB: [
        {
            question: "Write a Java program to check if a number is prime.",
            answer: "Write your solution here..."
        },
        {
            question: "Write a Java program to reverse a string without using the built-in reverse function.",
            answer: "Write your solution here..."
        },
        {
            question: "Write a Java program to reverse a string.",
            answer: "Write your solution here..."
        }
    ]
};

// Initialize the current question index and set difficulty
let currentQuestionIndex = 0;
let currentQuestionSet = questions.easy; // Start with easy questions

let timerInterval;
let timeRemaining = 60;

// Function to display the current question
function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    const timerElement = document.getElementById('time');
    const currentQuestion = currentQuestionSet[currentQuestionIndex];

    // Check if we are in part B (coding questions)
    if (currentQuestionSet === questions.partB) {
        questionContainer.innerHTML = `
            <h3>${currentQuestion.question}</h3>
            <textarea id="code-answer" placeholder="Write your code here..."></textarea>
        `;
        // Start the timer for coding questions
        timeRemaining = 10 * 60; // 10 minutes for coding questions
        clearInterval(timerInterval);
        updateTimer();
        timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                updateTimer();
            } else {
                clearInterval(timerInterval);
                alert("Time's up! Moving to the next question.");
                nextQuestion();
            }
        }, 1000);
    } else {
        // For regular multiple choice questions (Part A)
        questionContainer.innerHTML = `
            <h3>${currentQuestion.question}</h3>
            <ul>
                ${currentQuestion.options.map(option => `<li><input type="radio" name="option" value="${option}"> ${option}</li>`).join('')}
            </ul>
        `;
    }

    // Update the progress bar
    updateProgress();

    // If we're at the last question, hide the buttons
    if (currentQuestionSet === questions.partB && currentQuestionIndex === 2) {
        hideButtons(); // Hide buttons for the third question in Part B
    } else {
        showButtons(); // Show buttons for other questions
    }
}

// Function to update the progress bar
function updateProgress() {
    const progressBar = document.querySelector('#progress-bar .progress');
    const progress = (currentQuestionIndex / currentQuestionSet.length) * 100; // Calculate the percentage
    progressBar.style.width = `${progress}%`; // Update the width of the progress bar
}

// Function to update the timer
function updateTimer() {
    const timerElement = document.getElementById('time');
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Move to the next question
function nextQuestion() {
    // Check if the index is within bounds
    if (currentQuestionIndex < currentQuestionSet.length - 1) {
        currentQuestionIndex++;
        displayQuestion();  // Display the next question
    } else {
        // If all questions from current set are completed, switch to the other part (part B)
        if (currentQuestionSet === questions.easy) {
            currentQuestionSet = questions.partB;
            currentQuestionIndex = 0;
            displayQuestion(); // Display first question of part B
        } else {
            alert("You've completed all the questions!");
            hideButtons(); // Hide the buttons when all questions are completed
        }
    }
}

// Skip the current question
function skipQuestion() {
    if (currentQuestionIndex < currentQuestionSet.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        // If all questions from current set are completed, switch to the other part (part B)
        if (currentQuestionSet === questions.easy) {
            currentQuestionSet = questions.partB;
            currentQuestionIndex = 0;
            displayQuestion(); // Display first question of part B
        } else {
            alert("You've completed all the questions!");
            hideButtons(); // Hide the buttons when all questions are completed
        }
    }
}

// Function to hide Next and Skip buttons when the user reaches the last question of part B
function hideButtons() {
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('skip-btn').style.display = 'none';
}

// Function to show Next and Skip buttons if not at the last question of Part B
function showButtons() {
    document.getElementById('next-btn').style.display = 'inline-block';
    document.getElementById('skip-btn').style.display = 'inline-block';
}

// Event listeners for Next and Skip buttons
document.getElementById('next-btn').addEventListener('click', nextQuestion);
document.getElementById('skip-btn').addEventListener('click', skipQuestion);

// Initially display the first question
displayQuestion();
