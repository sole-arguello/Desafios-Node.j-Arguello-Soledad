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
        //metodo para traer y mostrar los productos
    getProducts(){
        console.log('Productos:', this.products)
    }
    //metodo para agregar productos
    addProduct(title, description, price, thumbnail, code, stock){
        //creo el id autoincremental
        let newId;
        if(this.products.length === 0){
            newId = 1
        }else{
            newId = this.products[this.products.length-1].id + 1
        }
        //valido que los campos sean obligatorios
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log('Todos los campos son obligatorios')
            return
        }
        //valido que no se repita el codigo
        const codeExist = this.products.some(prod => prod.code === code)
        if(codeExist){
            console.log(`El codigo "${code}" ya existe, no sera agregado nuevamente`)
        }else{
            //creo el producto apartir de la clase
            const newProducts = {
                id: newId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            this.products.push(newProducts)
        }
    }
    //metodo para encontrar por Id
    getProductById(id){
        const prodFound = this.products.find(prod => prod.id === id)
        if(prodFound){
            console.log(`Producto "${id}" Encontrado`,'\n', prodFound)
        }else{
            console.log(`Prodct "${id}" Not Found`)
        }
           
    }
}

//Instancio la clase, creo un objeto apartir de la clase
const product1 = new ProductManager()
console.log('------- Array Productos inicia Vacio ------')
product1.getProducts()

console.log('------- Pruebas: "Producto ya existe y Campos obligatorios" -------')
//codigo repetido
product1.addProduct('Bombis', 'Bombis de encaje', 2500, 'img 1', 1010, 10)
//producto sin titulo
product1.addProduct('', 'Bombis less', 2000, 'img 1', 1000, 5)

/*-----------------------------------------*/
product1.addProduct('Bombis', 'Bombis de encaje', 2500, 'img 1', 1010, 10)
product1.addProduct('Conjuto', 'Conjunto algodon', 3500, 'img 2', 1011, 15)


console.log( '\n'+'-------- Agrego pruductos al Array ------------')
product1.getProducts()