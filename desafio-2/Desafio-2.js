/**
 * Consigna:
 * Realizar una clase de nombre "ProductManager", el cual permita trabajar con mulptiples productos
 * Este debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia 
 * de archivos(basado en entregable desafio 1)
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
 * Debe tener un metodo gstProducts, el cual debe leer el archivo de productos y devolver todos los productos 
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

//traigo la libreria fs
const fs = require('fs')

class ProductManager{

    //creo la variable que va a contener la ruta del archivo
    constructor(filePath){
        this.filePath = filePath
    }

    //verifico si existe el archivo
    fileExist(){
        return fs.existsSync(this.filePath)
    }


}


const operations = async () =>{
        
}
operations()


