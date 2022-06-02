const express = require ('express');
const productsRouter = require('./routes/productsRouter');

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('public'));

app.use('/products',  productsRouter);


app.get('/', (req, res)=> {
    res.send({message: 'Server running ok'})
})

app.listen(PORT, () => {
    console.log('Listen on port : ' + PORT);
})


