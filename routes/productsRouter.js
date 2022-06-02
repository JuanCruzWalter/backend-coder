const { Router } = require('express');
const Contenedor = require('../contenedor')
const productos = new Contenedor('products.txt')

productos.read();

const router = Router();

router.get('/', (req, res) =>{
    res.send(productos.data)
})

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    const products = await productos.getByID(Number(id));
    res.send(products)
})

router.post('/', (req, res)=>{
    const { title, price, img } = req.body;
    productos.save({title, price, img});
    

})



module.exports = router;