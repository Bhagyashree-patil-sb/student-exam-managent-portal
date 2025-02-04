const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentsData = require('./src/data/students.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/getStudentDetails', (req, res) => {
  const { usnOrName } = req.body;

  const student = studentsData.find(s => s.USN === usnOrName || s.Name === usnOrName);

  if (student) {
    res.json({ student });
  } else {
    res.status(404).json({ student: null });
  }
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
