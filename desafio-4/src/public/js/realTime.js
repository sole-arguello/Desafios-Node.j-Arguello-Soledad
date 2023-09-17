const socketClient = io()
//elementos
const productList = document.getElementById('productList')

//recibo los productos del lado del server al cliente
socketClient.on('productsArray', (dataProducts) => {
    //veo los productos del lado del cliente 
    console.log(dataProducts);

    //renderizo los productos
    let productsElms = ''
    dataProducts.forEach(product => {
        productsElms += `<li>
                            <p>Nombre: ${product.title}</p>
                            <p>Descripcion: ${product.description}</p>
                            <p>Precio: ${product.price}</p>
                            <p>Code: ${product.code}</p>
                            <p>Thumbnail: ${product.thumbnail}</p>
                            <p>Stock: ${product.stock}</p>
                            <p>Category: ${product.category}</p>
                        </li>`
    })
    console.log(productsElms);
    productList.innerHTML = productsElms
 })