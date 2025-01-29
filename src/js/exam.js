let currentQuestionIndex = 0;
let questions = {
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
        }
    ],
    moderate: [
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
        }
    ],
    hard: [
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
        }
    ],
    partB: [
        {
            question: "Write a Java program to find the sum of the first 100 integers.",
            inputRequired: true,
            requiredLines: 7
        },
        {
            question: "Write a Java program to implement a basic Calculator (addition, subtraction, multiplication, and division).",
            inputRequired: true,
            requiredLines: 22
        }
    ]
};

let allQuestions = [...questions.easy, ...questions.moderate, ...questions.hard, ...questions.partB];
let userAnswers = [];
let userCodeAnswers = [];
let skippedQuestions = [];

let timerDuration = 1200;
let timerInterval;
let partAComplete = false;

window.onload = function() {
    showModal();
    document.getElementById('start-btn').onclick = startExam;
};

function showModal() {
    document.getElementById('start-modal').style.display = 'flex';
}

function startExam() {
    document.getElementById('start-modal').style.display = 'none';
    document.getElementById('exam-container').style.display = 'block';
    loadQuestion(currentQuestionIndex);
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(function() {
        let minutes = Math.floor(timerDuration / 60);
        let seconds = timerDuration % 60;
        document.getElementById('timer').textContent = `Time Remaining: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timerDuration--;
        if (timerDuration < 0 && !partAComplete) {
            partAComplete = true;
            alert('Time is up for Part A! You will now move to Part B.');
            timerDuration = 600;
            loadQuestion(currentQuestionIndex);
        }
        if (timerDuration < 0) {
            clearInterval(timerInterval);
            saveResults();
            window.location.href = 'results.html';
        }
    }, 1000);
}

function loadQuestion(index) {
    if (index >= allQuestions.length) {
        saveResults();
        window.location.href = 'results.html';
        return;
    }

    const question = allQuestions[index];
    document.getElementById('question-text').textContent = question.question;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    if (question.inputRequired) {
        const codeContainer = document.createElement('div');
        codeContainer.innerHTML = `
            <h3>Write Your Code Below (exact ${question.requiredLines} lines):</h3>
            <table id="code-table">
                <tr>
                    <td><input type="text" id="line1" class="code-line" maxlength="100"></td>
                </tr>
                ${Array.from({ length: question.requiredLines - 1 }).map((_, i) => `
                    <tr>
                        <td><input type="text" id="line${i + 2}" class="code-line" maxlength="100"></td>
                    </tr>
                `).join('')}
            </table>
        `;
        optionsContainer.appendChild(codeContainer);

        document.getElementById('next-button').onclick = function() {
            let userCode = [];
            let valid = true;

            for (let i = 0; i < question.requiredLines; i++) {
                const line = document.getElementById(`line${i + 1}`).value.trim();
                userCode.push(line);

                if (!line) {
                    valid = false;
                    alert("Please fill all lines of code.");
                    break;
                }
            }

            if (valid) {
                userCodeAnswers.push(userCode);
                currentQuestionIndex++;
                loadQuestion(currentQuestionIndex);
            }
        };
    } else {
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            optionsContainer.appendChild(button);

            button.onclick = function() {
                userAnswers[index] = option;
            };
        });

        document.getElementById('next-button').onclick = function() {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        };
    }
}

document.getElementById('skip-button').onclick = function() {
    skippedQuestions.push(currentQuestionIndex);
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
};

function saveResults() {
    const score = calculateScore();
    localStorage.setItem('score', score);
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    localStorage.setItem('userCodeAnswers', JSON.stringify(userCodeAnswers));
    localStorage.setItem('skippedQuestions', JSON.stringify(skippedQuestions));
    localStorage.setItem('totalQuestions', allQuestions.length);
}

function calculateScore() {
    let score = 0;

    allQuestions.forEach((question, index) => {
        if (question.inputRequired) {
            const codeAnswer = userCodeAnswers[index];
            if (index === 3) {
                score += isValidJavaSumCode(codeAnswer);
            } else if (index === 4) {
                score += isValidJavaCalculatorCode(codeAnswer);
            }
        } else {
            if (userAnswers[index] === question.answer) {
                if (index < 3) {
                    score += 3;
                } else if (index < 6) {
                    score += 4;
                } else {
                    score += 5;
                }
            }
        }
    });

    return score;
}

function isValidJavaSumCode(code) {
    const correctCode = [
        'public class SumOfFirst100Integers {',
        '    public static void main(String[] args) {',
        '        int sum = 0;',
        '        for (int i = 1; i <= 100; i++) {',
        '            sum += i;',
        '        }',
        '        System.out.println("The sum of the first 100 integers is: " + sum);',
        '    }',
        '}'
    ];

    let score = 0;
    for (let i = 0; i < correctCode.length; i++) {
        if (code[i].trim() === correctCode[i].trim()) {
            score += 1;
        }
    }

    if (score === correctCode.length) {
        return 7;
    } else {
        return score;
    }
}

function isValidJavaCalculatorCode(code) {
    const correctCode = [
        'import java.util.Scanner;',
        '',
        'public class BasicCalculator {',
        '    public static void main(String[] args) {',
        '        Scanner scanner = new Scanner(System.in);',
        '',
        '        System.out.println("Enter first number: ");',
        '        double num1 = scanner.nextDouble();',
        '',
        '        System.out.println("Enter second number: ");',
        '        double num2 = scanner.nextDouble();',
        '',
        '        System.out.println("Choose an operation (+, -, *, /): ");',
        '        char operation = scanner.next().charAt(0);',
        '',
        '        double result = 0;',
        '        boolean validOperation = true;',
        '',
        '        switch (operation) {',
        '            case \'+\':',
        '                result = num1 + num2;',
        '                break;',
        '            case \'-\':',
        '                result = num1 - num2;',
        '                break;',
        '            case \'*\':',
        '                result = num1 * num2;',
        '                break;',
        '            case \'/\':',
        '                if (num2 != 0) {',
        '                    result = num1 / num2;',
        '                } else {',
        '                    System.out.println("Error: Division by zero is not allowed.");',
        '                    validOperation = false;',
        '                }',
        '                break;',
        '            default:',
        '                System.out.println("Invalid operation!");',
        '                validOperation = false;',
        '}',
        '',
        '        if (validOperation) {',
        '            System.out.println("The result is: " + result);',
        '        }',
        '',
        '        scanner.close();',
        '    }',
        '}'
    ];

    let score = 0;
    for (let i = 0; i < correctCode.length; i++) {
        if (code[i].trim() === correctCode[i].trim()) {
            score += 1;
        }
    }

    if (score === correctCode.length) {
        return 7;
    } else {
        return score;
    }
}
