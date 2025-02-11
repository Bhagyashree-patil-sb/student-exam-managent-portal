const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'results.html'));
});

app.use('/loginRoutes', require('./src/routes/loginRoutes'));
app.use('/resultRoutes', require('./src/routes/resultRoutes'));
app.use('/testRoutes', require('./src/routes/testRoutes'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
