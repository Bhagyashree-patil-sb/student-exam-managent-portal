document.addEventListener("DOMContentLoaded", function () {
    const examResults = JSON.parse(localStorage.getItem("examResults"));

    if (!examResults) {
        alert("No exam results found! Redirecting to the exam page...");
        window.location.href = "exam.html";
        return;
    }


    function setText(id, text) {
        document.getElementById(id).textContent = text ?? "N/A";
    }


    setText("student-name", examResults.name);
    setText("student-usn", examResults.usn);
    setText("student-father", examResults.fatherName);


    setText("answered-mcq", examResults.answeredMCQ);
    setText("correct-mcq", examResults.correctMCQ);
    setText("wrong-mcq", examResults.wrongMCQ);
    setText("skipped-mcq", examResults.skippedMCQ);

    
    const codingContainer = document.getElementById("coding-questions-results");
    codingContainer.innerHTML = "";

    examResults.codingResults.forEach(result => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>Q:</strong> ${result.question}</td>
            <td><strong>Your Answer:</strong> <pre>${result.answer}</pre></td>
            <td><strong>Similarity:</strong> ${result.similarity}%</td>
            <td><strong>Score:</strong> ${result.score} marks</td>
        `;
        codingContainer.appendChild(row);
    });


    setText("total-coding-score", examResults.totalCodingScore);

    setText("final-score", `${examResults.finalScore}`);

    document.getElementById("print-report").addEventListener("click", function () {
        const printContent = document.querySelector(".results-container").innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = `<div class='results-container'>${printContent}</div>`;
        window.print();
        document.body.innerHTML = originalContent;
        location.reload(); 
    });
});
