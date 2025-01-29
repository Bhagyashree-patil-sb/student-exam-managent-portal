window.onload = function() {
    const score = localStorage.getItem('score');
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
    const userCodeAnswers = JSON.parse(localStorage.getItem('userCodeAnswers')) || [];
    const skippedQuestions = JSON.parse(localStorage.getItem('skippedQuestions')) || [];
    const totalQuestions = localStorage.getItem('totalQuestions');

    document.getElementById('score').textContent = score;
    document.getElementById('total-score').textContent = 50;
    document.getElementById('total-questions').textContent = totalQuestions;
    document.getElementById('correct-answers').textContent = calculateCorrectAnswers(userAnswers, userCodeAnswers);

    const answersContainer = document.getElementById('question-answers');
    answersContainer.innerHTML = '';

    userAnswers.forEach((answer, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-answer');

        const question = allQuestions[index];
        const isCorrect = answer === question.answer ? 'Correct' : 'Incorrect';
        questionDiv.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
            <p><strong>Your Answer:</strong> ${answer}</p>
            <p><strong>Correct Answer:</strong> ${question.answer}</p>
            <p><strong>Result:</strong> ${isCorrect}</p>
        `;
        answersContainer.appendChild(questionDiv);
    });

    const skippedContainer = document.getElementById('skipped-questions');
    if (skippedQuestions.length > 0) {
        skippedContainer.innerHTML = '<h3>Skipped Questions:</h3>';
        skippedQuestions.forEach((questionIndex) => {
            const skippedDiv = document.createElement('div');
            skippedDiv.classList.add('skipped-question');
            skippedDiv.innerHTML = `<p>Question ${questionIndex + 1} was skipped.</p>`;
            skippedContainer.appendChild(skippedDiv);
        });
    }

    document.getElementById('retry-button').onclick = function() {
        window.location.href = 'exam.html';
    };
};

function calculateCorrectAnswers(userAnswers, userCodeAnswers) {
    let correctAnswers = 0;

    userAnswers.forEach((answer, index) => {
        const question = allQuestions[index];
        if (answer === question.answer) {
            correctAnswers++;
        }
    });

    userCodeAnswers.forEach((codeAnswer, index) => {
        const question = allQuestions[index + 9];
        if (question.inputRequired) {
            const correctCode = question.requiredLines === 7 
                ? getCorrectCodeForSum() 
                : getCorrectCodeForCalculator();

            correctAnswers += compareCode(codeAnswer, correctCode);
        }
    });

    return correctAnswers;
}

function getCorrectCodeForSum() {
    return [
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
}

function getCorrectCodeForCalculator() {
    return [
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
}

function compareCode(userCode, correctCode) {
    let score = 0;
    for (let i = 0; i < correctCode.length; i++) {
        if (userCode[i] && userCode[i].trim() === correctCode[i].trim()) {
            score += 1;
        }
    }

    return score;
}
