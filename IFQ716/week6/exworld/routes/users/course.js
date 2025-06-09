var express = require('express');
var router = express.Router();

router.get("/:courseId/unit/:unitId", function (req, res, next) {
    res.send('you are studing ' + req.params.courseId + ' unit ' + req.params.unitId);  
});

module.exports = router;
