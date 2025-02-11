const studentData = JSON.parse(localStorage.getItem('loggedInStudent'));

if (studentData) {
    document.getElementById('student-name').textContent = studentData.name;
    document.getElementById('usn').textContent = studentData.usn;
    document.getElementById('father-name').textContent = studentData.fatherName;
} else {
    window.location.href = 'login.html';
}

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

    partB: [
        {
            question: "Write a Java program to check if a number is prime.",
            answer: "public class PrimeCheck { public static void main(String[] args) { int num = 29; boolean isPrime = true; for (int i = 2; i <= num / 2; i++) { if (num % i == 0) { isPrime = false; break; } } if (isPrime) { System.out.println(num + \" is a prime number.\"); } else { System.out.println(num + \" is not a prime number.\"); } } }"
        },
        {
            question: "Write a Java program to reverse a string without using the built-in reverse function.",
            answer: "public class ReverseString { public static void main(String[] args) { String str = \"Hello\"; String reversed = \"\"; for (int i = str.length() - 1; i >= 0; i--) { reversed += str.charAt(i); } System.out.println(\"Reversed String: \" + reversed); } }"
        },
        {
            question: "Write a Java program to reverse a string.",
            answer: "public class ReverseStringBuiltIn { public static void main(String[] args) { String str = \"Hello\"; String reversed = new StringBuilder(str).reverse().toString(); System.out.println(\"Reversed String: \" + reversed); } }"
        }
    ]
};
let currentQuestionIndex = 0;
let currentQuestionSet = questions.easy;
let timerInterval;
let timeRemaining = 60;

let attemptedQuestions = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;
let skippedQuestions = 0;
const totalQuestions = questions.easy.length + questions.partB.length;

function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    const currentQuestion = currentQuestionSet[currentQuestionIndex];

    if (currentQuestionSet === questions.partB) {
        questionContainer.innerHTML = `
            <h3>${currentQuestion.question}</h3>
            <textarea id="code-answer" placeholder="Write your code here..."></textarea>
        `;
        timeRemaining = 10 * 60;
        resetTimer();
    } else {
        questionContainer.innerHTML = `
            <h3>${currentQuestion.question}</h3>
            <ul>
                ${currentQuestion.options.map(option => `<li><input type="radio" name="option" value="${option}"> ${option}</li>`).join('')}
            </ul>
        `;
        startTimerForPartA();
    }
    updateProgress();
}

function updateProgress() {
    const progressBar = document.querySelector('#progress-bar .progress');
    const progress = (currentQuestionIndex / currentQuestionSet.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function updateTimer() {
    const timerElement = document.getElementById('time');
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function startTimerForPartA() {
    timeRemaining = 60;
    resetTimer();
}

function resetTimer() {
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
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuestionSet.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        if (currentQuestionSet === questions.easy) {
            currentQuestionSet = questions.partB;
            currentQuestionIndex = 0;
            displayQuestion();
        } else {
            alert("You've completed all the questions!");
            hideButtons();
            displayResult();
        }
    }
}

function skipQuestion() {
    skippedQuestions++;
    nextQuestion();
}

function hideButtons() {
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('skip-btn').style.display = 'none';
}

document.getElementById('next-btn').addEventListener('click', nextQuestion);
document.getElementById('skip-btn').addEventListener('click', skipQuestion);

document.getElementById('submit-btn').addEventListener('click', function(event) {
    event.preventDefault();
    attemptedQuestions = 0;
    correctAnswersCount = 0;
    incorrectAnswersCount = 0;
    skippedQuestions = totalQuestions - attemptedQuestions;
    
    const allMCQs = document.querySelectorAll('#question-container ul');
    allMCQs.forEach((questionContainer) => {
        const questionText = questionContainer.previousElementSibling.innerText.trim();
        const selectedOption = questionContainer.querySelector('input[type="radio"]:checked');
        if (selectedOption) {
            attemptedQuestions++;
            const question = questions.easy.find(q => q.question === questionText);
            if (question && selectedOption.value.trim() === question.answer.trim()) {
                correctAnswersCount++;
            } else {
                incorrectAnswersCount++;
            }
        } else {
            skippedQuestions++;
        }
    });
    
    const codeAnswers = document.querySelectorAll('#code-answer');
    codeAnswers.forEach((answer, index) => {
        const studentCode = answer.value.trim();
        const correctCode = questions.partB[index].answer.trim();
        if (studentCode) {
            attemptedQuestions++;
            const similarity = calculateCodeSimilarity(studentCode, correctCode);
            if (similarity >= 90) {
                correctAnswersCount++;
            } else {
                incorrectAnswersCount++;
            }
        } else {
            skippedQuestions++;
        }
    });
    
    localStorage.setItem('attemptedQuestions', attemptedQuestions);
    localStorage.setItem('correctAnswers', correctAnswersCount);
    localStorage.setItem('incorrectAnswers', incorrectAnswersCount);
    localStorage.setItem('skippedQuestions', skippedQuestions);
    localStorage.setItem('totalQuestions', totalQuestions);
    
    window.location.href = 'results.html';
});

displayQuestion();
