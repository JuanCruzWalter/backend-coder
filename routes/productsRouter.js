const {Router} = require('express');

const router = Router();

router.get('/', (req, res) =>{
    res.send({ message: 'Router of Products'})
})

module.exports = router;