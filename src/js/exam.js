document.addEventListener("DOMContentLoaded", function () {
    const studentData = JSON.parse(localStorage.getItem("loggedInStudent"));

    if (!studentData) {
        alert("No student data found! Redirecting to login...");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("student-name").textContent = studentData.name;
    document.getElementById("student-usn").textContent = studentData.usn;
    document.getElementById("student-father").textContent = studentData.fatherName;

    const mcqQuestions = [
        { question: "What is the default value of an int variable in Java?", options: ["0", "1", "null", "undefined"], answer: "0" },
        { question: "Which keyword is used to define a class in Java?", options: ["class", "Class", "def", "struct"], answer: "class" },
        { question: "Which of these is NOT a Java primitive type?", options: ["int", "float", "char", "string"], answer: "string" },
        { question: "Which method is called when an object is created?", options: ["main()", "constructor", "start()", "initialize()"], answer: "constructor" },
        { question: "What is used to create an object in Java?", options: ["new", "create", "instance", "object"], answer: "new" },
        { question: "Which operator is used for comparison?", options: ["=", "==", "!=", "&&"], answer: "==" },
        { question: "What is the superclass of all Java classes?", options: ["Object", "Main", "Base", "Super"], answer: "Object" },
        { question: "Which loop executes at least once?", options: ["for", "while", "do-while", "foreach"], answer: "do-while" },
        { question: "Which Java keyword is used to inherit a class?", options: ["implements", "extends", "inherits", "super"], answer: "extends" },
        { question: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Verified Model", "Java Visual Manager", "Java Variable Memory"], answer: "Java Virtual Machine" }
    ];

    const codingQuestions = [
        { question: "Write a Java program to print 'Hello, World!'", expectedAnswer: `public class Main { 
public static void
main(String[] args) {
System.out.println("Hello, World!");
}
}` },
        { question: "Write a Java function to check if a number is even or odd.", expectedAnswer: `public static void checkEvenOdd(int num) { 
if(num % 2 == 0) 
System.out.println("Even"); 
else System.out.println("Odd"); 
}` },
        { question: "Write a Java program to find the factorial of a number using recursion.", expectedAnswer: `public static 
int factorial(int n) { 
return (n <= 1) ? 1 : n * factorial(n - 1); 
            }` }
    ];

    
    let timeLimit = 40 * 60; 
    const timerElement = document.getElementById("timer");
    const countdown = setInterval(function () {
        const minutes = Math.floor(timeLimit / 60);
        const seconds = timeLimit % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        timeLimit--;

        if (timeLimit < 0) {
            clearInterval(countdown);
            alert("Time's up! Submitting the exam...");
            document.getElementById("exam-form").submit();
        }
    }, 1000);

   
    const mcqContainer = document.getElementById("mcq-questions");
    mcqQuestions.forEach((q, index) => {
        const div = document.createElement("div");
        div.innerHTML = `<p><strong>${index + 1}. ${q.question}</strong></p>`;
        q.options.forEach(option => {
            div.innerHTML += `
                <input type="radio" name="mcq${index}" value="${option}"> ${option} <br>
            `;
        });
        mcqContainer.appendChild(div);
    });

   
    const codingContainer = document.getElementById("coding-questions");
    codingQuestions.forEach((q, index) => {
        const div = document.createElement("div");
        div.innerHTML = `<p><strong>${index + 1}. ${q.question}</strong></p>
                        <textarea name="coding${index}" id="coding${index}" rows="5" cols="50"></textarea>`;
        codingContainer.appendChild(div);
    });

   
    document.getElementById("exam-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let correctMCQ = 0;
        let answeredMCQ = 0;
        let totalMCQs = mcqQuestions.length;

        mcqQuestions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="mcq${index}"]:checked`);
            if (selectedOption) {
                answeredMCQ++;
                if (selectedOption.value === q.answer) {
                    correctMCQ++;
                }
            }
        });

        let wrongMCQ = answeredMCQ - correctMCQ;
        let skippedMCQ = totalMCQs - answeredMCQ;

        let totalCodingScore = 0;
        let codingResults = [];

        codingQuestions.forEach((q, index) => {
            let answerField = document.getElementById("coding" + index);
            if (answerField) {
                let answer = answerField.value.trim();
                let expected = q.expectedAnswer.trim();

                let similarity = answer.length > 0 ? calculateSimilarity(answer, expected) : 0;
                let score = (similarity / 100) * 20; 

                totalCodingScore += score;
                codingResults.push({ 
                    question: q.question, 
                    answer: answer || "Not Answered", 
                    expectedAnswer: expected, 
                    similarity: similarity.toFixed(2), 
                    score: score.toFixed(2) 
                });
            }
        });

        const examResults = {
            name: studentData.name,
            usn: studentData.usn,
            fatherName: studentData.fatherName,
            correctMCQ: correctMCQ,
            answeredMCQ: answeredMCQ,
            wrongMCQ: wrongMCQ,
            skippedMCQ: skippedMCQ,
            codingResults: codingResults,
            totalCodingScore: totalCodingScore.toFixed(2),
            finalScore: (correctMCQ * 4 + totalCodingScore).toFixed(2) 
        };

        localStorage.setItem("examResults", JSON.stringify(examResults));
        window.location.href = "results.html";
    });

    function calculateSimilarity(a, b) {
        let commonLength = Math.min(a.length, b.length);
        let correctCount = 0;

        for (let i = 0; i < commonLength; i++) {
            if (a[i] === b[i]) {
                correctCount++;
            }
        }

        return (correctCount / commonLength) * 100;
    }
});
