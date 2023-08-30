
/**
 * Consigna:
 * Realizar una clase de nombre "ProductManager", el cual permita trabajar con mulptiples productos
 * Este debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia 
 * de archivos
 */
/**
 * Aspecto a incluir:
 * La clase debe contar con una variable this.path, el cual se inicializara desde el constructor y debe
 * recibir la ruta a trabajar desde el momento de generar su instancia
 */
/**
 * Debe guardar objetos con el siguiente formato:
 * - id( se debe incrementar automaticamente, no enviarse desde el cuerpo)
 * - title( nombre del producto)
 * - description( descripcion del producto)
 * - price(precio)
 * - thumbnail(ruta de imagen)
 * - code(codigo identificador)
 * - stock(numero de piezas disponibles)
 */
/**
 * Debe tener un metodo addProduct el cual debe recibir un objeto con el formato previamente especificado,
 * asignarle un id autoincrementable y guardarlo en el arreglo(recuerda siempre guardarlo como un array 
 * en el archivo)
 * 
 * Debe tener un metodo getProducts, el cual debe leer el archivo de productos y devolver todos los productos 
 * en un formato de arreglo
 * 
 * Debe tener un metodo getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el 
 * producto con el id especificado y devolverlo en fomato OBJETO
 * 
 * Debe tener un metodo updateProduct, el cual debe recibir el id del producto a actualizar, asi tambien como 
 * el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que
 *  tenga ese id en el archivo. NO DEBE BORRARSE SU ID
 * 
 * Debe tener un metodo deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id
 * en el archivo
 * 
 */


const fs = require('fs');

class ProductManager {
    //filePath contiene la ruta del Json
    constructor(filePath) {
        this.filePath = filePath;
    }
    //verifico que exista el archivo
    fileExist() {
        return fs.existsSync(this.filePath);
    }
    //metodo que lee y trae los productos
    async getProducts() {
        try {
            if (this.fileExist()) {
                const data = await fs.promises.readFile(this.filePath, 'utf-8');
                //transfoma de string a json
                return JSON.parse(data);
            } else {
                throw new Error('No es posible leer el archivo');
            }
        } catch (error) {
            console.log(error.message)
            throw error;
        }
    }
    //metodo que lee y agrega productos
    async addProduct(infoProduct) {
        try {
            //verifico que los campos se carguen obligatoriamente
            if (!infoProduct) {
                throw new Error('Todos los campos son obligatorios');
            }
            //leo el producto en el archivo
            const products = await this.getProducts();
            
            //creo el id autoincremental
            let newId;
            if (products.length === 0) {
                newId = 1
            } else {
                newId = products[products.length - 1].id + 1;
            }
            
            //verifico si el codigo se repite y no lo agrego
            const codeExist = products.some( prod => prod.code === infoProduct.code)
            if(codeExist){
                console.log(`El codigo "${infoProduct.code}" ya existe, no sera agregado nuevamente`)
            } else{
                infoProduct.id = newId
                products.push(infoProduct);
                console.log('Producto Agregado');
            }
            //sobreescribo el con el nuevo producto el archivo
            await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, '\t'));

            
        } catch (error) {
            throw error;
        }
    }

    //metodo que busca por id
    async getProductById(id){

        try {
            //leo el archivo
            const products = await this.getProducts();
            //busco por id
            const prodFound = products.find(prod => prod.id === id)
            if(prodFound) {
                console.log('Producto Encontrado con exito', prodFound);
            }
            else{
                throw new Error('Producto no encontrado');
            }
            
        } catch (error) {
            console.log(error.message);
            throw new Error ('El producto es inexistente')
        }

    }

    //metodo que actualiza
    async updateProduct(id, product){
        try {
            //leo el producto
            const products = await this.getProducts();
            //busco la posicion 
            const updatetId = products.findIndex(prod => prod.id === id);

                //verifico 
                if (updatetId) {
                    // Actualizo los campos del producto con los nuevos valores
                    products[updatetId] = {
                        ...products[updatetId],//conservo el id
                        ...product //agrego los productos
                    };
                    //sobreescribo el json 
                    await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, '\t'));
                    console.log('Producto actualizado con exito');
                } else {
                    throw new Error('Producto no encontrado');
                }

        } catch (error) {
            console.log(error.message)
            throw new Error('Archivo inexistente no se puede actualizar')
            
        }
    }
    //metodo eliminar producto
    async deleteProduct(id) {
        try {
            //leo el archivo
            const products = await this.getProducts()

            //verifico si exite el id
            const existId = products.find(prod => prod.id === id)
            if(existId){
                //busco el producto a eliminar
                const deleteId = products.filter(prod => prod.id !== id);
                //sobreescribo el archivo sin el 
                await fs.promises.writeFile(this.filePath, JSON.stringify(deleteId, null, '\t'));
                console.log('Producto eliminado exitosamente');
            } else {
                throw new Error('Producto no encontrado');
            }
        } catch (error) {
            console.log(error.message);
            throw new Error('El Producto a eliminar es inexistente');
        }
    }
}

//funcion que recibe las operaciones
async function operations() {
    try {
        const product = new ProductManager('./products.json');

        //datos a cargar en el json
        //await product.addProduct({ title: 'Bombis Encaje', description: 'Bombis de encaje', price: 2550, thumbnail: 'img 1', code: 1020, stock: 10 });
        //producto repetido
        //await product.addProduct({ title: 'Bombis Encaje', description: 'Bombis de encaje', price: 2550, thumbnail: 'img 1', code: 1020, stock: 10 });
        //nuevo producto
       // await product.addProduct({ title: 'Conjunto ', description: 'Conjunto de algodon', price: 2800, thumbnail: 'img 2', code: 1010, stock: 10 });
        //nuevo producto
       // await product.addProduct({ title: 'Bombis Less', description: 'Bombis de algodon', price: 1500, thumbnail: 'img 3', code: 1111, stock: 10 });//codigo nuevo

        //paso el id del producto a actualizar y le paso lo nuevo
        //await product.updateProduct(2, {title: 'Bombis Culotte', description: 'Producto de algodon', price: 1200, thumbnail: 'img 4', code: 1090, stock: 20})

        //intrduce el id a buscar
        //await product.getProductById()

        //introduce el id a eliminar
        //await product.deleteProduct()

    } catch (error) {
        console.log(error.message);
    }
}

operations();

