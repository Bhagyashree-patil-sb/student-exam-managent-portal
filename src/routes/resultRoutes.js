const express = require('express');
const router = express.Router();

router.get('/getResults', (req, res) => {
 
    const results = [
        { studentId: 'S123', marks: 85 },
        { studentId: 'S124', marks: 92 },
    ];
    res.json(results);
});

module.exports = router;
