const socketClient = io()


//recibo los productos del lado del server
socketClient.on('productsArray', (dataProducts) => {
     console.log(dataProducts);
})