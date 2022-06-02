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
    if(!id){
        return res.status(400).send({ error: 'producto no encontrado'})

    }

    return res.send(products)
})

router.post('/', (req, res)=>{
    const { title, price, img } = req.body;


    if(!title || !price|| !img){
        return res.status(400).send({ error: 'los datos  estan incompletos'})

    }

    productos.save({title, price, img});
    productos.read();

    res.send({message: 'Persona agregada'})
    

})

router.put('/:id', async (req, res)=>{
    try {
        const { id } = req.params
        const { campo, valor } = req.body;

        await productos.editByID(Number(id), campo, valor)

        res.send({message: `el usuario con id : ${id} se modifico exitosamente`})

    } 
    catch (error) {
        throw error
    }
})





module.exports = router;