const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
 
    const { username, password } = req.body;
    if (username === 'user' && password === 'password') {
        res.send({ status: 'success', message: 'Logged in successfully' });
    } else {
        res.send({ status: 'error', message: 'Invalid credentials' });
    }
});

module.exports = router;
