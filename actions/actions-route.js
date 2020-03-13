const express = require('express');
const Actions = require('./actions-model');
const restrict = require('../middleware/restrict')
const router = express.Router();

router.get('/', restrict(), async(req, res, next) => {
    try{
        res.json(await Actions.findActions())
    }catch(err) {

    }
})

module.exports = router;