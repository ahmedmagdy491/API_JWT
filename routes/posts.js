const router = require('express').Router();
const verify =  require('./verifyToken.js');

router.get('/',verify,(req, res) => {
    res.json({posts :{title : 'this is my first post', description : 'random data you should not access'} });
})

module.exports = router;