/*
Podrias desarrollarme en javascript lo siguiente:
1) Realizar una clase "ProductManager" que gestione un conjunto de productos
2) Debe crearse desde su constructor con el elemento products el cual sera un arreglo vacio
3) Cada producto que gsestione debe contar con las sig propiedades:
    title: (nombre del producto)
    description( desc del producto)
    price(precio)
    thumbnail(ruta de imagen)
    code(codigo identificador)
    stock(numero de piezas disponibles)
4) Debe contar con un metodo "addProduct" el cual agregara un producto al arreglo de productos inicial
    - validar que no se repita el campo "code" y que todos los campos sean obligatotios
    - Al agregarlo, debe crearse con un id autoincrementable
5) Debe contar con un metodo "getProducts" el cual debe devolver el arreglo con todos los productos creados
    hasta ese momento
6) Debe contar con un metodo "getProductById" el cual debe buscar en el arreglo el producto que 
    coincida con el id
    - En caso de no coincidir ningun id, mostrar en consola un error  "Not found"

*/

//Creo la clase
class ProductManager{
    //defino el constructor con un array vacio
    constructor(){
        this.products = []
    }
}