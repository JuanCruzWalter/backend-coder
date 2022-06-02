const fs = require ('fs')

class Contenedor {
    constructor(filename){
        console.log('Init Contenedor')
        this.filename = filename
        this.data = []
        try{
            this.read()
        } catch(e) {
            console.log(e)
            this.write()
        }
    }

    write() {
        fs.writeFileSync(this.filename, JSON.stringify(this.data))
    }
    read(){
        this.data = JSON.parse(fs.readFileSync(this.filename))
    }
    getLastID(){
        const l = this.data.length
        if(l < 1) return 0
        return this.data[this.data.length - 1].id 
    }
    save(obj) {
        const id = this.getLastID()
        this.data.push({
            ...obj, ...{ id: id + 1 }
        })
        this.write()
    }
    getByID(id) {
        return this.data.find(p => p.id == id)


    }
    getAll() {
        return this.data
    }

    async editByID(id, campo, valor) {
        try{
            let productos = await this.getAll();
            let producto = productos.filter(producto => producto.id === id);
            producto[campo] = valor;
            const index = productos.findIndex(producto => producto.id === id);

            productos = productos.splice(index, 1, producto)
            productosParsed = JSON.parse(productos)
            await fs.promises.writeFile(this.archivo, productosParsed)
        }
        catch (error){
            console.log(error)

        }
    }

    deleteByID(id) {
        const idx = this.data.findIndex(p => p.id == id)
        this.data.splice(idx, 1)

        this.write()
    }
    deleteAll() {
        this.data = []
        this.write()
    }

}

module.exports = Contenedor